import Headline from "@/components/ui/Headline";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
 return (
  <div className="flex flex-col items-center">
   <Headline classes="text-5xl font-bold mt-16 lowercase" color="yellow">
    companies
   </Headline>
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    {[...Array(10).keys()].map((i) => (
     <Skeleton key={i} width="w-full" height="h-80" />
    ))}
   </div>
  </div>
 );
}
