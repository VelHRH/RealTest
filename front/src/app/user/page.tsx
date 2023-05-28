import Headline from "@/components/ui/Headline";
import UserCard from "@/components/user/UserCard";

const getUsers = async () => {
 const res = await fetch(`${process.env.API_HOST}/user`, { cache: "no-store" });
 const users = await res.json();
 return users;
};

const page = async () => {
 const users = (await getUsers()) as IUser[];
 return (
  <>
   <Headline color="yellow" classes="font-bold text-4xl mb-10 mt-16">
    all profiles:
   </Headline>
   <div className="grid grid-cols-6 gap-3">
    {users.map((user) => (
     <UserCard
      key={user._id}
      _id={user._id}
      login={user.login}
      avatarUrl={user.avatarUrl}
      role={user.role}
     />
    ))}
   </div>
  </>
 );
};

export default page;
