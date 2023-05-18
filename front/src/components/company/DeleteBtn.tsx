"use client";
import { FC, useState } from "react";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeleteBtnProps {
 companyId: string;
}

const deleteCompany = async ({ companyId }: { companyId: string }) => {
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

const DeleteBtn: FC<DeleteBtnProps> = ({ companyId }) => {
 const [areYouSure, setAreYouSure] = useState(false);
 const handleClick = async () => {
  const res = await deleteCompany({ companyId });
  if (res.success) {
   window.location.href = "/";
  }
 };
 return (
  <div className="w-full flex flex-col items-center mb-7">
   {!areYouSure ? (
    <div onClick={() => setAreYouSure(true)} className="w-full">
     <Button
      size="medium"
      color="red"
      icon={<FontAwesomeIcon icon={faTrash} />}
     >
      Delete
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

export default DeleteBtn;
