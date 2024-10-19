import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";
export default function SignupForm() {
  return (
    <div
      className="flex flex-col items-center justify-center mx-auto p-3"
      style={{
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <p className="text-center mb-6">
        Please fill in the details below to create your account.
      </p>
      <form className="flex flex-col gap-4 w-full">
        {/* Name Input */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Name"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Company Name Input */}
        <div className="relative">
          <FaBuilding className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Company Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Company Email"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Employee Size Input */}
        <div className="relative">
          <FaUsers className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            placeholder="Employee Size"
            className="w-full h-10 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        <p className="text-center mb-6">
          By clicking on proceed you will accept our{" "}
          <span className="font-bold text-blue-600">Terms</span> &{" "}
          <span className="font-bold text-blue-600">Conditions</span>
        </p>

        <button className="font-bold text-white bg-[#0B66EF] w-[70%] h-[43px] rounded mx-auto">
          Proceed
        </button>
      </form>
    </div>
  );
}
