import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrazilianRealSign } from "@fortawesome/free-solid-svg-icons";

interface LogoProps {
 size: string;
}

const Logo: FC<LogoProps> = ({ size }) => {
 return (
  <FontAwesomeIcon
   icon={faBrazilianRealSign}
   className={`bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900 p-2 rounded-xl ${
    size === "small" ? "text-3xl" : "text-5xl"
   }`}
  />
 );
};

export default Logo;
