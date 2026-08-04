import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://satujam.online";

  const { data: products } = await supabase
    .from("products")
    .select("slug")
    .eq("active", true);
    const { data: brands } = await supabase
  .from("brands")
  .select("name");

  const productUrls =
    products?.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
     lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];
    const brandUrls =
  brands?.map((brand) => ({
    url: `${baseUrl}/brands/${encodeURIComponent(brand.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) ?? [];

 return [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${baseUrl}/products`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  ...brandUrls,
  ...productUrls,
];
}