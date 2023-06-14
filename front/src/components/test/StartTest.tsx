"use client";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";

interface StartTestProps {
 testId: string;
 text: string;
 testName: string;
}

const StartTest: FC<StartTestProps> = ({ testId, text, testName }) => {
 const [isDate, setIsDate] = useState<boolean>(false);
 const [endDate, setEndDate] = useState<string>("");
 const handleSubmit = async () => {
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
   toast.success("Test started!");
   window.location.reload();
  }
 };
 return (
  <>
   {isDate && (
    <div className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-70">
     <div
      className={`w-2/3 rounded-xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-amber-200 p-10 gap-8 flex flex-col items-center font-semibold`}
     >
      <p className="text-4xl">Your company has no more tests to pair!</p>
      <div className="flex justify-center gap-4 items-center">
       Start "{testName}" at
       <input
        type="date"
        className="rounded-md p-1"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
       ></input>
      </div>
      <div className="flex justify-around w-2/3">
       <div
        onClick={() => {
         setIsDate((prev) => !prev);
        }}
        className="w-1/3"
       >
        <Button color="red" size="medium">
         Cancel
        </Button>
       </div>
       <div onClick={handleSubmit} className="w-1/3">
        <Button
         color={endDate !== "" ? "blue" : "grey"}
         size="medium"
         isDisabled={endDate === ""}
        >
         Start
        </Button>
       </div>
      </div>
     </div>
    </div>
   )}
   <div className="w-full flex gap-2 items-center">
    <div
     className={`w-full`}
     onClick={() => {
      setIsDate((prev) => !prev);
     }}
    >
     <Button color="yellow" size="medium">
      {text}
     </Button>
    </div>
   </div>
  </>
 );
};

export default StartTest;
