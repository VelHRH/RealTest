"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface BinomialFormProps {}

const BinomialForm: FC<BinomialFormProps> = ({}) => {
  const [peopleNumber, setPeopleNumber] = useState<string>("");
  const pathname = usePathname();
  const handleClick = () => {
    window.location.href = `${pathname}?people=${peopleNumber}`;
  };
  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-2xl">Model for people:</h2>
      <Input
        value={peopleNumber}
        setValue={setPeopleNumber}
        placeholder="Enter number"
        type="number"
        isDisplay
        color="yellow"
      ></Input>
      <button onClick={handleClick}>
        <Button color="yellow" size="small">
          Model
        </Button>
      </button>
    </div>
  );
};

export default BinomialForm;
