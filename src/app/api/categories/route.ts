import type { NextRequest } from "next/server";
import { getAllCategories } from "../../../../db/queries/category";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const allCategories = await getAllCategories();
  return new Response(JSON.stringify(allCategories, null, 2));
}
