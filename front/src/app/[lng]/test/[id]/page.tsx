import CompanyDeviceCard from "@/components/device/CompanyDeviceCard";
import ProductCard from "@/components/ProductCard";
import StartTest from "@/components/test/StartTest";
import DeleteTest from "@/components/test/DeleteTest";
import { checkAdmin, checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import Result from "@/components/Result";

const getTest = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/${id}`, {
  cache: "no-store",
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const test = await res.json();
 return test;
};

const getPurchase = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchase/${id}`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
  cache: "no-store",
 });
 const purchase = await res.json();
 return purchase;
};

const getProduct = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/product/${id}`, {
  cache: "no-store",
 });
 const product = await res.json();
 return product;
};

const getResults = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/${id}/result`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
  cache: "no-store",
 });
 const results = await res.json();
 return results;
};

const page = async ({ params }: { params: { id: string } }) => {
 const test = (await getTest(params.id)) as ITest;
 const purchase = (await getPurchase(test.purchaseId)) as IPurchase;
 const product = (await getProduct(test.productId)) as IProduct;
 const user = (await checkAuth(cookies().get("COOKIE_AUTH")?.value)) as IUser;
 const isAdmin = await checkAdmin({
  userLogin: user.login,
  companyId: product.companyId,
 });
 const results = await getResults(params.id);
 return (
  <>
   <div className="flex gap-2 items-center">
    <div className="w-1/2 text-white border-4 border-zinc-700 rounded-2xl p-5 mt-7">
     <div className="font-bold text-4xl mb-10">{test.name}</div>
     <div className="text-xl mb-4 flex items-center">
      <div className="font-semibold mr-2">Creator:</div>
      <div>{test.testCreator}</div>
     </div>
     <div className="text-xl mb-5 flex items-center">
      <div className="font-semibold mr-2">Product:</div>
      <div>
       <ProductCard _id={product._id} rating={product.avgRating}>
        {product.name}
       </ProductCard>
      </div>
     </div>
     <div className="text-xl mb-4 flex items-center">
      <div className="font-semibold mr-2">Device:</div>
      <CompanyDeviceCard _id={purchase._id} isFree={purchase.isFree}>
       {purchase.name || ""}
      </CompanyDeviceCard>
     </div>
     <div className="text-xl mb-4 flex items-center">
      <div className="font-semibold mr-2">Reporting:</div>
      <div>{test.reportingFrequency}</div>
     </div>
    </div>
    <div className="flex-1 flex justify-center">
     {!test.testStart ? (
      <div className={`flex flex-col w-1/2 gap-6`}>
       <StartTest testId={test._id} />
       <DeleteTest testId={test._id} />
      </div>
     ) : (
      <div className="w-2/3 text-2xl text-zinc-200 flex flex-col gap-3">
       <h1>
        <span className="font-semibold">
         Started: {new Date(test.testStart).toLocaleString()}
        </span>
       </h1>
       <h1>
        <span className="font-semibold">
         Ending: {new Date(test.testEnd!).toLocaleString()}
        </span>
       </h1>
      </div>
     )}
    </div>
   </div>
   {isAdmin && test.testStart && (
    <div className="flex flex-col gap-4 mt-7 w-full mb-7">
     <h1 className="mb-3 pb-2 border-b-2 border-zinc-700 font-bold text-3xl text-zinc-100">
      Results:
     </h1>
     {!results.error &&
      results.map((result: IResult) => (
       <Result
        key={result._id}
        appoaches={result.approaches}
        resultEnd={result.resultEnd}
        resultSatrt={result.resultStart}
       />
      ))}
    </div>
   )}
  </>
 );
};

export default page;
