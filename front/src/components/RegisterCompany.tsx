// @ts-nocheck
"use client";
import React, { FC, useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const RegisterCompany: FC = () => {
 const [name, setName] = useState("");
 const [desc, setDesc] = useState("");
 const [selectedImage, setSelectedImage] = useState(null);

 const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const formData = new FormData();
  const file = e.target.files[0];
  setSelectedImage(file);
  formData.append("image", e.target.files[0]);
  await fetch(`http://localhost:8000/upload`, {
   method: "POST",
   body: formData,
   cache: "no-store",
  });
 };

 const createCompany = async (e: React.React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 };
 return (
  <form className="w-full flex mt-7" onSubmit={createCompany}>
   <div className="flex flex-col items-center w-1/2">
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
       <div className="text-2xl font-semibold">Upload your company image</div>
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
    <Button
     size="big"
     color={`${
      desc.length >= 2 && name.length >= 2 && selectedImage ? "yellow" : "grey"
     }`}
     isAnimate={desc.length >= 2 && name.length >= 2 && selectedImage}
     isDisabled={desc.length < 2 || name.length < 2 || !selectedImage}
    >
     Create
    </Button>
   </div>
  </form>
 );
};

export default RegisterCompany;
