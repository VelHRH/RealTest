import Headline from "@/components/ui/Headline";
import LoginUser from "@/components/user/LoginUser";
import Link from "next/link";

const page = () => {
 return (
  <div className="flex flex-col w-full items-center mt-10">
   <div className="flex justify-between items-end w-[40%] text-white">
    <Headline color="yellow" classes="text-4xl font-bold">
     Logging in
    </Headline>
    <Link
     href={`/user/register`}
     className="font-semibold duration-300 hover:underline text-lg"
    >
     Not registered yet?
    </Link>
   </div>
   <LoginUser />
  </div>
 );
};

export default page;
