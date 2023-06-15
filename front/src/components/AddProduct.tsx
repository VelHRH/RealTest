// @ts-nocheck
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const AddProduct = ({
 companyName,
 companyId,
}: {
 companyName?: string;
 companyId?: string;
}) => {
 const [name, setName] = useState("");
 const [description, setDescription] = useState("");
 const [price, setPrice] = useState(0);
 const [selectedImage, setSelectedImage] = useState(null);
 const [imgUrl, setImgUrl] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter();

 const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const formData = new FormData();
  const file = e.target.files[0];
  setSelectedImage(file);
  formData.append("image", e.target.files[0]);
  const res = await fetch(`${process.env.API_HOST}/upload`, {
   method: "POST",
   body: formData,
   cache: "no-store",
  });
  const imgUrl = await res.json();
  setImgUrl(imgUrl.url);
 };

 const createProduct = async (e: React.React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  const res = await fetch(`${process.env.API_HOST}/test/product/create`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   credentials: "include",
   body: JSON.stringify({
    name,
    price,
    companyId,
    imgUrl,
    description,
   }),
   cache: "no-store",
  });
  const product = await res.json();
  if (product._id) {
   router.push(`/product/${product._id}`);
  } else {
   setIsLoading(false);
  }
 };
 return (
  <form className="w-full flex my-7" onSubmit={createProduct}>
   <div className="flex flex-col items-center w-1/2 gap-4">
    <div className="w-full p-1 mt-4 bg-gradient-to-r from-amber-400 to-amber-600">
     <div className="flex bg-zinc-900 w-full h-full items-center">
      <input
       type="text"
       value={companyName}
       disabled={companyName}
       className={`w-full outline-none bg-zinc-900 h-full p-2 ${
        companyName ? "text-amber-500" : "text-white"
       } font-medium text-lg `}
      />
     </div>
    </div>
    <Input
     value={name}
     setValue={setName}
     placeholder="Product name"
     color="yellow"
     isDisplay
    />
    <Input
     value={description}
     setValue={setDescription}
     placeholder="Product description"
     color="yellow"
     isDisplay={name.length >= 2}
    />
    <Input
     value={price}
     setValue={setPrice}
     placeholder="Your price"
     color="yellow"
     isDisplay={name.length >= 2 && description.length >= 3}
     type="number"
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
       price === 0 || name.length < 2 ? "opacity-0" : "opacity-100"
      } duration-500 bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-lg`}
     >
      <label
       htmlFor="uploadImg"
       className={`mr-2 flex w-full justify-between text-zinc-900 items-center cursor-pointer ${
        price === 0 || name.length < 2 ? "hidden" : "flex"
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
    <div className="w-1/3">
     <Button
      size="big"
      color={`${
       price > 0 && name.length >= 2 && selectedImage ? "blue" : "grey"
      }`}
      isAnimate={price >= 2 && name.length >= 2 && selectedImage}
      isDisabled={price === 0 || name.length < 2 || !selectedImage}
      isLoading={isLoading}
     >
      Create
     </Button>
    </div>
   </div>
  </form>
 );
};

export default AddProduct;
