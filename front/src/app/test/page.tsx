import TestCard from "@/components/test/TestCard";
import Headline from "@/components/ui/Headline";
import { cookies } from "next/headers";

const Page = async () => {
 const res = await fetch(`${process.env.API_HOST}/test`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const tests = (await res.json()) as ITest[];
 return (
  <>
   <Headline color="yellow" classes="font-bold text-4xl mb-7 mt-10">
    All tests:
   </Headline>
   <div className="grid grid-cols-6 gap-3">
    {tests.map((test) => (
     <TestCard
      key={test._id}
      _id={test._id}
      name={test.name}
      isExecuted={test.isExecuted}
     />
    ))}
   </div>
  </>
 );
};

export default Page;
