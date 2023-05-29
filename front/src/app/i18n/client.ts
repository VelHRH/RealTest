"use client";

import i18next from "i18next";
import { useEffect } from "react";
import {
 initReactI18next,
 useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "./settings";

i18next
 .use(initReactI18next)
 .use(LanguageDetector)
 .use(
  resourcesToBackend(
   (language: string, namespace: string) =>
    import(`./locales/${language}/${namespace}.json`)
  )
 )

 .init({
  ...getOptions(),
  lng: undefined,
  detection: {
   order: ["path", "htmlTag", "cookie", "navigator"],
  },
 });

export function useTranslation(
 lng: string,
 ns?: string | string[],
 options: any = {}
) {
 useEffect(() => {
  if (i18next.resolvedLanguage === lng) return;
  i18next.changeLanguage(lng);
 }, [lng]);
 return useTranslationOrg(ns, options);
}
