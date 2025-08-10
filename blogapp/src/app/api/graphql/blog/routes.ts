import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, image_url } = body;

  if (!title || !content || !image_url) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        image_url
      },
    });

    return NextResponse.json({ message: "Blog created", blog });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
