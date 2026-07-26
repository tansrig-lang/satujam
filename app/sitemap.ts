import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabase
    .from("products")
    .select("slug");

  const productUrls =
    products?.map((product) => ({
      url: `https://satujam.online/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })) ?? [];

  return [
    {
      url: "https://satujam.online",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://satujam.online/brands",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...productUrls,
  ];
}