"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PoissonFormProps {
  start: string;
  end: string;
}

const PoissonForm: FC<PoissonFormProps> = ({ start, end }) => {
  const searchParams = useSearchParams();
  const [startDate, setStartDate] = useState(
    searchParams.get("start") || start
  );
  const [endDate, setEndDate] = useState(searchParams.get("end") || end);
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  const handleClick = () => {
    window.location.href = `${pathname}?start=${startDate}&end=${endDate}`;
  };
  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-2xl text-red-100">Model for date:</h2>
      <Input
        value={startDate}
        setValue={setStartDate}
        placeholder="Enter number"
        type="datetime-local"
        isDisplay
        color="red"
      ></Input>
      <Input
        value={endDate}
        setValue={setEndDate}
        placeholder="Enter number"
        type="datetime-local"
        isDisplay
        color="red"
      ></Input>
      <button onClick={handleClick}>
        <Button color="red" size="small">
          Go
        </Button>
      </button>
    </div>
  );
};

export default PoissonForm;
