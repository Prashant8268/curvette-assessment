import dbConnect from "../../../lib/mongo";
import Company from "../../../Models/Company";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  await dbConnect();

  try {
    const cookies = req.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { message: "No cookies found" },
        { status: 401 }
      );
    }

    // Extract JWT token from the 'curvette' cookie
    const token = cookies
      .split("; ")
      .find((cookie) => cookie.startsWith("curvette="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 401 });
    }

    const secretKey = process.env.JWT_SECRET; 
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      console.log(err, 'error');
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { companyId } = decoded;
    if (!companyId) {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    const { password, ...companyWithoutPassword } = company.toObject();

    return NextResponse.json(
      {
        message: "Company details fetched successfully",
        company: companyWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
