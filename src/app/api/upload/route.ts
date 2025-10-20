// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, { upsert: false });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: publicUrl.publicUrl,
    });
  } catch (err: any) {
    console.error("Ошибка при загрузке:", err.message);
    return NextResponse.json({ error: "Ошибка при загрузке файла" }, { status: 500 });
  }
}
