import type { State } from "../state";
import { Cat } from "./cat";

export class WhiteCat extends Cat {
	name = "white-cat";
	color = "white";
	difficulty = {
		3: 3,
		4: 3,
		5: 3,
		6: 3,
		7: 2
	};

	reset() {
		this.size = 1;
	}

	step(state: State) {
		this.size *= 1.2;
		return super.step(state);
	}
}
