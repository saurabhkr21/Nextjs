import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const ms = parseInt(searchParams.get("ms") || "0", 10);
  const max=parseInt(searchParams.get("max") || "1000000",10000000);
  const type=searchParams.get("type") || "";
  const page=searchParams.get('page')? Number.parseInt(searchParams.get('page')) : 1;

  const limit =10;
  const data =await prismaClient.job.findMany({
    where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
        salary: {
          gte: ms,
          lte:max
        },
        employment_type:{
            contains:type,
            mode:"insensitive"
        }
      },
    take:limit,
    skip:(page-1)*limit
  });
  return NextResponse.json({
    success:true,
    data:data
  })
}


//   const ms = parseInt(searchParams.get("ms") || "0", 10);
//   const max=parseInt(searchParams.get("max") || "1000000",10000000);
//   const type=searchParams.get("type") || "";

//   try {
//     const data = await prismaClient.job.findMany({
//       where: {
//         title: {
//           contains: q,
//           mode: "insensitive",
//         },
//         salary: {
//           gte: ms,
//           lte:max
//         },
//         employment_type:{
//             contains:type,
//             mode:"insensitive"
//         }
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Fetched successfully",
//       data,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch jobs",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }