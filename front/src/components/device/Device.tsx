"use client";
import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faCheck,
 faGear,
 faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Button from "../ui/Button";
import FrequencyButton from "./FrequencyButton";
import ConfirmBtn from "../ui/ConfirmBtn";
import { useTranslation } from "../../app/i18n/client";

interface DeviceProps {
 name: string;
 description: string;
 price: number;
 imgUrl: string;
 rFr?: string;
 isBought?: boolean;
 deviceId: string;
 companies?: ICompany[];
 isBtnHidden?: boolean;
 isFree?: boolean;
 lng: string;
}

const changeDevice = async (id: string, defaultReportingFrequency: string) => {
 const res = await fetch(`${process.env.API_HOST}/company/purchase/${id}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  credentials: "include",
  body: JSON.stringify({
   defaultReportingFrequency,
  }),
 });
 const device = await res.json();
 return device;
};

const Device: FC<DeviceProps> = ({
 name,
 description,
 price,
 imgUrl,
 isBought,
 rFr,
 deviceId,
 companies,
 isBtnHidden,
 isFree,
 lng,
}) => {
 const [changing, setChanging] = useState(false);
 const [reportingFrequency, setReportingFrequency] = useState(rFr || "");
 const handleClick = async () => {
  const res = await changeDevice(deviceId, reportingFrequency);
  if (res.success) {
   window.location.reload();
  }
 };
 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }
 return (
  <div className="flex flex-col">
   {isBought && (
    <div className="flex justify-around my-5 items-center font-bold text-2xl text-white border-y-2 border-zinc-700 py-3">
     {isFree ? (
      <div className={`flex items-center text-green-500 py-1`}>
       <FontAwesomeIcon icon={faCheck} className="mr-2" />
       <div>{t("free to use now")}</div>
      </div>
     ) : (
      <div className={`flex items-center text-red-500 py-1`}>
       <FontAwesomeIcon icon={faExclamation} className="mr-2" />
       <div>{t("already in use")}</div>
      </div>
     )}
     {changing ? (
      <div className="flex w-2/5 text-lg gap-4">
       <FrequencyButton
        value={reportingFrequency}
        setValue={setReportingFrequency}
       >
        Every 15 minutes
       </FrequencyButton>
       <FrequencyButton
        value={reportingFrequency}
        setValue={setReportingFrequency}
       >
        Every 30 minutes
       </FrequencyButton>
       <FrequencyButton
        value={reportingFrequency}
        setValue={setReportingFrequency}
       >
        Every hour
       </FrequencyButton>
      </div>
     ) : (
      <h1>
       {t("Reporting")} {rFr}
      </h1>
     )}
    </div>
   )}
   <div className="flex w-full gap-5 mt-5 text-white mb-5">
    <div className="flex flex-col flex-1">
     <div className="w-full text-4xl font-bold mb-3">{t(name)}</div>
     <fieldset className="w-full border-2 border-zinc-700 p-4 text-white rounded-lg text-lg mt-4">
      <legend className="px-2 text-zinc-500 font-semibold">
       {t("description")}
      </legend>
      {t(description)}
     </fieldset>
     <div className="flex flex-col items-center mt-9 w-1/3">
      {isBought ? (
       !changing ? (
        <div onClick={() => setChanging(true)} className="w-full">
         <Button
          size="medium"
          color="yellow"
          icon={<FontAwesomeIcon icon={faGear} />}
         >
          {t("Change")}
         </Button>
        </div>
       ) : (
        <div className="flex flex-col items-center w-full text-white text-3xl font-bold">
         <div>{t("Confirm?")}</div>
         <div className="w-full flex gap-2 mt-2">
          <button
           onClick={() => handleClick()}
           className="w-1/2 py-1 bg-green-600 rounded-md hover:bg-green-800"
          >
           {t("Yes")}
          </button>
          <button
           className="w-1/2 py-1 bg-red-500 rounded-md hover:bg-red-800"
           onClick={() => setChanging(false)}
          >
           {t("No")}
          </button>
         </div>
        </div>
       )
      ) : (
       !isBtnHidden &&
       companies?.map((company) => (
        <ConfirmBtn
         key={company._id}
         action="PURCHASE_DEVICE"
         companyId={company._id}
         deviceId={deviceId}
         lng={lng}
        >
         {`${t("Buy for")} ${company.name} - ${price.toString()}$`}
        </ConfirmBtn>
       ))
      )}
     </div>
    </div>
    <div className="flex flex-col w-1/5">
     <Image
      alt="Device image"
      src={`${process.env.API_HOST}/${imgUrl}`}
      width={700}
      height={700}
      priority
      className="w-full aspect-square object-cover rounded-full shadow-lg mb-2"
     />
    </div>
   </div>
  </div>
 );
};

export default Device;
