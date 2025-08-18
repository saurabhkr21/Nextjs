// import { createToken } from "@/services/jwt";
// import prismaClient from "@/services/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   console.log(req);
//   const body = await req.json();

//   const userToCreate = {
//     name: body.name,
//     email: body.email,
//     password: body.password,
//   };

//   if (!userToCreate.name || !userToCreate.email || !userToCreate.password) {
//     return NextResponse.json(
//       { success: false, message: "Missing fields" },
//       { status: 400 }
//     );
//   }

//   // Check if user already exists
//   const existingUser = await prismaClient.user.findUnique({
//     where: { email: userToCreate.email },
//   });

//   if (existingUser) {
//     return NextResponse.json(
//       { success: false, message: "Email already in use." },
//       { status: 409 }
//     );
//   }

//   try {
//     const user = await prismaClient.user.create({
//       data: userToCreate,
//     });
//     const userTokenData = {
//       id: user.id,
//     };

//     const token = createToken(userTokenData);
//     const res = NextResponse.redirect("http://localhost:3000");
//     res.cookies.set("token", token);
//     return res;
//   } catch (err: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create user.",
//       },
//       { status: 500 }
//     );
//   }
// }
