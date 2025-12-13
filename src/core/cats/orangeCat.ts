import shuffle from "lodash/shuffle";

import { Pos } from "../../models/pos";
import type { State } from "../state";
import { Cat } from "./cat";

export class OrangeCat extends Cat {
	name = "orange-cat";
	color = "#fa8c01";
	difficulty = {
		3: 4,
		4: 3,
		5: 2,
		6: 1,
		7: 1
	};

	lastClick = Date.now();

	reset() {
		this.lastClick = Date.now();
	}

	step(state: State) {
		const curClick = Date.now();
		const x = Math.floor((curClick - this.lastClick) / 600);

		let arr: [Pos, number][] = [];
		for (let q = -state.board.depth; q <= state.board.depth; q++) {
			for (let r = -state.board.depth; r <= state.board.depth; r++) {
				const pos = new Pos(q, r);
				if (state.board.isObstacle(pos)) {
					arr.push([pos, pos.dist(state.catPos)]);
				}
			}
		}

		arr = shuffle(arr);
		arr = arr.sort((a, b) => b[1] - a[1]);

		for (let i = 0; i < Math.min(x, arr.length); i++) {
			state.board.unsetObstacle(arr[i][0]);
		}

		this.lastClick = curClick;

		return super.step(state);
	}
}
