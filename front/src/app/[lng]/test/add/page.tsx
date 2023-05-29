import AddTest from "@/components/test/AddTest";
import Headline from "@/components/ui/Headline";
import { checkAdmin, checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useTranslation } from "../../../i18n";

export const metadata = {
 title: "Create test",
 description: "Creating new test",
};

interface PageProps {
 searchParams: { companyId?: string };
 params: { lng: string };
}

const getCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/${id}`, {
  cache: "no-store",
 });
 const company = await res.json();
 return company;
};

const getProductsByCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/products/${id}`, {
  cache: "no-store",
 });
 const products = await res.json();
 return products;
};

const getPurchasesByCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchases/${id}`, {
  cache: "no-store",
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const purchases = await res.json();
 console.log(purchases);
 let returnPurchases = [];
 for (let i of purchases) {
  const res2 = await fetch(
   `${process.env.API_HOST}/company/purchase/${i._id}`,
   {
    cache: "no-store",
    headers: {
     Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
    },
   }
  );
  const purchase = await res2.json();
  purchase.isFree === true && returnPurchases.push(purchase);
 }
 return returnPurchases;
};

const Page = async ({ searchParams, params }: PageProps) => {
 const company = (await getCompany(searchParams.companyId || "")) as ICompany;
 const products = (await getProductsByCompany(
  searchParams.companyId || ""
 )) as IProduct[];
 const purchases = (await getPurchasesByCompany(
  searchParams.companyId || ""
 )) as IPurchase[];
 const user = (await checkAuth(cookies().get("COOKIE_AUTH")?.value)) as IUser;
 if (
  !(await checkAdmin({
   userLogin: user.login,
   companyId: searchParams.companyId,
  }))
 ) {
  redirect(`${params.lng}/company/${searchParams.companyId || ""}`);
 }
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 return (
  <div className="flex flex-col w-full items-center mt-10">
   <Headline color="yellow" classes="text-4xl font-bold">
    {t("Adding new test...")}
   </Headline>
   <AddTest
    companyName={company.name}
    products={products}
    purchases={purchases}
    lng={params.lng}
   />
  </div>
 );
};

export default Page;
