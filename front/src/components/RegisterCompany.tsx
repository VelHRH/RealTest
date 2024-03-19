"use client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";
import Button from "./ui/Button";
import Input from "./ui/Input";

const RegisterCompany = ({ lng }: { lng: string }) => {
 const [name, setName] = useState("");
 const [desc, setDesc] = useState("");
 const [selectedImage, setSelectedImage] = useState<File>();
 const [avatarUrl, setAvatarUrl] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter();
 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }

 const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const formData = new FormData();
  const file = e.target.files![0];
  setSelectedImage(file);
  formData.append("image", e.target.files![0]);
  const res = await fetch(`${process.env.API_HOST}/upload`, {
   method: "POST",
   body: formData,
   cache: "no-store",
  });
  const imgUrl = await res.json();
  setAvatarUrl(imgUrl.url);
 };

 const createCompany = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  const res = await fetch(`${process.env.API_HOST}/company/create`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   credentials: "include",
   body: JSON.stringify({
    name,
    description: desc,
    avatarUrl,
   }),
   cache: "no-store",
  });
  const company = await res.json();
  if (company._id) {
   router.push(`/company/${company._id}`);
  } else {
   setIsLoading(false);
  }
 };
 return (
  <form className="w-full flex mt-7" onSubmit={createCompany}>
   <div className="flex flex-col items-center w-1/2 gap-5">
    <Input
     value={name}
     setValue={setName}
     placeholder={t("Company name")}
     color="yellow"
     isDisplay
    />
    <Input
     value={desc}
     setValue={setDesc}
     placeholder={t("Company description")}
     color="yellow"
     isDisplay={name.length >= 2}
    />
    {selectedImage ? (
     <Image
      alt="New image"
      src={URL.createObjectURL(selectedImage)}
      width={700}
      height={700}
      className="w-1/2 mt-4 aspect-square object-cover mr-2 rounded-md"
     />
    ) : (
     <div
      className={`w-full mt-4 hover:scale-105 duration-300 ${
       desc.length < 2 || name.length < 2 ? "opacity-0" : "opacity-100"
      } duration-500 bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-lg`}
     >
      <label
       htmlFor="uploadImg"
       className={`mr-2 flex w-full justify-between text-zinc-900 items-center cursor-pointer ${
        desc.length < 2 || name.length < 2 ? "hidden" : "flex"
       }`}
      >
       <div className="text-2xl font-semibold">
        {t("Upload your company image")}
       </div>
       <FontAwesomeIcon icon={faUpload} className={`text-4xl`} />
      </label>
      <input
       type="file"
       id="uploadImg"
       accept="image/*"
       className="hidden"
       onChange={addImageHandler}
      />
     </div>
    )}
   </div>
   <div className="flex-1 flex items-center justify-center">
    <div className="w-1/3">
     <Button
      size="big"
      color={`${
       desc.length >= 2 && name.length >= 2 && selectedImage ? "yellow" : "grey"
      }`}
      isAnimate={!!(desc.length >= 2 && name.length >= 2 && selectedImage)}
      isDisabled={desc.length < 2 || name.length < 2 || !selectedImage}
      isLoading={isLoading}
     >
      {t("Create")}
     </Button>
    </div>
   </div>
  </form>
 );
};

export default RegisterCompany;
