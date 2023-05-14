import { FC, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
 children: ReactNode;
 size?: string;
 color?: string;
 isAnimate?: boolean;
 isLoading?: boolean;
 icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
 children,
 size,
 color,
 isAnimate,
 isLoading,
 icon,
}) => {
 return (
  <button
   disabled={isLoading}
   className={`uppercase flex items-center justify-center font-bold ${
    !isLoading && "hover:text-white hover:ring-white"
   } duration-300 ring-4 bg-gradient-to-r text-gray-100 ${
    size === "small"
     ? "font-semibold text-xl rounded-sm w-32 gap-2 py-1 "
     : size === "medium"
     ? "text-2xl rounded-md w-44 py-2 gap-3"
     : "text-4xl rounded-lg w-64 py-3 gap-4"
   } ${isAnimate && !isLoading && "animate-bounce"} ${
    color === "blue"
     ? "from-blue-500 to-blue-700 ring-blue-400"
     : color === "red"
     ? "from-red-400 to-red-600 ring-red-300"
     : color === "yellow"
     ? "from-amber-500 to-amber-600 ring-amber-400"
     : "from-slate-500 to-slate-700 ring-slate-400"
   }`}
  >
   {isLoading ? (
    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
   ) : (
    icon
   )}
   {isLoading ? "LOADING" : children}
  </button>
 );
};

export default Button;
