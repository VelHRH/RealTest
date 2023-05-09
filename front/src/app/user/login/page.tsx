"use client";
import { FC, useState } from "react";

const Page: FC = ({}) => {
 const [login, setLogin] = useState<string>("");
 const [password, setPassword] = useState<string>("");

 const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
  e.preventDefault();
  const res = await fetch("http://localhost:8000/user/login", {
   method: "POST",
   credentials: "include",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ login, password }),
   cache: "no-store",
  });
  const data = res.json();
  console.log(data);
 };

 return (
  <form className="flex flex-col w-[40%] items-center" onSubmit={handleSubmit}>
   <input
    type="text"
    placeholder="login"
    className="outline-none border-2 p-2 border-slate-800"
    value={login}
    onChange={(e) => setLogin(e.target.value)}
   ></input>
   <input
    type="text"
    placeholder="password"
    className="outline-none border-2 p-2 border-slate-800"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
   ></input>
   <button>OK</button>
  </form>
 );
};

export default Page;
