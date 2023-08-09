import type { NextRequest } from "next/server";
import {
  deleteCategoryById,
  getCategoryById,
  insertCategory,
  updateCategoryById,
} from "../../../../../db/queries/category";
import { Categories } from "../../../../../db/generated/db";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const categoryId = searchParams.get("categoryId");
  const category = categoryId
    ? await getCategoryById(parseInt(categoryId, 10))
    : null;

  return new Response(JSON.stringify(category || {}, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const category = (await request.json()) as Omit<Categories, "category_id">;
    await insertCategory(category);

    return new Response(JSON.stringify({ success: true }, null, 2));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(
        {
          success: false,
          message: "An error occurred while inserting the category.",
        },
        null,
        2,
      ),
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.nextUrl);
    const categoryId = searchParams.get("categoryId");
    const updatedFields = (await request.json()) as Partial<
      Omit<Categories, "category_id">
    >;
    const result = categoryId
      ? await updateCategoryById(parseInt(categoryId, 10), updatedFields)
      : null;

    if (result && result.numUpdatedRows === BigInt(0)) {
      return new Response(
        JSON.stringify(
          { success: false, message: "Category not found." },
          null,
          2,
        ),
      );
    }

    return new Response(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(
        {
          success: false,
          message: "An error occurred while updating the category.",
        },
        null,
        2,
      ),
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.nextUrl);
    const categoryId = searchParams.get("categoryId");
    const result = categoryId
      ? await deleteCategoryById(parseInt(categoryId, 10))
      : null;

    if (result && result.numDeletedRows === BigInt(0)) {
      return new Response(
        JSON.stringify(
          { success: false, message: "Category not found." },
          null,
          2,
        ),
      );
    }

    return new Response(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify(
        {
          success: false,
          message: "An error occurred while deleting the category.",
        },
        null,
        2,
      ),
      { status: 500 },
    );
  }
}
