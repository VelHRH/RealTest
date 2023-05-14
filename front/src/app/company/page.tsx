import CompanyBanner from "@/components/CompanyBanner";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const page = async () => {
 const res = await fetch("http://localhost:8000/company", {
  cache: "no-store",
 });
 const companies = await res.json();
 return (
  <div className="flex flex-col items-center">
   <Headline classes="text-5xl font-bold mt-16 lowercase mb-5" color="yellow">
    companies
   </Headline>
   <Button color="yellow" size="small" icon={<FontAwesomeIcon icon={faPlus} />}>
    <Link href="/company/add">Add</Link>
   </Button>
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    {companies.map((company: CompanyProps) => (
     <CompanyBanner
      key={company._id}
      description={company.description}
      name={company.name}
      avatarUrl="https://fireship.io/lessons/image-search-engine/img/featured.webp"
      owner={company.owner}
      tests={company.tests}
      _id={company._id}
     />
    ))}
   </div>
  </div>
 );
};

export default page;
