import Button from "@/components/ui/Button";
import TypedBanner from "@/components/ui/TypedBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Headline from "@/components/ui/Headline";

export default function Home() {
 return (
  <>
   <div className="min-h-[86vh] w-full flex items-center">
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="blue">
     <TypedBanner text="Create your account to rate products' quality and get access to unique information about companies" />
    </Headline>
    <div className="w-1/2 flex justify-center">
     <Button
      color="blue"
      isAnimate
      icon={<FontAwesomeIcon icon={faUserPlus} />}
     >
      Sing Up
     </Button>
    </div>
   </div>
   <div className="min-h-screen w-full flex items-center">
    <div className="w-1/2 flex justify-center">
     <Button color="red" isAnimate>
      Register
     </Button>
    </div>
    <Headline classes="font-bold text-7xl h-full w-1/2 lowercase" color="red">
     <TypedBanner text="Register your company and be among the first to receive unique data about your product" />
    </Headline>
   </div>
  </>
 );
}
