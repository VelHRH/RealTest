import Device from "@/components/device/Device";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";

const getDevice = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/device/${id}`, {
  cache: "no-store",
 });
 const device = await res.json();
 return device;
};

const getMyCompanies = async () => {
 const res = await fetch(`${process.env.API_HOST}/company/my/getAll`, {
  cache: "no-store",
  headers: {
   Cookie: `COOKIE_AUTH=${cookies().get("COOKIE_AUTH")?.value}`,
  },
 });
 const companies = await res.json();
 return companies;
};

const page = async ({ params }: { params: { id: string; lng: string } }) => {
 const device = await getDevice(params.id);
 const user = (await checkAuth(
  cookies().get("COOKIE_AUTH")?.value || ""
 )) as IUser;
 const myCompanies = (await getMyCompanies()) as ICompany[];

 return (
  <Device
   companies={myCompanies}
   deviceId={device._id}
   name={device.name}
   description={device.description}
   imgUrl={device.imgUrl}
   price={device.price}
   isBtnHidden={user._id ? false : true}
   lng={params.lng}
  />
 );
};

export default page;
