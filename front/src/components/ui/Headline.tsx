import { FC, ReactNode } from "react";

interface HeadlineProps {
 color?: string;
 children: ReactNode;
 classes: string;
}

const Headline: FC<HeadlineProps> = ({ color, children, classes }) => {
 return (
  <div
   className={`${classes} leading-tight text-transparent bg-clip-text bg-gradient-to-r ${
    color === "blue"
     ? "from-blue-500 to-blue-700"
     : color === "red"
     ? "from-red-400 to-red-600"
     : color === "yellow"
     ? "from-amber-400 to-amber-600"
     : "text-white"
   }`}
  >
   {children}
  </div>
 );
};

export default Headline;
