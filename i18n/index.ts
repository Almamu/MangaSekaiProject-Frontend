import i18n, { LanguageDetectorAsyncModule, TOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "intl-pluralrules";
import { t as originalT } from "i18next";
import { Path } from "react-hook-form";
import languages from "@/i18n/languages";

export type Translations = {
  install: {
    step1: {
      welcome: string;
      scanQR: string;
      manual: string;
      continue: string;
      back: string;
      server: {
        address: string;
        username: string;
        password: string;
      };
      infoModal: {
        title: string;
        text: string;
      };
      modal: {
        title: string;
      };
      status: {
        WAITING: string;
        AUTHENTICATING: string;
      };
    };
  };
};

export type TranslationKeys = Path<Translations>;

export const STORAGE_TRANSLATION_KEY = "@User:Language";

export function init() {
  i18n
    .use({
      type: "languageDetector",
      async: true,
      detect: async (callback) => {
        const storedLanguage = await AsyncStorage.getItem(
          STORAGE_TRANSLATION_KEY
        );
        if (storedLanguage) {
          return callback(storedLanguage);
        }

        const locales = Localization.getLocales().map((x) =>
          x.languageTag.replace("-", "_")
        );

        return callback(locales);
      },
      init: () => {},
      cacheUserLanguage: async (language) => {
        await AsyncStorage.setItem(STORAGE_TRANSLATION_KEY, language);
      },
    } as LanguageDetectorAsyncModule)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: languages,
      fallbackLng: "en_US",
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
}

export function t(translation: TranslationKeys, options?: TOptions): string {
  return originalT(translation, options);
}
