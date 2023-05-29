"use client";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useTranslation } from "../../app/i18n/client";

const ChangePassword = ({ lng }: { lng: string }) => {
 const [isChanging, setIsChanging] = useState<boolean>(false);
 const [result, setResult] = useState<string>("");
 const [oldPassword, setOldPassword] = useState<string>("");
 const [newPassword, setNewPassword] = useState<string>("");
 const [repeatPassword, setRepeatPassword] = useState<string>("");

 const logout = async () => {
  const res = await fetch(`${process.env.API_HOST}/user/logout`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   credentials: "include",
  });
  const response = await res.json();
  if (response.success) {
   window.location.reload();
  }
 };

 const handleSubmit = async () => {
  const res = await fetch(`${process.env.API_HOST}/user/changePassword`, {
   method: "PUT",
   headers: {
    "Content-Type": "application/json;charset=utf-8",
   },
   credentials: "include",
   body: JSON.stringify({
    oldPassword,
    newPassword,
    repeatPassword,
   }),
  });
  const response = await res.json();
  setIsChanging(false);
  setNewPassword("");
  setOldPassword("");
  setRepeatPassword("");
  if (response.success) {
   setResult("Success!");
  } else {
   setResult(response.error);
  }
 };

 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }

 return (
  <div className="w-full mt-4 flex justify-center">
   {!isChanging ? (
    <div className="w-full">
     <div className="flex justify-around w-full">
      <div onClick={() => setIsChanging(true)} className="w-1/3">
       <Button size="small" color="yellow">
        {t("Change password")}
       </Button>
      </div>
      <div onClick={async () => await logout()} className="w-1/3">
       <Button color="red" size="small">
        {t("Logout")}
       </Button>
      </div>
     </div>
     {result !== "" && (
      <h3
       className={`text-lg text-center mt-2 ${
        result.includes("Success") ? "text-green-500" : "text-red-500"
       }`}
      >
       {result}
      </h3>
     )}
    </div>
   ) : (
    <div className="w-full flex justify-between items-center gap-2">
     <Input
      placeholder="Old..."
      color="yellow"
      value={oldPassword}
      setValue={setOldPassword}
      isDisplay
      type="password"
     />
     <Input
      placeholder="New..."
      color="yellow"
      value={newPassword}
      setValue={setNewPassword}
      isDisplay
      type="password"
     />
     <Input
      placeholder="Repeat..."
      color="yellow"
      value={repeatPassword}
      setValue={setRepeatPassword}
      isDisplay
      type="password"
     />
     <div className="ml-2 w-1/4" onClick={handleSubmit}>
      <Button size="small" color="yellow">
       Ok
      </Button>
     </div>
    </div>
   )}
  </div>
 );
};

export default ChangePassword;
