import type i18n from "./i18n";
import type translation from "./locales/ca.ts";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: i18n.ns;
		resources: {
			[i18n.ns]: typeof translation;
		};
	}
}
