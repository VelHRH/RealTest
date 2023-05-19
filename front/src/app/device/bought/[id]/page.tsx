import Device from "@/components/device/Device";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getPurchase = async (id: string, cookie: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchase/${id}`, {
  headers: {
   Cookie: `COOKIE_AUTH=${cookie}`,
  },
  cache: "no-store",
 });
 const purchase = await res.json();
 return purchase;
};

const getDevice = async (id: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/device/${id}`, {
  cache: "no-store",
 });
 const device = await res.json();
 return device;
};

const page = async ({ params }: { params: { id: string } }) => {
 const purchase = (await getPurchase(
  params.id,
  cookies().get("COOKIE_AUTH")?.value || ""
 )) as IPurchase;
 if ("error" in purchase) {
  redirect(`/company`);
 }
 const device = (await getDevice(purchase.deviceId)) as IDevice;
 return (
  <Device
   deviceId={purchase._id}
   rFr={purchase.defaultReportingFrequency}
   name={device.name}
   description={device.description}
   imgUrl={device.imgUrl}
   isBought={true}
   price={device.price}
   companyId={purchase.companyId}
  />
 );
};

export default page;
