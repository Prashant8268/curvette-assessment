'use client';
import Navbar from "./_components/Navbar";
import Signup from "./_components/Signup";
import SignupForm from "./_components/SignupForm";
export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full items-center justify-center h-[90%]  p-1 pt-0 pb-0  ">
        {/* Left div before Signup */}
        <div className="w-full md:w-1/2 p-2 ">
          <div className="h-full flex items-center justify-center">
            {/* Content for the left div */}
            <p className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley
            </p>
          </div>
        </div>

        {/* Signup Component */}
        <div className="w-full md:w-1/2 p-2">
          <Signup>
            <SignupForm />
          </Signup>
        </div>
      </div>
    </div>
  );
}
