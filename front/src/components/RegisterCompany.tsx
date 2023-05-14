"use client";
import { FC, useState } from "react";
import Input from "./ui/Input";

interface RegisterCompanyProps {}

const RegisterCompany: FC<RegisterCompanyProps> = ({}) => {
 const [name, setName] = useState("");
 const [desc, setDesc] = useState("");
 const [avatarUrl, setAvatarUrl] = useState("");
 const handleStripe = async (
  e: React.FormEvent<HTMLFormElement>,
  amount: number
 ) => {
  e.preventDefault();

  const res = await fetch(`http://localhost:8000/company/create`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ amount: 50 }),
  });
 };
 return (
  <form
   onSubmit={() => handleStripe}
   className="w-full flex flex-col items-center mt-7"
  >
   <Input
    value={name}
    setValue={setName}
    placeholder="Company name"
    color="yellow"
    isDisplay
   />
   <Input
    value={desc}
    setValue={setDesc}
    placeholder="Company description"
    color="yellow"
    isDisplay={name.length >= 2}
   />
   <Input
    value={desc}
    setValue={setDesc}
    placeholder="Company image"
    color="yellow"
    isDisplay={desc.length >= 2 && name.length >= 2}
   />
  </form>
 );
};

export default RegisterCompany;
