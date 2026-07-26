import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug} | SATUJAM.ONLINE`,
    description: `Beli ${slug} original bergaransi resmi di SATUJAM.ONLINE.`,
  };
}