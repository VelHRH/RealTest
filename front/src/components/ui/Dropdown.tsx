"use client";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface DropdownProps {
 color?: string;
 array?: { _id: string; name: string }[];
 value: string;
 setValue: (value: string) => void;
 isSelect: boolean;
 setIsSelect: (value: boolean) => void;
 placeholder: string;
}

const Dropdown: FC<DropdownProps> = ({
 array,
 color,
 value,
 setValue,
 isSelect,
 setIsSelect,
 placeholder,
}) => {
 return (
  <div
   className={`w-full p-1 bg-gradient-to-r ${
    color === "blue"
     ? "from-blue-400 to-blue-600"
     : color === "red"
     ? "from-red-400 to-red-600"
     : "from-amber-400 to-amber-600"
   }`}
  >
   <button
    onClick={() => setIsSelect(!isSelect)}
    className={`flex bg-zinc-900 w-full h-full items-center justify-between p-2 ${
     value === "" ? "text-zinc-400" : "text-zinc-50"
    } font-medium`}
   >
    {value === "" ? placeholder || "Choose..." : value}
    <FontAwesomeIcon icon={isSelect ? faChevronUp : faChevronDown} />
   </button>

   {isSelect &&
    array?.map((item) => (
     <button
      key={item._id}
      onClick={() => {
       setValue(item.name);
       setIsSelect(false);
      }}
      className="p-1 w-full mt-1 bg-transparent font-medium border-4 border-zinc-900 rounded-xl text-zinc-900 hover:text-white hover:bg-zinc-900 duration-300"
     >
      {item.name}
     </button>
    ))}
  </div>
 );
};

export default Dropdown;
