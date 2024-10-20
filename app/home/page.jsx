"use client";
import { useState } from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";
import JobForm from "../_components/CreateInterview";

export default function Home() {
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the JobForm

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex flex-column">
        <Sidebar />
        <div className="p-6  w-[92%]">
          {/* Create Interview Button */}
          <button
            className={`p-2 pb-1 pt-1 transition-all duration-300 ease-in-out ${
              showForm ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setShowForm(true)}
            style={{
              color: "#FFFFFF",
              borderRadius: "8.32px",
              backgroundColor: "#0B66EF",
              fontFamily: "DM Sans",
              fontSize: "33.29px",
              lineHeight: "43.34px",
            }}
          >
            Create Interview
          </button>

          {/* Job Form Section */}
          <div
            className={`mt-4 transition-all duration-500 ease-in-out ${
              showForm ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <JobForm />
            <button
              className="absolute top-20 bg-red-600 text-white p-2 rounded-lg font-bold hover:bg-red-700 transition duration-300"
              onClick={() => setShowForm(false)}
            >
              Close Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
