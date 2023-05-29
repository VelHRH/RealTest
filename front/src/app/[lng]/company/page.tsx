import CompanyBanner from "@/components/company/CompanyBanner";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";
import { useTranslation } from "../../i18n";

export const metadata = {
 title: "Companies",
 description: "All registered companies.",
};

const Companies = async ({ params }: { params: { lng: string } }) => {
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 const res = await fetch(`${process.env.API_HOST}/company`, {
  cache: "no-store",
 });
 const { t } = (await useTranslation(params.lng)) as TranslationResult;
 const companies = (await res.json()) as ICompany[];
 return (
  <div className="flex flex-col items-center">
   <div className="mt-16 flex w-full justify-between items-center mb-5">
    <Headline classes="text-5xl font-bold lowercase" color="yellow">
     {t("companies")}
    </Headline>
    {user.login && (
     <Link href={`${params.lng}/company/add`}>
      <Button
       color="yellow"
       size="small"
       icon={<FontAwesomeIcon icon={faPlus} />}
      >
       {t("add")}
      </Button>
     </Link>
    )}
   </div>
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    {companies.reverse().map((company: ICompany) => (
     <>
      {/* @ts-expect-error Server Component */}
      <CompanyBanner
       key={company._id}
       description={company.description}
       name={company.name}
       avatarUrl={`${process.env.API_HOST}/${company.avatarUrl}`}
       owner={company.owner}
       avgRating={company.avgRating}
       _id={company._id}
       lng={params.lng}
      />
     </>
    ))}
   </div>
  </div>
 );
};

export default Companies;
