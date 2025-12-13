import { dom, library } from "@fortawesome/fontawesome-svg-core";
import {
	faCat,
	faChessBoard,
	faCircleInfo,
	faRotate
} from "@fortawesome/free-solid-svg-icons";

export function setupFa() {
	library.add(faRotate, faCat, faChessBoard, faCircleInfo);
	dom.i2svg();
}
