import { FC } from "react";

interface TestCardProps {
 isExecuted?: boolean;
 name: string;
}

const TestCard: FC<TestCardProps> = ({ isExecuted, name }) => {
 return (
  <div className="border-2 border-zinc-700 p-5 flex flex-col w-full rounded-xl text-gray-100 hover:border-zinc-100 hover:text-white duration-300 cursor-pointer">
   <h1 className="text-xl font-semibold">{name}</h1>
   <div className="flex items-center">
    <div
     className={`${
      isExecuted ? "bg-red-500" : "bg-green-500"
     }  w-2 mt-3 aspect-square rounded-full`}
    ></div>
   </div>
  </div>
 );
};

export default TestCard;
