// pages/api/signup.js
import dbConnect from "../../../lib/mongo";
import Company from "../../../Models/Company";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { formData } = await req.json();
    const { name, phone, companyName, companyEmail, employeeSize, password } =
      formData;
    try {
      const existingUser = await Company.findOne({
        companyEmail: companyEmail,
      });
      if (existingUser) {
        return NextResponse.json(
          { message: "Company already exists" },
          {
            status: 200,
            verifiedEmail: existingUser.verifiedEmail,
            verifiedPhone: existingUser.verifiedPhone,
          }
        );
      }

      const newCompany = new Company({
        name,
        phone,
        companyName,
        companyEmail,
        employeeSize,
        password,
        verifiedEmail: false,
        verifiedPhone: false,
      });
      const savedCompany = await newCompany.save();
      const { password: _, ...companyWithoutPassword } =
        savedCompany.toObject();

      // Create JWT token
      const token = jwt.sign(
        { companyId: savedCompany._id }, 
        process.env.JWT_SECRET,
        { expiresIn: "24h" } 
      );

      const response = NextResponse.json(
        {
          message: "Company created successfully",
          company: companyWithoutPassword,
        },
        { status: 200 }
      );

      response.cookies.set("curvette", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 3600 * 7,
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Error in sign-up API:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.setHeader("Allow", ["POST"]);
  }
}
