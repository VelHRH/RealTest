"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FC, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const RegisterUser: FC = () => {
 const [login, setLogin] = useState<string>("");
 const [email, setEmail] = useState<string>("");
 const [name, setName] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
  e.preventDefault();
  const res = await fetch(`${process.env.API_HOST}/user/register`, {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ login, password, email, name }),
   cache: "no-store",
  });
  const data = await res.json();
  if (data.error) {
   toast.error("Register error!");
  } else {
   router.push("/user/login");
  }
 };
 return (
  <form
   className="flex flex-col gap-5 w-[40%] items-center mt-7"
   onSubmit={handleSubmit}
  >
   <Input
    placeholder="Short login..."
    value={login}
    color="yellow"
    setValue={setLogin}
    isDisplay
   />
   <Input
    placeholder="Your full name..."
    value={name}
    color="yellow"
    setValue={setName}
    isDisplay={login.length >= 2}
   />
   <Input
    placeholder="Your email..."
    value={email}
    color="yellow"
    setValue={setEmail}
    isDisplay={login.length >= 2 && name.length >= 4}
   />
   <Input
    type="password"
    placeholder="Your password..."
    value={password}
    color="yellow"
    setValue={setPassword}
    isDisplay={login.length >= 2 && name.length >= 4 && email.length >= 5}
   />
   <div
    className={`w-1/2 duration-500 ${
     login.length >= 2 &&
     name.length >= 4 &&
     email.length >= 5 &&
     password.length >= 8
      ? "opacity-100"
      : "opacity-0"
    }`}
   >
    <Button size="medium" color="yellow">
     Register
    </Button>
   </div>
  </form>
 );
};

export default RegisterUser;
