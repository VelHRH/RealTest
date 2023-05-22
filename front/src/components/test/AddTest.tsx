"use client";
import { FC, useEffect, useState } from "react";
import Input from "../ui/Input";

import { useRouter } from "next/navigation";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const CreateTest = async () => {};

interface AddTestProps {
 companyName: string | undefined;
 products: IProduct[];
 purchases: IPurchase[];
}

const AddTest: FC<AddTestProps> = ({ companyName, products, purchases }) => {
 const [product, setProduct] = useState<string>("");
 const [isProductSelect, setIsProductSelect] = useState<boolean>(false);
 const [device, setDevice] = useState<string>("");
 const [isDeviceSelect, setIsDeviceSelect] = useState<boolean>(false);
 const [frequency, setFrequency] = useState<string>("");
 const [isFrequencySelect, setIsFrequencySelect] = useState<boolean>(false);
 const [name, setName] = useState<string>("");
 const router = useRouter();
 if (!companyName) {
  router.back();
 }

 useEffect(() => {
  setFrequency(
   purchases.find((purchase) => purchase.name === device)
    ?.defaultReportingFrequency || ""
  );
 }, [device]);

 const frequencies = [
  { _id: "1", name: "Every 15 minutes" },
  { _id: "2", name: "Every 30 minutes" },
  { _id: "3", name: "Every hour" },
 ];

 const handleSubmit = async () => {
  const res = await fetch(`${process.env.API_HOST}/test/create`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    purchaseId: purchases.find((purchase) => purchase.name === device)?._id,
    productId: products.find((pr) => pr.name === product)?._id,
    reportingFrequency: frequency,
    name,
   }),
   cache: "no-store",
  });
  const data = await res.json();
  if (data.error) {
   toast.error("Ошибка авторизации!");
  } else {
   router.push(`/test/${data._id}`);
  }
 };

 return (
  <div className="w-1/2 flex flex-col items-center gap-4">
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
    placeholder="Choose product to test..."
   />
   {product !== "" && (
    <Dropdown
     array={purchases}
     value={device}
     setValue={setDevice}
     isSelect={isDeviceSelect}
     setIsSelect={setIsDeviceSelect}
     placeholder="Choose device..."
    />
   )}
   {device !== "" && (
    <Dropdown
     array={frequencies}
     value={frequency}
     setValue={setFrequency}
     isSelect={isFrequencySelect}
     setIsSelect={setIsFrequencySelect}
     placeholder={`Choose reporting frequency...`}
    />
   )}

   <Input
    type="text"
    placeholder="Name your test..."
    color="yellow"
    value={name}
    setValue={setName}
    isDisplay={frequency !== ""}
   />
   {name.length >= 2 && (
    <div onClick={handleSubmit} className="w-1/3 mt-5">
     <Button color="yellow" size="medium">
      Create
     </Button>
    </div>
   )}
  </div>
 );
};

export default AddTest;
