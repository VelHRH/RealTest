"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FC, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginUser: FC = () => {
 const [login, setLogin] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
  e.preventDefault();
  const res = await fetch(`${process.env.API_HOST}/user/login`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ login, password }),
   cache: "no-store",
  });
  const data = await res.json();
  if (data.error) {
   toast.error("Login error!");
  } else {
   router.back();
   router.refresh();
  }
 };
 return (
  <form
   className="flex flex-col gap-5 w-[40%] items-center mt-7"
   onSubmit={handleSubmit}
  >
   <Input
    placeholder="Your login..."
    value={login}
    color="yellow"
    setValue={setLogin}
    isDisplay
   />
   <Input
    type="password"
    placeholder="Your password..."
    value={password}
    color="yellow"
    setValue={setPassword}
    isDisplay={login.length >= 2}
   />
   <div
    className={`w-1/2 duration-500 ${
     login.length >= 2 && password.length >= 8 ? "opacity-100" : "opacity-0"
    }`}
   >
    <Button size="medium" color="yellow">
     Login
    </Button>
   </div>
  </form>
 );
};

export default LoginUser;
