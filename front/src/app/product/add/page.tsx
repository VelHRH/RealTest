import AddProduct from "@/components/AddProduct";
import Headline from "@/components/ui/Headline";
import { FC } from "react";

interface PageProps {
 searchParams: { companyName: string; companyId: string };
}

const Page: FC<PageProps> = ({ searchParams }) => {
 console.log(searchParams.companyName);
 return (
  <div className="flex flex-col w-full items-center">
   <Headline color="blue" classes="text-4xl font-bold">
    Adding new product...
   </Headline>
   <AddProduct
    companyName={searchParams.companyName}
    companyId={searchParams.companyId}
   />
  </div>
 );
};

export default Page;
