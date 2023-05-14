import RegisterCompany from "@/components/RegisterCompany";
import Headline from "@/components/ui/Headline";
import { FC } from "react";

const Page: FC = () => {
 return (
  <div className="flex flex-col w-full items-center">
   <Headline color="yellow" classes="text-4xl font-bold">
    Creating your company...
   </Headline>
   <RegisterCompany />
  </div>
 );
};

export default Page;
