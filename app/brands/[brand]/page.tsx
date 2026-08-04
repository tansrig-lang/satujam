import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    brand: string;
  }>;
};
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const { brand } = await params;

  return {
    title: `${brand} Original | SATUJAM.ONLINE`,
    description: `Koleksi jam tangan ${brand} original dengan garansi resmi. Temukan berbagai model ${brand} terbaik hanya di SATUJAM.ONLINE.`,

    alternates: {
      canonical: `https://satujam.online/brands/${encodeURIComponent(
        brand
      )}`,
    },

    openGraph: {
      title: `${brand} Original`,
      description: `Koleksi jam tangan ${brand} original.`,
      url: `https://satujam.online/brands/${encodeURIComponent(
        brand
      )}`,
      siteName: "SATUJAM.ONLINE",
      type: "website",
    },
  };
}
export default async function BrandPage({
  params,
}: Props) {
  const { brand } = await params;

  const brandName = decodeURIComponent(brand);

  const { data: products } = await supabase
    .from("products")
    .select("id,name,price,image,slug,brand")
    .eq("brand", brandName)
    .eq("active", true)
    .order("id", { ascending: false });

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1 style={{ marginBottom: 30 }}>
        {brandName}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(260px,1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#111",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: 300,
                objectFit: "contain",
                background: "#111",
              }}
            />

            <div style={{ padding: 20 }}>
              <Link
  href={`/brands/${encodeURIComponent(product.brand)}`}
  style={{
    color: "#FFD700",
    textDecoration: "none",
  }}
>
  <h3>{product.brand}</h3>
</Link>

              <h2>{product.name}</h2>

              <p>
                Rp{" "}
                {Number(product.price).toLocaleString("id-ID")}
              </p>

              <Link href={`/product/${product.slug}`}>
                <button
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 10,
                    border: "none",
                    background: "#FFD700",
                    color: "#000",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Lihat Detail
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}