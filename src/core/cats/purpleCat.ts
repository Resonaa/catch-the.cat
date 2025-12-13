import type { State } from "../state";
import { Cat } from "./cat";

export class PurpleCat extends Cat {
	name = "purple-cat";
	color = "#800080";
	lives = 1;
	shouldModify = false;
	difficulty = {
		3: 4,
		4: 4,
		5: 4,
		6: 3,
		7: 2
	};

	reset() {
		this.lives = 1;
		this.shouldModify = false;
	}

	checkPlayerWin(state: State) {
		const won = super.checkPlayerWin(state);

		if (!won) {
			return false;
		}

		if (this.lives > 0) {
			this.lives--;
			this.shouldModify = true;
			return false;
		}

		return true;
	}

	step(state: State) {
		if (this.shouldModify) {
			for (const pos of state.board.allObstacles()) {
				state.board.unsetObstacle(pos);
			}
			this.shouldModify = false;
		}
		return super.step(state);
	}
}
