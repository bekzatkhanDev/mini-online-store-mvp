import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImage(file: File): Promise<string> {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("products") 
    .upload(`images/${fileName}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Ошибка при загрузке изображения:", error.message);
    throw error;
  }

  // Генерация публичной ссылки
  const {
    data: { publicUrl },
  } = supabase.storage.from("products").getPublicUrl(`images/${fileName}`);

  return publicUrl;
}

/**
 * Удаление изображения из хранилища (по URL)
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  try {
    const path = publicUrl.split("/storage/v1/object/public/products/")[1];
    const { error } = await supabase.storage.from("products").remove([path]);
    if (error) throw error;
  } catch (err) {
    console.error("Ошибка при удалении изображения:", err);
  }
}
