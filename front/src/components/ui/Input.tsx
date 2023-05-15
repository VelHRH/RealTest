import { FC } from "react";

interface InputProps {
 color?: string;
 value: string;
 setValue: (value: string) => void;
 placeholder?: string;
 isDisplay?: boolean;
}

const Input: FC<InputProps> = ({
 setValue,
 value,
 color,
 placeholder,
 isDisplay,
}) => {
 return (
  <div
   className={`w-full bg-gradient-to-r ${
    color === "blue"
     ? "from-blue-500 to-blue-700"
     : color === "red"
     ? "from-red-400 to-red-600"
     : color === "yellow"
     ? "from-amber-400 to-amber-600"
     : "from-slate-500 to-slate-700"
   } p-1 mt-4 ${isDisplay ? "opacity-100" : "opacity-0"} duration-500`}
  >
   <input
    placeholder={placeholder}
    className={`bg-zinc-900 w-full h-full p-2 text-white font-medium text-lg outline-none ${
     isDisplay ? "flex" : "hidden"
    }`}
    onChange={(e) => setValue(e.target.value)}
    value={value}
   />
  </div>
 );
};

export default Input;
