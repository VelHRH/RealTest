import { cookies } from "next/headers";

const Page = async () => {
 const res = await fetch(
  "http://localhost:8000/test/64562fdb01e74b9ee4eb16e1",
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
