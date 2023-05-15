import { cookies } from "next/headers";

const Page = async () => {
 const res = await fetch(
  `${process.env.API_HOST}/test/64562fdb01e74b9ee4eb16e1`,
  {
   headers: {
    Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
   },
  }
 );
 const data = await res.json();
 return (
  <div>
   <i className="fa-solid fa-magnifying-glass"></i>
  </div>
 );
};

export default Page;
