import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
 return (
  <div className="flex flex-col items-start mt-16">
   <Skeleton width="w-44" height="h-12" />
   <div className="grid w-full grid-cols-5 gap-5 mt-16 mb-5">
    {[...Array(5).keys()].map((i) => (
     <Skeleton key={i} width="w-full" height="h-80" />
    ))}
   </div>
  </div>
 );
}
