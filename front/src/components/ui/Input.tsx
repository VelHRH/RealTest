import { FC } from "react";

interface InputProps {
 color?: string;
 value: string;
 setValue: (value: string) => void;
 placeholder: string;
 isDisplay?: boolean;
 type?: string;
}

const Input: FC<InputProps> = ({
 setValue,
 value,
 color,
 placeholder,
 isDisplay,
 type,
}) => {
 return (
  <fieldset
   className={`relative border-[3px] p-3 w-full ${
    color === "blue"
     ? "border-blue-500"
     : color === "red"
     ? "border-red-500"
     : color === "yellow"
     ? "border-amber-400"
     : "border-zinc-400"
   } p-1 ${isDisplay ? "opacity-100" : "opacity-0"} duration-500`}
  >
   <input
    placeholder={placeholder}
    className={`bg-zinc-900 w-full h-full text-white font-medium text-lg outline-none ${
     isDisplay ? "flex" : "hidden"
    } peer  focus:placeholder-zinc-900`}
    onChange={(e) => setValue(e.target.value)}
    value={value}
    type={type || "text"}
   />
   <legend className="px-2 font-semibold text-amber-400 hidden peer-focus:flex leading-[.16rem]">
    {placeholder}
   </legend>
  </fieldset>
 );
};

export default Input;
