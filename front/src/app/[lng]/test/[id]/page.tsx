import ProductCard from "@/components/ProductCard";
import ApproachCharts from "@/components/charts/ApproachCharts";
import CompanyDeviceCard from "@/components/device/CompanyDeviceCard";
import DeleteTest from "@/components/test/DeleteTest";
import StartTest from "@/components/test/StartTest";
import PeriodDetails from "@/components/testResults/PeriodDetails";
import { getPurchase } from "@/fetch/device";
import { getProduct } from "@/fetch/product";
import { getResults, getTest, getTests } from "@/fetch/test";
import { checkAdmin, checkAuth } from "@/middleware";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";
import { useTranslation } from "../../../i18n";

export async function generateMetadata({ params }: IParams) {
  const test = await getTest(params.id);
  return { title: test.name };
}

const Test = async ({ params }: { params: { id: string; lng: string } }) => {
  const allTests = await getTests();
  const test = allTests.find((t) => t._id === params.id)!;
  const purchase = await getPurchase(test.purchaseId);
  const product = await getProduct(test.productId);
  const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
  const isAdmin = await checkAdmin({
    userLogin: user.login,
    companyId: product.companyId,
  });
  const { allClients, filteredResults } = await getResults(params.id);
  const { t } = (await useTranslation(params.lng)) as TranslationResult;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="w-1/2 text-white border-4 border-zinc-700 rounded-2xl p-5 mt-7">
          <div className="font-bold text-4xl mb-10">{test.name}</div>
          <div className="text-xl mb-4 flex items-center">
            <div className="font-semibold mr-2">{t("Creator")}:</div>
            <div>{test.testCreator}</div>
          </div>
          <div className="text-xl mb-5 flex items-center">
            <div className="font-semibold mr-2">{t("Product")}:</div>
            <div>
              <ProductCard _id={product._id} rating={product.avgRating}>
                {product.name}
              </ProductCard>
            </div>
          </div>
          <div className="text-xl mb-4 flex items-center">
            <div className="font-semibold mr-2">{t("Device")}:</div>
            <CompanyDeviceCard
              _id={purchase._id}
              isFree={purchase.isFree}
              lng={params.lng}
            >
              {purchase.name || ""}
            </CompanyDeviceCard>
          </div>
          <div className="text-xl mb-4 flex items-center">
            <div className="font-semibold mr-2">{t("Reporting")}:</div>
            <div>{test.reportingFrequency}</div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {!test.testStart ? (
            <div className={`flex flex-col w-1/2 gap-6`}>
              <StartTest
                testId={test._id}
                text={t("Start test")}
                otherTests={allTests.filter(
                  (t) =>
                    t.companyId === product.companyId &&
                    t.testStart === undefined &&
                    t._id !== test._id
                )}
              />
              <DeleteTest testId={test._id} text={t("Delete test")} />
            </div>
          ) : (
            <div className="w-2/3 text-2xl text-zinc-200 flex flex-col gap-3">
              <h1>
                <span className="font-semibold">
                  {t("Started")}: {format(test.testStart, "dd MMM HH:mm:ss")}
                </span>
              </h1>
              <h1>
                <span className="font-semibold">
                  {t("Ending")}: {format(test.testEnd!, "dd MMM HH:mm:ss")}
                </span>
              </h1>
              <h1>
                <span className="font-semibold">
                  {t("Total approaches")}: {allClients}
                </span>
              </h1>
            </div>
          )}
        </div>
      </div>
      {isAdmin && filteredResults.length && (
        <>
          <div className="flex flex-col gap-2">
            {/* @ts-expect-error Server Component */}
            <ApproachCharts results={filteredResults} lng={params.lng} />
            <Link
              href={`/test/${params.id}/analytics`}
              className="text-amber-100 text-2xl hover:text-transparent mx-auto hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 font-bold cursor-pointer duration-300"
            >
              Full analytics
            </Link>
          </div>
          <PeriodDetails lng={params.lng} results={filteredResults} />
        </>
      )}
    </div>
  );
};

export default Test;
