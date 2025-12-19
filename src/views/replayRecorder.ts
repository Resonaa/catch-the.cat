import { applyPalette, GIFEncoder, quantize } from "gifenc";

export class ReplayRecorder {
	workerReady = false;
	frames: Uint8Array[] = [];

	reset() {
		this.frames = [];
	}

	async captureFrame() {
		const serializer = new XMLSerializer();
		const svgElement = document.querySelector("svg");
		if (!svgElement) {
			return;
		}

		const s = serializer.serializeToString(svgElement);
		const svgString = s
			.replace(/ class=""\/>/g, "/>")
			.replace(/class="obstacle"\/>/g, 'fill="#003366"/>')
			.replace(/data-coords="[\d\-,]*?"\/>/g, 'fill="#b3d9ff"/>');

		const svgBlob = new Blob([svgString], {
			type: "image/svg+xml;charset=utf-8"
		});
		const url = URL.createObjectURL(svgBlob);

		const canvas = document.createElement("canvas");

		const img = new Image();

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		img.onload = async () => {
			const r = 20;
			canvas.width = svgElement.viewBox.baseVal.width * r;
			canvas.height = svgElement.viewBox.baseVal.height * r;

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0);

			const { data, width, height } = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			);
			const frame = this.frames.length;
			const format = "rgb444";
			const delay = 400;
			const maxColors = 256;

			const palette = quantize(data, maxColors, { format });
			const index = applyPalette(data, palette, format);

			const gif = GIFEncoder({ auto: false });
			gif.writeFrame(index, width, height, {
				delay,
				first: frame === 0,
				palette
			});

			this.frames.push(gif.bytesView());

			URL.revokeObjectURL(url);
		};
		img.src = url;
	}

	captureAfter(ms: number) {
		setTimeout(() => this.captureFrame(), ms);
	}

	finish() {
		if (this.frames.length === 0) {
			return;
		}

		const gif = GIFEncoder();
		gif.writeHeader();

		for (const frame of this.frames) {
			gif.stream.writeBytesView(frame);
		}

		gif.finish();
		const data = new Uint8Array(gif.bytesView());
		const blob = new Blob([data], { type: "image/gif" });

		const link = document.createElement("a");
		link.download = "replay.gif";
		link.href = URL.createObjectURL(blob);
		link.click();
	}
}
