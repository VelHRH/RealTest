import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
 return (
  <div className="w-full h-full">
   <div className="w-1/2 mt-5 ml-1/2 translate-x-[50%] rounded-3xl">
    <Skeleton width="w-full" height="h-full" />
   </div>
  </div>
 );
}
