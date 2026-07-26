export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products, error } = await supabase
    .from("products")
    .select("slug");

  console.log(products);
  console.log(error);

  return [
    {
      url: "https://satujam.online",
      lastModified: new Date(),
    },
  ];
}