import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import CheckoutForm from "../../components/CheckoutForm";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("name,description,image,brand")
    .eq("slug", slug)
    .single();

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | SATUJAM.ONLINE",
    };
  }

  return {
    metadataBase: new URL("https://satujam.online"),

    title: `${product.name} | SATUJAM.ONLINE`,
    description: product.description ?? product.name,

    alternates: {
      canonical: `/product/${slug}`,
    },

    openGraph: {
      title: product.name,
      description: product.description ?? "",
      url: `https://satujam.online/product/${slug}`,
      siteName: "SATUJAM.ONLINE",
      type: "website",
      images: product.image
        ? [
            {
              url: product.image,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description ?? "",
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  console.log("Slug:", slug);
  console.log("Product:", product);
  console.log("Error:", error);

  if (!product) {
  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1>Produk tidak ditemukan</h1>

      <p>Slug: {slug}</p>

      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </main>
  );
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
      <Link href="/">
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          ← Kembali
        </button>
      </Link>

      <div
        style={{
         display: "flex",
flexWrap: "wrap",
gap: "40px",
alignItems: "flex-start",
        }}
      >
        <img
  src={product.image}
  alt={product.name}
  style={{
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    display: "block",
    margin: "0 auto",
    borderRadius: "20px",
    objectFit: "contain",
    background: "#111",
  }}
/>

        <div>
          <h1>{product.name}</h1>

          {product.brand && (
            <Link
  href={`/brands/${encodeURIComponent(product.brand)}`}
  style={{
    color: "#FFD700",
    textDecoration: "none",
  }}
>
  <h3>{product.brand}</h3>
</Link>
          )}

          <h2>
            Rp {Number(product.price).toLocaleString("id-ID")}
          </h2>

          <hr style={{ margin: "20px 0" }} />

          <h3>Spesifikasi</h3>

          {product.gender && (
            <p>Gender : {product.gender}</p>
          )}

          {product.weight && (
            <p>Berat : {product.weight} gram</p>
          )}

          {product.stock && (
            <p>Stok : {product.stock}</p>
          )}

          <p
            style={{
              marginTop: "20px",
              lineHeight: 1.8,
            }}
          >
            {product.description}
          </p>

          <CheckoutForm
            productName={product.name}
            productPrice={String(product.price)}
            productWeight={product.weight ?? 0}
          />

          <a
            href={`https://wa.me/628126076263?text=${encodeURIComponent(
              `Halo SATUJAM.ONLINE, saya tertarik membeli ${product.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "18px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              BELI VIA WHATSAPP
            </button>
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: [product.image],
            description: product.description,
            brand: {
              "@type": "Brand",
              name: product.brand,
            },
            offers: {
              "@type": "Offer",
              url: `https://satujam.online/product/${slug}`,
              price: product.price,
              priceCurrency: "IDR",
              availability:
                product.stock === "Ready Stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </main>
  );
}