export const getUser = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/user/getOne/${id}`, {
  cache: "no-store",
 });
 return (await res.json()) as IUser;
};
