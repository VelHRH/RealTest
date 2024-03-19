"use client";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";
import Button from "./ui/Button";

const stripePromise = loadStripe(
 "pk_test_51N7GehIc2aHxSrSdwHJPaaatpNGOgwZMJkEnQTRIdQ9gjCd6YCZCBrO82u0gzVbICbqrnCip9FCFBGtNJX4J5kNC00uUgNR62c"
);
interface StripePaymentProps {
 companyId: string;
 balance: number;
 lng: string;
}

const handleStripe = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    amount: string,
    companyId: string
   ) => {
    e.preventDefault();
    const stripe = await stripePromise;
  
    if (!stripe) {
      throw new Error("Stripe key error")
    }
  
    const res = await fetch(
     `${process.env.API_HOST}/company/stripe-session/${companyId}`,
     {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
     }
    );
    const session = await res.json();
  
    await stripe.redirectToCheckout({ sessionId: session.id });
   };

const StripePayment: FC<StripePaymentProps> = ({ companyId, balance, lng }) => {

 const [isConfirm, setIsConfirm] = useState<boolean>(false);
 const [amount, setAmount] = useState<string>('0');

 const { t } = useTranslation(lng);
 const [hydrated, setHydrated] = useState(false);
 useEffect(() => {
  setHydrated(true);
 }, []);
 if (!hydrated) {
  return null;
 }
 return (
  <Elements stripe={stripePromise}>
   <div className="w-full flex gap-3 items-center">
    <div
     onClick={(e) => {
      setIsConfirm(!isConfirm);
      if (isConfirm) {
       handleStripe(e, amount, companyId);
      }
     }}
     className={`flex justify-between ${isConfirm ? "w-3/4" : "w-full"}`}
    >
     <Button
      size="medium"
      color="yellow"
      icon={<FontAwesomeIcon icon={faCoins} />}
     >
      {isConfirm ? t("Confirm?") : `${balance} $`}
     </Button>
    </div>
    {isConfirm && (
     <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-1/4 px-2 rounded-md text-2xl h-full font-semibold outline-none"
     />
    )}
   </div>
  </Elements>
 );
};

export default StripePayment;
