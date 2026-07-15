import Link from "next/link";
import { products } from "../../data/products";
import CheckoutForm from "./CheckoutForm";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products[Number(id)];

  if (!product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Produk tidak ditemukan</h1>
      </main>
    );
  }

  const waNumber = "628126076263"; // Ganti nomor WA Anda

  return (
    <main
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <Link href="/">
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginBottom: "30px",
          }}
        >
          ← Kembali
        </button>
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            borderRadius: "20px",
            maxHeight: "650px",
            objectFit: "cover",
          }}
        />

        <div>
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "15px",
            }}
          >
            {product.name}
          </h1>

          {product.brand && (
            <h3
              style={{
                color: "#FFD700",
                marginBottom: "15px",
              }}
            >
              {product.brand}
            </h3>
          )}

          <h2
            style={{
              color: "#aaa",
              marginBottom: "20px",
            }}
          >
            {product.price}
          </h2>
{product.gender && (
  <p
    style={{
      marginBottom: "10px",
    }}
  >
    Gender: {product.gender}
  </p>
)}

{product.weight && (
  <p
    style={{
      marginBottom: "10px",
    }}
  >
    Berat: {product.weight} gram
  </p>
)}

{product.stock && (
  <p
    style={{
      marginBottom: "20px",
      color:
        product.stock === "Ready Stock"
          ? "#00ff66"
          : product.stock === "Pre Order"
          ? "#ffaa00"
          : "#ff4444",
    }}
  >
    {product.stock}
  </p>
)}
          
          <p
            style={{
              lineHeight: "1.8",
              color: "#ddd",
              marginBottom: "30px",
            }}
          >
            {product.description}
          </p>
          <CheckoutForm
  productName={product.name}
  productPrice={product.price}
  productWeight={product.weight}
/>

          <a
            href={`https://wa.me/${628126076263}?text=Halo SATUJAM.ID, saya tertarik membeli ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              BELI VIA WHATSAPP
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}