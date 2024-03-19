import { useTranslation } from "@/app/i18n";
import AnalyticsSection from "@/components/testResults/AnalyticsSection";
import Headline from "@/components/ui/Headline";

const TestAnalytics = async ({
  params,
}: {
  params: { id: string; lng: string };
}) => {
  const { t } = (await useTranslation(params.lng)) as TranslationResult;
  return (
    <div className="flex flex-col gap-5 items-center">
      <Headline classes="text-4xl font-bold">Test analytics:</Headline>
      <AnalyticsSection
        link={`/test/${params.id}/analytics/binomial`}
        title={t("Prognose approaches based on overall customers number")}
        className="bg-yellow-400/70 hover:bg-yellow-400"
      >
        {t(
          "Using data from the test to simulate similar situations with more or fewer customers. Using this test, you can find out the exact probability of performing a certain number of approaches given the total number of visitors in your establishment. The binomial distribution is used to build the model."
        )}
      </AnalyticsSection>
      <AnalyticsSection
        link={`/test/${params.id}/analytics/binomial`}
        title={t("Prognose approaches based on overall customers number")}
        className="bg-red-400/70 hover:bg-red-400"
      >
        {t(
          "Using data from the test to simulate similar situations with more or fewer customers. Using this test, you can find out the exact probability of performing a certain number of approaches given the total number of visitors in your establishment. The binomial distribution is used to build the model."
        )}
      </AnalyticsSection>
      <AnalyticsSection
        link={`/test/${params.id}/analytics/binomial`}
        title={t("Prognose approaches based on overall customers number")}
        className="bg-blue-400/70 hover:bg-blue-400"
      >
        {t(
          "Using data from the test to simulate similar situations with more or fewer customers. Using this test, you can find out the exact probability of performing a certain number of approaches given the total number of visitors in your establishment. The binomial distribution is used to build the model."
        )}
      </AnalyticsSection>
    </div>
  );
};

export default TestAnalytics;
