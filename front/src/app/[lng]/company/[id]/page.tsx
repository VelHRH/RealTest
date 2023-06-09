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
import { useTranslation } from "../../../i18n";
import { getCompany } from "@/fetch/company";
import { getProductsByCompany } from "@/fetch/product";
import { getDevicesByCompany } from "@/fetch/device";

export async function generateMetadata({ params }: IParams) {
 const company = await getCompany(params.id);
 return { title: company.name };
}

const Company = async ({ params }: IParams) => {
 const company = await getCompany(params.id);
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 const isAdmin = await checkAdmin({
  userLogin: user.login,
  companyId: company._id,
 });
 const isOwner = await checkOwner({
  userLogin: user.login,
  companyId: company._id,
 });
 const products = await getProductsByCompany(params.id);
 const devices = await getDevicesByCompany(params.id);
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
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
      <Link
       href={{
        pathname: `${params.lng}/test/add`,
        query: { companyId: company._id },
       }}
       className="w-2/5"
      >
       <Button
        size="medium"
        color="blue"
        icon={<FontAwesomeIcon icon={faPlus} />}
       >
        {t("Test")}
       </Button>
      </Link>
     )}
     {isAdmin && (
      <Link
       href={{
        pathname: `${params.lng}/product/add`,
        query: { companyId: company._id, companyName: company.name },
       }}
       className={`flex-1 ${!isAdmin && "w-full"}`}
      >
       <Button
        size="medium"
        color="blue"
        icon={isAdmin && <FontAwesomeIcon icon={faPlus} />}
       >
        {t("Product")}
       </Button>
      </Link>
     )}
     {isAdmin && (
      <StripePayment
       companyId={params.id}
       balance={company.balance}
       lng={params.lng}
      />
     )}
     {isOwner && (
      <ConfirmBtn
       lng={params.lng}
       companyId={company._id}
       icon={<FontAwesomeIcon icon={faTrash} />}
       action="DELETE_COMPANY"
      >
       {t("Delete")}
      </ConfirmBtn>
     )}
    </div>
   </div>
   <div className="flex-1 flex flex-col">
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg flex items-center justify-between">
     <legend className="px-2 text-zinc-500 font-semibold">{t("rating")}</legend>
     {user.login && (
      <StarRating
       item="company"
       lng={params.lng}
       _id={params.id}
       defaultRating={
        company.ratings.find(
         (r: { userId: string; value: number }) => r.userId === user._id
        )?.value || 0
       }
      />
     )}

     <Headline classes="text-5xl font-bold" color="yellow">
      {company.avgRating === 0 ? "--" : company.avgRating.toFixed(2)}
     </Headline>
    </fieldset>
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
     <legend className="px-2 text-zinc-500 font-semibold">
      {t("description")}
     </legend>
     {company.description}
    </fieldset>
    {company.admins?.length > 0 && (
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4 flex gap-4 flex-wrap">
      <legend className="px-2 text-zinc-500 font-semibold">
       {t("admins")}
      </legend>
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
      <legend className="px-2 text-zinc-500 font-semibold">
       {t("products")}
      </legend>
      {products.map((prod: IProduct) => (
       <ProductCard key={prod._id} _id={prod._id} rating={prod.avgRating}>
        {prod.name}
       </ProductCard>
      ))}
     </fieldset>
    )}
    {devices.length !== 0 && (
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4 flex flex-wrap gap-3">
      <legend className="px-2 text-zinc-500 font-semibold">
       {t("devices")}
      </legend>
      {devices.map((device: { name: string; _id: string; isFree: boolean }) => (
       <CompanyDeviceCard
        key={device._id}
        _id={device._id}
        isFree={device.isFree}
        lng={params.lng}
       >
        {device.name}
       </CompanyDeviceCard>
      ))}
     </fieldset>
    )}
   </div>
  </div>
 );
};

export default Company;
