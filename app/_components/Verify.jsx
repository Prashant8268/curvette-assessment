import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";

const OtpVerification = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isEmailOtpWrong, setIsEmailOtpWrong] = useState(false);
  const [isPhoneOtpWrong, setIsPhoneOtpWrong] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [message, setMessage] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/fetchDetails");
        setVerifiedEmail(response.data.company.verifiedEmail);
        setVerifiedPhone(response.data.company.verifiedPhone);
        if (
          response.data.company.verifiedEmail &&
          response.data.company.verifiedPhone
        ) {
          router.push("/home");
        }
        setCompany(response.data.company);
      } catch (error) {
        router.push("/");
        console.log(error, "error in otp verification");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  async function onEmailVerify() {
    try {
      setLoading(true);
      const response = await axios.post("/api/validateOtp", {
        companyEmail: company.companyEmail,
        type: "Email",
        otp: emailOtp,
      });
      setMessage(response.data.message);
      if(response.data.company.verifiedEmail){
        setEmailOtp("");
      }
      setVerifiedEmail(response.data.company.verifiedEmail);
      setVerifiedPhone(response.data.company.verifiedPhone);
      if (
        response.data.company.verifiedEmail &&
        response.data.company.verifiedPhone
      ) {

        router.push("/home");
      }
      setLoading(false);
    } catch (err) {
      console.log(err, "error");
      setLoading(false);
    }
  }

  async function onPhoneVerify() {
    try {
      setLoading(true);
      const response = await axios.post("/api/validateOtp", {
        companyEmail: company.companyEmail,
        type: "Phone",
        otp: phoneOtp,
      });
      setLoading(false);
      setMessage(response.data.message);
      setVerifiedEmail(response.data.company.verifiedEmail);
      setVerifiedPhone(response.data.company.verifiedPhone);
      if (
        response.data.company.verifiedEmail &&
        response.data.company.verifiedPhone
      ) {
        router.push("/home");
      }
    } catch (err) {
      console.log(err, "error");
      setLoading(false);
    }
  }

  async function onResend(type) {
    try {
      setLoading(true);
      await axios.post("/api/generateOtp", {
        companyEmail: company.companyEmail,
        type,
      });
      setMessage(
        `${type === "email" ? "Email" : "Phone"} OTP sent successfully.`
      );
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
      setLoading(false);
    } catch (err) {
      console.log(err, "error in resending otp");
      setLoading(false);
    }
    if (type === "email") {
      setEmailOtp("");
      setIsEmailOtpWrong(false);
    } else {
      setPhoneOtp("");
      setIsPhoneOtpWrong(false);
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto p-3 relative"
      style={{
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
        </div>
      )}

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
            {verifiedEmail ? <FaCheckCircle /> : "Resend OTP"}
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
        {!verifiedEmail ? (
          <button
            type="button"
            onClick={onEmailVerify}
            className="mt-1 mb-2 bg-blue-600 text-white px-4 py-2 rounded mx-auto w-full"
          >
            {loading ? "Verifying" : "Verify"}
          </button>
        ) : null}
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
            {verifiedPhone ? <FaCheckCircle /> : "Resend OTP"}
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
        {!verifiedPhone ? (
          <button
            type="button"
            onClick={onPhoneVerify}
            className="mt-1 bg-blue-600 text-white px-4 py-2 rounded mx-auto w-full"
          >
            {loading ? "Verifying" : "Verify"}
          </button>
        ) : null}
      </form>

      {/* Success message */}
      {message && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
