import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
 return (
  <div className="flex flex-col items-start mt-16 mb-10">
   <Skeleton width="w-44" height="h-10" />
   <div className="grid w-full grid-cols-6 gap-3 mt-16 mb-5">
    {[...Array(6).keys()].map((i) => (
     <Skeleton key={i} width="w-full" height="h-64" />
    ))}
   </div>
  </div>
 );
}
