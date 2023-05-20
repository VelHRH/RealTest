"use client";
import { FC, useState } from "react";
import Input from "../ui/Input";

import { useRouter } from "next/navigation";
import Dropdown from "../ui/Dropdown";

interface AddTestProps {
 companyName: string | undefined;
 products?: IProduct[];
 purchases?: IPurchase[];
}

const AddTest: FC<AddTestProps> = ({ companyName, products, purchases }) => {
 const [product, setProduct] = useState<string>("");
 const [isProductSelect, setIsProductSelect] = useState<boolean>(false);
 const [device, setDevice] = useState<string>("");
 const [isDeviceSelect, setIsDeviceSelect] = useState<boolean>(false);
 const router = useRouter();
 if (companyName) {
  console.log(companyName);
 } else {
  router.back();
 }

 return (
  <div className="w-1/2">
   <div className="w-full p-1 mt-4 bg-gradient-to-r from-amber-400 to-amber-600">
    <div className="flex bg-zinc-900 w-full h-full items-center">
     <input
      type="text"
      value={companyName}
      disabled={companyName ? true : false}
      className={`w-full outline-none bg-zinc-900 h-full p-2 ${
       companyName ? "text-amber-500" : "text-white"
      } font-medium text-lg `}
     />
    </div>
   </div>
   <Dropdown
    array={products}
    value={product}
    setValue={setProduct}
    isSelect={isProductSelect}
    setIsSelect={setIsProductSelect}
   />
   <Dropdown
    array={purchases}
    value={device}
    setValue={setDevice}
    isSelect={isDeviceSelect}
    setIsSelect={setIsDeviceSelect}
   />
  </div>
 );
};

export default AddTest;
