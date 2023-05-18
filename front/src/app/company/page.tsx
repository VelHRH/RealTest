import CompanyBanner from "@/components/company/CompanyBanner";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";

const page = async () => {
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 const res = await fetch(`${process.env.API_HOST}/company`, {
  cache: "no-store",
 });
 const companies = await res.json();
 return (
  <div className="flex flex-col items-center">
   <div className="mt-16 flex w-full justify-between items-center mb-5">
    <Headline classes="text-5xl font-bold lowercase" color="yellow">
     companies
    </Headline>
    {user.login && (
     <Link href="/company/add">
      <Button
       color="yellow"
       size="small"
       icon={<FontAwesomeIcon icon={faPlus} />}
      >
       Add
      </Button>
     </Link>
    )}
   </div>
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    {companies.reverse().map((company: CompanyProps) => (
     <CompanyBanner
      key={company._id}
      description={company.description}
      name={company.name}
      avatarUrl={`${process.env.API_HOST}/${company.avatarUrl}`}
      owner={company.owner}
      tests={company.tests}
      avgRating={company.avgRating}
      _id={company._id}
     />
    ))}
   </div>
  </div>
 );
};

export default page;
