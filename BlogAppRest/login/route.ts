// import { createToken } from "@/services/jwt";
// import prismaClient from "@/services/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { email, password } = body;

//   if (!email || !password) {
//     return NextResponse.json(
//       { success: false, message: "Missing fields" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Find user by email
//     const user = await prismaClient.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Invalid email or password." },
//         { status: 401 }
//       );
//     }

//     // Check password (plain text, for demo; use hashing in production)
//     if (user.password !== password) {
//       return NextResponse.json(
//         { success: false, message: "Invalid email or password." },
//         { status: 401 }
//       );
//     }

//     // Create JWT token
//     const token = createToken({ id: user.id });

//     return NextResponse.json({
//       success: true,
//       data: { token },
//       message: "Login successful.",
//     });
//   } catch (err: any) {
//     console.log(err);
//     return NextResponse.json({
//       success: false,
//       message: err.message,
//     });
//   }
// }
