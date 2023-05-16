import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CompanyAdminProps {
 children: string;
 isDelete?: boolean;
}

const CompanyAdmin = async ({ children, isDelete }: CompanyAdminProps) => {
 const res = await fetch(
  `${process.env.API_HOST}/user/getByLogin/${children}`,
  { cache: "no-store" }
 );
 const user = await res.json();
 if (!user._id) return null;
 return (
  <Link
   href={`/user/${user._id}`}
   className={`flex items-center px-2 bg-sky-400 text-lg text-zinc-950 font-semibold rounded-sm hover:scale-105 duration-300 cursor-pointer`}
  >
   {children}
   <FontAwesomeIcon
    icon={faXmark}
    className="ml-2 text-zinc-950 hover:text-zinc-500 transition"
   />
  </Link>
 );
};

export default CompanyAdmin;
