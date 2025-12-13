import "./style.css";

import type { IConfig } from "./core/config";
import { Controller } from "./core/controller";
import { setupFa } from "./fa/setup";
import { setupI18n } from "./i18n/setup";
import { SVGRenderer } from "./views/svgRenderer";

setupFa();
setupI18n();

const config: IConfig = {
	initialObstacles: 4,
	maxDepth: 7,
	minDepth: 3
};

const renderer = new SVGRenderer();

const controller = new Controller(config, renderer);

controller.start();
