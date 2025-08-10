// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function DELETE() {
//   try {
//     const cookie = await cookies();
//     cookie.delete("token");
//     const res = NextResponse.redirect("http://localhost:3000/");
//     res.cookies.delete("token");
//     return res;
//   } catch (err: any) {
//     return NextResponse.json({
//       success: false,
//       message: err.message,
//     });
//   }
// }