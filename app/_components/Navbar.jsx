import { useState } from "react";

export default function Navbar() {
  const [showBorder, setShowBorder] = useState(true);
  return (
    <div
      className={`w-full p-3 pb-0 flex flex-col sm:flex-row justify-between items-center ${
        showBorder ? "border-b border-gray-300" : ""
      }`}
      style={{ height: "10%" }}
    >
      <img
        src=".././images/image.png"
        alt="Logo"
        className="h-10 w-auto mb-2 sm:mb-0"
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
