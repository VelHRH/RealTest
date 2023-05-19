import CompanyAdmin from "@/components/company/CompanyAdmin";
import ConfirmBtn from "@/components/ui/ConfirmBtn";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import StarRating from "@/components/StarRating";
import { checkAdmin, checkAuth, checkOwner } from "@/middleware";
import { cookies } from "next/headers";
import StripePayment from "@/components/StripePayment";
import ProductCard from "@/components/ProductCard";
import CompanyDeviceCard from "@/components/device/CompanyDeviceCard";

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

const getDevicesByCompany = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchases/${id}`, {
  cache: "no-store",
 });
 const devices = await res.json();
 return devices;
};

const page = async ({ params }: { params: { id: string } }) => {
 const company = (await getCompany(params.id)) as ICompany;
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 const isAdmin = await checkAdmin({
  userLogin: user.login,
  companyId: company._id,
 });
 const isOwner = await checkOwner({
  userLogin: user.login,
  companyId: company._id,
 });
 const products = (await getProductsByCompany(params.id)) as IProduct[];
 const devices = await getDevicesByCompany(params.id);
 return (
  <div className="flex w-full gap-6 mt-5">
   <div className="w-1/4 flex flex-col items-center">
    <Image
     alt="Company image"
     src={`${process.env.API_HOST}/${company.avatarUrl}`}
     width={700}
     height={700}
     priority
     className="w-full aspect-square object-cover rounded-lg shadow-lg mb-2"
    />
    <Headline color="yellow" classes="text-5xl font-bold mb-7">
     {company.name}
    </Headline>

    <div className="w-full flex flex-wrap gap-5">
     {isAdmin && (
      <Link href={`/`} className="w-2/5">
       <Button
        size="medium"
        color="blue"
        icon={<FontAwesomeIcon icon={faPlus} />}
       >
        Test
       </Button>
      </Link>
     )}
     {isAdmin && (
      <Link
       href={{
        pathname: `/product/add`,
        query: { companyId: company._id, companyName: company.name },
       }}
       className={`flex-1 ${!isAdmin && "w-full"}`}
      >
       <Button
        size="medium"
        color="blue"
        icon={isAdmin && <FontAwesomeIcon icon={faPlus} />}
       >
        Product
       </Button>
      </Link>
     )}
     {isAdmin && (
      <StripePayment companyId={params.id} balance={company.balance} />
     )}
     {isOwner && (
      <ConfirmBtn
       companyId={company._id}
       icon={<FontAwesomeIcon icon={faTrash} />}
       action="DELETE_COMPANY"
      >
       Delete
      </ConfirmBtn>
     )}
    </div>
   </div>
   <div className="flex-1 flex flex-col">
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg flex items-center justify-between">
     <legend className="px-2 text-zinc-500 font-semibold">rating</legend>
     {user.login && (
      <StarRating
       item="company"
       _id={params.id}
       defaultRating={
        company.ratings.find(
         (r: { userId: string; value: number }) => r.userId === user._id
        )?.value || 0
       }
      />
     )}

     <Headline classes="text-5xl font-bold" color="yellow">
      {company.avgRating === 0 ? "--" : company.avgRating}
     </Headline>
    </fieldset>
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
     <legend className="px-2 text-zinc-500 font-semibold">description</legend>
     {company.description}
    </fieldset>
    {company.admins?.length > 0 && (
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4 flex gap-4 flex-wrap">
      <legend className="px-2 text-zinc-500 font-semibold">admins</legend>
      {company.admins.map((admin: string) => (
       <>
        {/* @ts-expect-error Server Component */}
        <CompanyAdmin key={admin}>{admin}</CompanyAdmin>
       </>
      ))}
     </fieldset>
    )}

    {products.length !== 0 && (
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4 grid grid-cols-3 gap-3">
      <legend className="px-2 text-zinc-500 font-semibold">products</legend>
      {products.map((prod: IProduct) => (
       <ProductCard key={prod._id} _id={prod._id} rating={prod.avgRating}>
        {prod.name}
       </ProductCard>
      ))}
     </fieldset>
    )}
    {devices.length !== 0 && (
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4 flex flex-wrap gap-3">
      <legend className="px-2 text-zinc-500 font-semibold">devices</legend>
      {devices.map((device: { name: string; _id: string }) => (
       <CompanyDeviceCard key={device._id} _id={device._id}>
        {device.name}
       </CompanyDeviceCard>
      ))}
     </fieldset>
    )}
   </div>
  </div>
 );
};

export default page;
