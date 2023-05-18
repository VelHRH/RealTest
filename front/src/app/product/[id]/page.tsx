import StarRating from "@/components/StarRating";
import Headline from "@/components/ui/Headline";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cookies } from "next/headers";
import { checkAuth } from "@/middleware";
import Link from "next/link";
import Button from "@/components/ui/Button";
import TestCard from "@/components/TestCard";
const page = async ({ params }: { params: { id: string } }) => {
 const res = await fetch(`${process.env.API_HOST}/test/product/${params.id}`, {
  cache: "no-store",
 });
 const product = await res.json();
 const res2 = await fetch(
  `${process.env.API_HOST}/company/${product.companyId}`,
  {
   cache: "no-store",
  }
 );
 const company = await res2.json();
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value);
 return (
  <>
   <div className="flex w-full gap-5 mt-7 text-white pb-7 mb-7 border-b-2 border-zinc-700">
    <div className="flex-1 ">
     <div className="font-bold text-5xl flex justify-between pb-4 border-b-2 border-zinc-700 mb-4">
      {product.name}
      <Link
       href={`/company/${product.companyId}`}
       className="text-3xl font-semibold hover:underline duration-200"
      >
       {company.name}
      </Link>
     </div>
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg flex items-center justify-between">
      <legend className="px-2 text-zinc-500 font-semibold">rating</legend>
      {user.login && (
       <StarRating
        item="product"
        _id={params.id}
        defaultRating={
         product.ratings.find(
          (r: { userId: string; value: number }) => r.userId === user._id
         )?.value || 0
        }
       />
      )}

      <Headline classes="text-5xl font-bold" color="yellow">
       {product.avgRating === 0 ? "--" : product.avgRating}
      </Headline>
     </fieldset>
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
      <legend className="px-2 text-zinc-500 font-semibold">description</legend>
      {product.description}
     </fieldset>
    </div>
    <div className="w-1/5 flex flex-col items-center">
     <Image
      alt="Product image"
      src={`${process.env.API_HOST}/${product.imgUrl}`}
      width={700}
      height={700}
      priority
      className="w-full aspect-square object-cover rounded-full shadow-lg mb-2"
     />
     <div className="text-4xl font-semibold mt-2">{product.price} $</div>
    </div>
   </div>
   <div className="w-full flex flex-col text-3xl text-white mb-5">
    <div className="w-full flex items-center justify-between font-semibold">
     Tests:{" "}
     <div className="w-24">
      <Button
       size="small"
       color="blue"
       icon={<FontAwesomeIcon icon={faPlus} />}
      >
       Add
      </Button>
     </div>
    </div>
    <div className="mt-5 grid grid-cols-6 text-base gap-5">
     <TestCard name="Test for iPhone" isExecuted={false} />
    </div>
   </div>
  </>
 );
};

export default page;
