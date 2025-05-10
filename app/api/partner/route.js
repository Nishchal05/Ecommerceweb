import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); 

    const { name, price, description, image,sellerid } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl: image,
        sellerid, 
      },
    });

    return Response.json({ message: "Successfully added", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}
