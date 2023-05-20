import { cookies } from "next/headers";

const getTest = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/test/${id}`, {
  cache: "no-store",
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const test = await res.json();
 return test;
};

const page = async ({ params }: { params: { id: string } }) => {
 const test = await getTest(params.id);
 console.log(test);
 return <div className="w-full text-w">{test.name}</div>;
};

export default page;
