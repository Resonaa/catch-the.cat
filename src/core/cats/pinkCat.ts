import { Pos } from "../../models/pos";
import type { State } from "../state";
import { Cat } from "./cat";

export class PinkCat extends Cat {
	name = "pink-cat";
	color = "#f032e6";
	obstacles: Map<string, number> = new Map();
	difficulty = {
		3: 4,
		4: 3,
		5: 3,
		6: 2,
		7: 2
	};

	reset() {
		this.obstacles.clear();
	}

	step(state: State) {
		for (let q = -state.board.depth; q <= state.board.depth; q++) {
			for (let r = -state.board.depth; r <= state.board.depth; r++) {
				const pos = new Pos(q, r);
				if (state.board.checkPos(pos)) {
					const setTurn = this.obstacles.get(pos.toString());

					if (setTurn === -1) {
						continue;
					}

					if (state.board.isObstacle(pos)) {
						if (!setTurn) {
							this.obstacles.set(pos.toString(), state.turns);
						} else {
							if ((state.turns - setTurn) % 2 === 1) {
								state.board.unsetObstacle(pos);
							} else {
								this.obstacles.set(pos.toString(), -1);
							}
						}
					} else if (setTurn) {
						if ((state.turns - setTurn) % 2 === 0) {
							state.board.setObstacle(pos);
						}
					}
				}
			}
		}

		return super.step(state);
	}
}
