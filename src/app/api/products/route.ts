import type { NextRequest } from "next/server";
import { getAllProductsWithCategories } from "../../../../db/queries/product";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const allProductsWithCategories = await getAllProductsWithCategories();

    return new Response(JSON.stringify(allProductsWithCategories, null, 2));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(
        {
          success: false,
          message: "An error occurred while retrieving the products.",
        },
        null,
        2,
      ),
      { status: 500 },
    );
  }
}
