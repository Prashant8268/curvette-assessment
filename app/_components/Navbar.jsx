import { useState } from "react";
import Image from "next/image";
import pro from './image.png';
export default function Navbar() {
  return (
    <div
      className={`w-full p-3 pb-0 flex flex-col sm:flex-row justify-between items-center ${
        true ? "border-b border-gray-300" : ""
      }`}
      style={{ height: "10%" }}
    >
      <Image
        src={pro}
        width={100}
        height={300}
        alt="Picture of the author"
      />
      <span
        className="text-[#576474] font-[500] text-[28px] leading-[36.46px] text-left"
        style={{ fontFamily: "DM Sans" }}
      >
        Contact
      </span>
    </div>
  );
}
