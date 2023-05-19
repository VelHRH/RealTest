import { FC } from "react";

interface FrequencyButtonProps {
 value: string;
 setValue: (arg: string) => void;
 children: string;
}

const FrequencyButton: FC<FrequencyButtonProps> = ({
 value,
 setValue,
 children,
}) => {
 return (
  <button
   onClick={() => setValue(children)}
   className={`px-4 py-1 ${
    children === value ? "bg-transparent" : "bg-zinc-800"
   } cursor-pointer rounded-full font-semibold`}
  >
   {children}
  </button>
 );
};

export default FrequencyButton;
