import React, { useState } from "react";

export default function JobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [email, setEmail] = useState("");
  const [endDate, setEndDate] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!jobTitle) formErrors.jobTitle = "Job Title is required";
    if (!jobDescription)
      formErrors.jobDescription = "Job Description is required";
    if (!experienceLevel)
      formErrors.experienceLevel = "Experience Level is required";
    if (!email) formErrors.email = "Email is required";
    if (!endDate) formErrors.endDate = "End Date is required";

    setErrors(formErrors);

    // If no errors, form is valid
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    switch (field) {
      case "jobTitle":
        setJobTitle(value);
        if (value) {
          setErrors((prevErrors) => ({ ...prevErrors, jobTitle: "" }));
        }
        break;
      case "jobDescription":
        setJobDescription(value);
        if (value) {
          setErrors((prevErrors) => ({ ...prevErrors, jobDescription: "" }));
        }
        break;
      case "experienceLevel":
        setExperienceLevel(value);
        if (value) {
          setErrors((prevErrors) => ({ ...prevErrors, experienceLevel: "" }));
        }
        break;
      case "email":
        setEmail(value);
        if (value) {
          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        }
        break;
      case "endDate":
        setEndDate(value);
        if (value) {
          setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <form
      className="w-full md:w-[50%] h-auto mt-1 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Job Title */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-[40%] text-right md:pt-2 pr-4">
          <label className="block text-gray-700 text-sm font-bold">
            Job Title
          </label>
        </div>
        <div className="md:w-[60%]">
          <input
            type="text"
            placeholder="Enter Job Title"
            value={jobTitle}
            onChange={(e) => handleInputChange(e, "jobTitle")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-[40%] text-right md:pt-2 pr-4">
          <label className="block text-gray-700 text-sm font-bold">
            Job Description
          </label>
        </div>
        <div className="md:w-[60%]">
          <textarea
            placeholder="Enter Job Description"
            value={jobDescription}
            onChange={(e) => handleInputChange(e, "jobDescription")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          {errors.jobDescription && (
            <p className="text-red-500 text-xs mt-1">{errors.jobDescription}</p>
          )}
        </div>
      </div>

      {/* Experience Level */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-[40%] text-right md:pt-2 pr-4">
          <label className="block text-gray-700 text-sm font-bold">
            Experience Level
          </label>
        </div>
        <div className="md:w-[60%]">
          <select
            value={experienceLevel}
            onChange={(e) => handleInputChange(e, "experienceLevel")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Experience Level</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
          {errors.experienceLevel && (
            <p className="text-red-500 text-xs mt-1">
              {errors.experienceLevel}
            </p>
          )}
        </div>
      </div>

      {/* Add Candidate */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-[40%] text-right md:pt-2 pr-4">
          <label className="block text-gray-700 text-sm font-bold">
            Add Candidate
          </label>
        </div>
        <div className="md:w-[60%] relative">
          <input
            type="email"
            placeholder="Add Candidate"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {email && (
            <span className="absolute right-2 top-2 bg-gray-200 px-2 rounded-md text-sm">
              {email} <button onClick={() => setEmail("")}>×</button>
            </span>
          )}
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* End Date */}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="md:w-[40%] text-right md:pt-2 pr-4">
          <label className="block text-gray-700 text-sm font-bold">
            End Date
          </label>
        </div>
        <div className="md:w-[60%]">
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleInputChange(e, "endDate")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white p-5 pt-1 pb-1 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}
