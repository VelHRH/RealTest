import Device from "@/components/device/Device";
import { getDevice, getPurchase } from "@/fetch/device";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: IParams) {
 const device = await getPurchase(params.id);
 return { title: device.name };
}

const page = async ({ params }: { params: { id: string; lng: string } }) => {
 const purchase = await getPurchase(params.id);
 if ("error" in purchase) {
  redirect(`/company`);
 }
 const device = await getDevice(purchase.deviceId);
 return (
  <Device
   deviceId={purchase._id}
   rFr={purchase.defaultReportingFrequency}
   name={device.name}
   description={device.description}
   imgUrl={device.imgUrl}
   isBought={true}
   price={device.price}
   isFree={purchase.isFree}
   lng={params.lng}
  />
 );
};

export default page;
