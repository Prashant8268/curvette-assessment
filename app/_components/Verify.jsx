import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const OtpVerification = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isEmailOtpWrong, setIsEmailOtpWrong] = useState(false);
  const [isPhoneOtpWrong, setIsPhoneOtpWrong] = useState(false);

  function onEmailVerify() {
    // Verify email OTP logic here
    if (emailOtp !== "expectedValue") {
      setIsEmailOtpWrong(true);
    } else {
      setIsEmailOtpWrong(false);
      // Proceed with successful verification logic
    }
  }

  function onPhoneVerify() {
    // Verify phone OTP logic here
    if (phoneOtp !== "expectedValue") {
      setIsPhoneOtpWrong(true);
    } else {
      setIsPhoneOtpWrong(false);
      // Proceed with successful verification logic
    }
  }

  function onResend(type) {
    // Resend OTP logic here
    console.log(`${type} OTP resent.`);
    if (type === "email") {
      setEmailOtp(""); // Reset the email OTP input
      setIsEmailOtpWrong(false);
    } else {
      setPhoneOtp(""); // Reset the phone OTP input
      setIsPhoneOtpWrong(false);
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto p-3"
      style={{
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <p className="text-center mb-6">Please verify phone number and email.</p>
      <form className="flex flex-col gap-2 w-[80%]">
        {/* Email OTP Input */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email OTP"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded focus:outline-none pr-16"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
          />
          <button
            type="button"
            onClick={() => onResend("email")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xs"
          >
            Resend OTP
          </button>
          <span
            className={`text-red-500 text-xs absolute left-0 transition-all duration-300 ${
              isEmailOtpWrong ? "opacity-100" : "opacity-0 h-0"
            }`}
            style={{
              bottom: isEmailOtpWrong ? "2.5rem" : "0", // Adjust the position of the message
            }}
          >
            Incorrect OTP. Please try again.
          </span>
        </div>
        <button
          type="button"
          onClick={onEmailVerify}
          className="mt-1 mb-2 bg-blue-600 text-white px-4 py-2 rounded mx-auto w-full"
        >
          Verify
        </button>
        {/* Phone OTP Input */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="tel"
            placeholder="Phone OTP"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded focus:outline-none pr-16"
            value={phoneOtp}
            onChange={(e) => setPhoneOtp(e.target.value)}
          />
          <button
            type="button"
            onClick={() => onResend("phone")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xs"
          >
            Resend OTP
          </button>
          <span
            className={`text-red-500 text-xs absolute left-0 transition-all duration-300 ${
              isPhoneOtpWrong ? "opacity-100" : "opacity-0 h-0"
            }`}
            style={{
              bottom: isPhoneOtpWrong ? "2.5rem" : "0", // Adjust the position of the message
            }}
          >
            Incorrect OTP. Please try again.
          </span>
        </div>
        <button
          type="button"
          onClick={onPhoneVerify}
          className="mt-1 bg-blue-600 text-white px-4 py-2 rounded mx-auto w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
