import Headline from "@/components/ui/Headline";
import RegisterUser from "@/components/user/RegisterUser";
import Link from "next/link";

const page = () => {
 return (
  <div className="flex flex-col w-full items-center mt-10">
   <div className="flex justify-between items-end w-[40%] text-white">
    <Headline color="yellow" classes="text-4xl font-bold">
     Registration
    </Headline>
    <Link
     href={`/user/login`}
     className="font-semibold duration-300 hover:underline text-lg"
    >
     Already registered?
    </Link>
   </div>
   <RegisterUser />
  </div>
 );
};

export default page;
