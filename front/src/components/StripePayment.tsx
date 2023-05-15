// @ts-nocheck
"use client";

import { FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
 "pk_test_51N7GehIc2aHxSrSdwHJPaaatpNGOgwZMJkEnQTRIdQ9gjCd6YCZCBrO82u0gzVbICbqrnCip9FCFBGtNJX4J5kNC00uUgNR62c"
);
interface StripePaymentProps {
 params: { amount: string; id: string };
}

const StripePayment: FC<StripePaymentProps> = ({ params }) => {
 const handleStripe = async (
  e: React.FormEvent<HTMLFormElement>,
  amount: number
 ) => {
  e.preventDefault();
  const stripe = await stripePromise;

  const res = await fetch(
   `${process.env.API_HOST}/company/stripe-session/${params.id}`,
   {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 50 }),
   }
  );
  const session = await res.json();

  await stripe.redirectToCheckout({ sessionId: session.id });
 };
 return (
  <Elements stripe={stripePromise}>
   <button onClick={handleStripe}>PAY</button>
  </Elements>
 );
};

export default StripePayment;
