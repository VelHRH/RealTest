"use client";
import { FC, ReactNode, useState } from "react";
import Button from "../ui/Button";

interface ConfirmBtnProps {
 companyId: string;
 deviceId?: string;
 icon?: ReactNode;
 children: string;
 action: string;
}

const deleteCompany = async (companyId: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/${companyId}`, {
  method: "DELETE",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  credentials: "include",
 });
 const company = await res.json();
 return company;
};

const purchaseDevice = async (companyId: string, deviceId: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchase/create`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({ companyId, deviceId }),
  credentials: "include",
 });
 const device = await res.json();
 return device;
};

const ConfirmBtn: FC<ConfirmBtnProps> = ({
 companyId,
 deviceId,
 icon,
 children,
 action,
}) => {
 const [areYouSure, setAreYouSure] = useState(false);
 const handleClick = async () => {
  if (action === "DELETE_COMPANY") {
   const res = await deleteCompany(companyId);
   if (res.success) {
    window.location.href = "/company";
   }
  }
  if (action === "PURCHASE_DEVICE") {
   const res = await purchaseDevice(companyId, deviceId || "");
   if (res._id) {
    window.location.reload();
   }
  }
 };
 return (
  <div className="w-full flex flex-col items-center mb-7">
   {!areYouSure ? (
    <div onClick={() => setAreYouSure(true)} className="w-full">
     <Button size="medium" color="red" icon={icon}>
      {children}
     </Button>
    </div>
   ) : (
    <div className="flex flex-col items-center w-full text-white text-3xl font-bold">
     <div>Are you sure?</div>
     <div className="w-full flex gap-2 mt-2">
      <button
       onClick={() => handleClick()}
       className="w-1/2 py-1 bg-green-600 rounded-md hover:bg-green-800"
      >
       Yes
      </button>
      <button
       className="w-1/2 py-1 bg-red-500 rounded-md hover:bg-red-800"
       onClick={() => setAreYouSure(false)}
      >
       No
      </button>
     </div>
    </div>
   )}
  </div>
 );
};

export default ConfirmBtn;
