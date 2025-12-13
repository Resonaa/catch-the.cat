import type { InitOptions } from "i18next";

import ca from "./locales/ca.ts";
import en from "./locales/en.ts";
import zh from "./locales/zh.ts";

const ns = "translations";

export default {
	detection: { caches: [], order: ["navigator"] },
	fallbackLng: "ca",
	interpolation: {
		escapeValue: false
	},
	nonExplicitSupportedLngs: true,
	ns,
	resources: {
		ca: {
			[ns]: ca
		},
		en: {
			[ns]: en
		},
		zh: {
			[ns]: zh
		}
	}
} satisfies InitOptions;
