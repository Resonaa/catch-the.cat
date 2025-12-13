import { produce } from "immer";

import { type Dir, Dirs } from "../../models/dir";
import type { State } from "../state";
import { Cat } from "./cat";

export class CyanCat extends Cat {
	name = "cyan-cat";
	color = "#008080";
	difficulty = {
		3: 3,
		4: 2,
		5: 2,
		6: 1,
		7: 1
	};

	step(state: State) {
		const x = 2;

		if (state.turns % x === 0) {
			let moves: Dir[] = [];
			let newState = state;

			for (let i = 0; i < x; i++) {
				const move = super.step(newState);
				if (move.length === 0) {
					break;
				}

				const dir = move[0];
				newState = produce(newState, state => {
					state.catPos = state.catPos.add(Dirs[dir]);
				});

				moves = moves.concat(move);
			}

			return moves;
		}

		return [];
	}
}
