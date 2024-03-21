"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const BinomialForm = () => {
  const searchParams = useSearchParams();
  const [peopleNumber, setPeopleNumber] = useState<string>(
    searchParams.get("people") || "100"
  );
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

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
          Go
        </Button>
      </button>
    </div>
  );
};

export default BinomialForm;
