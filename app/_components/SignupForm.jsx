import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaEnvelope,
  FaUsers,
  FaLock,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? null : "Name is required.";
      case "phone":
        return /^\d+$/.test(value) ? null : "Phone must be numeric.";
      case "companyEmail":
        return /\S+@\S+\.\S+/.test(value) ? null : "Email is invalid.";
      case "password":
        return value.length >= 6
          ? null
          : "Password must be at least 6 characters.";
      case "employeeSize":
        return value ? null : "Employee Size is required.";
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate only the changed field
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    if (error) {
      setAlertMessage(error); // Set the alert message
      setTimeout(() => setAlertMessage(""), 3000); // Clear after 3 seconds
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate all fields on submit
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
        setAlertMessage(error); // Set the alert message
        setTimeout(() => setAlertMessage(""), 3000); // Clear after 3 seconds
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      const response =  await axios.post('/api/signup', {formData});
      setIsLoading(false);
      console.log(response, 'response');

      if(response.data.verifiedEmail && response.data.verifiedPhone){
        router.push('/home')
      } else {
        router.push('/verify');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto p-3 max-h-[600px] overflow-hidden"
      style={{
        borderRadius: "10px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
          {alertMessage}
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <p className="text-center mb-4">
        Please fill in the details below to create your account.
      </p>
      <form
        className="flex flex-col gap-2 w-full overflow-y-auto max-h-[400px]"
        onSubmit={handleSubmit}
      >
        {/* Name Input */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Company Name Input */}
        <div className="relative">
          <FaBuilding className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Company Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="companyEmail"
            placeholder="Company Email"
            value={formData.companyEmail}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Employee Size Input */}
        <div className="relative">
          <FaUsers className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            name="employeeSize"
            placeholder="Employee Size"
            value={formData.employeeSize}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-9 px-10 border border-[#CCCCCC] bg-[#F4F4F4] text-black placeholder-gray-400 rounded"
          />
        </div>

        <p className="text-center mb-4">
          By clicking on proceed you will accept our{" "}
          <span className="font-bold text-blue-600">Terms</span> &{" "}
          <span className="font-bold text-blue-600">Conditions</span>
        </p>

        <button
          type="submit"
          className="font-bold text-white bg-[#0B66EF] w-[70%] h-[43px] rounded mx-auto"
        >
          {isLoading ? "Loading" : "Proceed"}
        </button>
      </form>
    </div>
  );
}
