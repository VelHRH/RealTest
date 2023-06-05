import Device from "@/components/device/Device";
import { getMyCompanies } from "@/fetch/company";
import { getDevice } from "@/fetch/device";
import { checkAuth } from "@/middleware";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: IParams) {
 const device = await getDevice(params.id);
 return { title: device.name };
}

const page = async ({ params }: { params: { id: string; lng: string } }) => {
 const device = await getDevice(params.id);
 const user = await checkAuth(cookies().get("COOKIE_AUTH")?.value || "");
 const myCompanies = await getMyCompanies();

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
