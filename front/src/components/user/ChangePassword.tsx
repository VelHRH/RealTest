"use client";
import { FC, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const ChangePassword: FC = () => {
 const [isChanging, setIsChanging] = useState<boolean>(false);
 const [result, setResult] = useState<string>("");
 const [oldPassword, setOldPassword] = useState<string>("");
 const [newPassword, setNewPassword] = useState<string>("");
 const [repeatPassword, setRepeatPassword] = useState<string>("");

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
 return (
  <div className="w-full mt-4 flex justify-center">
   {!isChanging ? (
    <div onClick={() => setIsChanging(true)} className="w-1/2 flex-col">
     <Button size="small" color="yellow">
      Change password
     </Button>
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
