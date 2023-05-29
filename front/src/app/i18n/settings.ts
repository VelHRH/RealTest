export const fallbackLng = "en";
export const languages = [fallbackLng, "uk"];
export const defaultNS = "translation";

export function getOptions(
 lng = fallbackLng,
 ns: string | string[] = defaultNS
) {
 return {
  // debug: true,
  supportedLngs: languages,
  fallbackLng,
  lng,
  fallbackNS: defaultNS,
  defaultNS,
  ns,
 };
}
