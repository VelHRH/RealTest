import CompanyBanner from "@/components/CompanyBanner";
import Headline from "@/components/ui/Headline";

const page = async () => {
 return (
  <div className="flex flex-col items-center">
   <Headline classes="text-5xl font-bold mt-16 lowercase" color="yellow">
    companies
   </Headline>
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    <CompanyBanner
     description="ddddddav mdovm kj biknd cksnvd kjnd k dvsvevgsegvsgvs v svx dv ddddddddddddddd ddaa"
     name="sssssssssssssss"
     avatarUrl="https://fireship.io/lessons/image-search-engine/img/featured.webp"
     owner="aasssssssa"
     tests={["qq"]}
    />
   </div>
  </div>
 );
};

export default page;
