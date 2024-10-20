import dbConnect from "../../../lib/mongo";
import Company from "../../../Models/Company";
import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

export async function POST(req) {
  await dbConnect();

  try {
    const { companyEmail, type } = await req.json();
    const company = await Company.findOne({ companyEmail });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
    // Update the company document with OTP
    if (type === "email") {
      company.emailOtp = otp;
      company.emailOtpExpires = otpExpires;
    } else if (type === "phone") {
      company.phoneOtp = otp;
      company.phoneOtpExpires = otpExpires;
    }

    await company.save(); 

    axios.post(`${process.env.BACKEND_SERVER}/sendOtp`, {
      otp,
      companyEmail: company.companyEmail,
    });

    return NextResponse.json({
      message: `${type} OTP sent successfully`,
      status: 200,
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
