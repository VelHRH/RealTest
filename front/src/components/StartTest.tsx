"use client";
import { FC, useState } from "react";
import Button from "./ui/Button";

interface StartTestProps {
 testId: string;
}

const StartTest: FC<StartTestProps> = ({ testId }) => {
 const [isDate, setIsDate] = useState<boolean>(false);
 const [endDate, setEndDate] = useState<string>("");
 const handleSubmit = async () => {
  if (!isDate) {
   setIsDate((prev) => !prev);
  } else {
   const res = await fetch(`${process.env.API_HOST}/test/${testId}/result`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify({
     testEnd: `${endDate}T00:00:00.000+00:00`,
    }),
   });
   const response = await res.json();
   if (response.success) {
    window.location.reload();
   }
  }
 };
 return (
  <div className="w-1/2 flex gap-2 items-center">
   <div className={`${isDate ? "w-2/3" : "w-full"}`} onClick={handleSubmit}>
    <Button color="yellow" size="medium">
     Start test
    </Button>
   </div>
   {isDate && (
    <input
     type="date"
     className="flex-1 rounded-md h-full p-1"
     value={endDate}
     onChange={(e) => setEndDate(e.target.value)}
    ></input>
   )}
  </div>
 );
};

export default StartTest;
