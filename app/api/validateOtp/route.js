
import dbConnect from "../../../lib/mongo";
import Company from "../../../Models/Company";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const { companyEmail, type, otp } = await req.json(); 
    const company = await Company.findOne({ companyEmail });

    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    const currentTime = new Date();
    let isValid = false;

    if (type == "Email") {
      isValid =
        company.emailOtp == otp && company.emailOtpExpires > currentTime;
      if (isValid) {
        company.verifiedEmail = true;
        company.emailOtp = null;
        company.emailOtpExpires = null;
      }
    } else if (type === "Phone") {
      isValid =
        company.phoneOtp == otp && company.phoneOtpExpires > currentTime;
      if (isValid) {
        company.verifiedPhone = true;
        company.phoneOtp = null;
        company.phoneOtpExpires = null;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 200 }
      );
    }

    await company.save();

    return NextResponse.json({ message: `${type} verified successfully` , company });
  } catch (error) {
    console.error("Error validating OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
