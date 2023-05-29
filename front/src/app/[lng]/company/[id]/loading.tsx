import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
 return (
  <div className="flex w-full gap-6 mt-5">
   <div className="w-1/4 flex flex-col items-center">
    <Skeleton width="w-full" height="h-[80vh]" />
   </div>
   <div className="flex-1 flex flex-col gap-4">
    {[...Array(4).keys()].map((i) => (
     <Skeleton key={i} width="w-full" height="h-24" />
    ))}
   </div>
  </div>
 );
}
