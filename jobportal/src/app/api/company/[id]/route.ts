import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const company = await prismaClient.company.findUnique({
      where: {
        id: id,
      },
      include: {  // true hona tha yaha pr hi but password bhi omit krna hai isiliye esa kiya...
        owner: {
          include : {
            review : true
          },
          omit: {
            password: true,
          },
        },
        jobs : {              // it is not neccessary to do these unnecessary calls because on company page we can easily get this same data using company api call.
          include : {
            company : {
              include : {
                  owner : true
              } 
            }
          }
        }
      },
    });

    return NextResponse.json({
      success: true,
      data: company,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
    });
  }
}

export async function DELETE(
  req: NextResponse,
  { params }: { params: {id: string }}
) {
  const id = params.id;
  const user = await getUserFromCookies();
  
  if (user?.company?.id == id) {
    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}