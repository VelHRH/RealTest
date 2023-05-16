import CompanyAdmin from "@/components/company/CompanyAdmin";
import DeleteBtn from "@/components/company/DeleteBtn";
import Button from "@/components/ui/Button";
import Headline from "@/components/ui/Headline";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const page = async ({ params }: { params: { id: string } }) => {
 const res = await fetch(`${process.env.API_HOST}/company/${params.id}`, {
  cache: "no-store",
 });
 const company = await res.json();

 return (
  <div className="flex w-full gap-6 mt-5">
   <div className="w-1/4 flex flex-col items-center">
    <Image
     alt="Company image"
     src={`${process.env.API_HOST}/${company.avatarUrl}`}
     width={700}
     height={700}
     className="w-full aspect-square object-cover rounded-lg shadow-lg mb-2"
    />
    <Headline color="yellow" classes="text-5xl font-bold mb-7">
     {company.name}
    </Headline>
    <Link href={`/`} className="mb-7">
     <Button
      size="medium"
      color="blue"
      icon={<FontAwesomeIcon icon={faGear} />}
     >
      Tests
     </Button>
    </Link>
    <DeleteBtn />
   </div>
   <div className="flex-1 flex flex-col">
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg flex items-center justify-between">
     <legend className="px-2 text-zinc-500 font-semibold">rating</legend>
     <div className="text-2xl font-semibold">Your rating:</div>
     <Headline classes="text-5xl font-semibold" color="yellow">
      4.75
     </Headline>
    </fieldset>
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
     <legend className="px-2 text-zinc-500 font-semibold">description</legend>
     {company.description}
    </fieldset>
    {company.admins.length > 0 && (
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
    <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
     <legend className="px-2 text-zinc-500 font-semibold">tests</legend>
     tests
    </fieldset>
   </div>
  </div>
 );
};

export default page;
