"use client";
import { FC } from "react";
import TypewriterComponent from "typewriter-effect";

interface TypedBannerProps {
 text: string;
}

const TypedBanner: FC<TypedBannerProps> = ({ text }) => {
 return (
  <TypewriterComponent
   onInit={(typewriter) => {
    typewriter.typeString(text).pauseFor(20).start();
   }}
  />
 );
};

export default TypedBanner;
