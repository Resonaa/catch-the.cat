import { applyPalette, GIFEncoder, quantize } from "gifenc";

self.addEventListener("message", ev => {
	const detail = ev.data;
	console.log(detail);
	if (detail.event === "init") {
		self.postMessage("ready");
	} else {
		const {
			data,
			frame,
			width,
			height,
			format = "rgb444",
			maxColors = 256,
			delay = 0
		} = detail;

		const palette = quantize(data, maxColors, { format });
		const index = applyPalette(data, palette, format);

		const gif = GIFEncoder({ auto: false });
		gif.writeFrame(index, width, height, {
			delay,
			first: frame === 0,
			palette
		});

		const output = gif.bytesView();
		console.log("output", output, frame);
		// @ts-expect-error
		self.postMessage([output, frame], [output.buffer]);
	}
});
