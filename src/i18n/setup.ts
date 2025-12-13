import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import i18nConfig from "./i18n";

export function setupI18n() {
	i18n.use(LanguageDetector).init(i18nConfig);
	document.title = i18n.t("title");
	document.documentElement.lang = i18n.language;
}
