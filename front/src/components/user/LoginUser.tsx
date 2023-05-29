"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useTranslation } from "../../app/i18n/client";

const LoginUser = ({ lng }: { lng: string }) => {
 const [login, setLogin] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const router = useRouter();

 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }

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
   toast.error(t("Login error!"));
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
    placeholder={`${t("Your login...")}`}
    value={login}
    color="yellow"
    setValue={setLogin}
    isDisplay
   />
   <Input
    type="password"
    placeholder={`${t("Your password...")}`}
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
     {t("Login")}
    </Button>
   </div>
  </form>
 );
};

export default LoginUser;
