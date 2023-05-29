interface TranslationResult {
 t: i18next.TFunction;
 i18n: i18next.i18n;
 lng?: string;
}

type InitI18nextFn = (
 lng: string,
 ns?: string | string[]
) => Promise<typeof i18n>;
