import { useTranslation } from "@/app/i18n";
import AnalyticsSection from "@/components/testResults/AnalyticsSection";
import Headline from "@/components/ui/Headline";
import { getTest } from "@/fetch/test";

const TestAnalytics = async ({
  params,
}: {
  params: { id: string; lng: string };
}) => {
  const test = await getTest(params.id);
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
        link={`/test/${params.id}/analytics/poisson`}
        title={t(
          "The probability that the product will be approached by at least a certain number"
        )}
        className="bg-red-400/70 hover:bg-red-400"
      >
        {t(
          "For any of the time periods captured by the test, it is possible, based on the data obtained, to make predictions about the number of people who will approach the product over the same period in the future. For this purpose, the Poisson distribution is used."
        )}
      </AnalyticsSection>
      {test.pairTest && (
        <AnalyticsSection
          link={`/test/${params.id}/analytics/anova`}
          title={t("Compare several tests")}
          className="bg-blue-400/70 hover:bg-blue-400"
        >
          {t(
            "In the case of conducting several tests simultaneously for one product, the system simultaneously receives different sets of data for identical products located in different places. Using this data, you can see how statistically significant the differences are using analysis of variance (ANOVA)."
          )}
        </AnalyticsSection>
      )}
    </div>
  );
};

export default TestAnalytics;
