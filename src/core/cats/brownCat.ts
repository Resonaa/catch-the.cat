import { produce } from "immer";

import { Pos } from "../../models/pos";
import type { State } from "../state";
import { Cat } from "./cat";

export class BrownCat extends Cat {
	name = "brown-cat";
	color = "#9a5e24";
	difficulty = {
		3: 3,
		4: 3,
		5: 2,
		6: 1,
		7: 1
	};

	obstacles = new Set<string>();

	reset() {
		this.obstacles.clear();
	}

	createNewState(state: State) {
		return produce(state, state => {
			for (const obstacle of this.obstacles.values()) {
				state.board.setObstacle(Pos.fromString(obstacle));
			}
		});
	}

	checkCatWin(state: State, cur?: Pos) {
		return super.checkCatWin(this.createNewState(state), cur);
	}

	checkPlayerWin(state: State) {
		return super.checkPlayerWin(this.createNewState(state));
	}

	step(state: State) {
		for (const obstacle of state.board.allObstacles()) {
			this.obstacles.add(obstacle.toString());
			state.board.unsetObstacle(obstacle);
		}

		const newState = this.createNewState(state);

		return super.step(newState);
	}
}
