"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";

interface DeleteTestProps {
 testId: string;
 text: string;
}

const DeleteTest: FC<DeleteTestProps> = ({ testId, text }) => {
 const router = useRouter();
 const handleSubmit = async () => {
  const res = await fetch(`${process.env.API_HOST}/test/${testId}`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   credentials: "include",
  });
  const response = await res.json();
  if (response.success) {
   router.back();
  } else {
   toast.error("Error while deleating!");
  }
 };
 return (
  <div onClick={handleSubmit} className="w-full">
   <Button color="red" size="medium">
    {text}
   </Button>
  </div>
 );
};

export default DeleteTest;
