"use client";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
};

export default function NewProducts({
  products,
}: {
  products: Product[];
}) {
  const latest = products.slice(0, 8);

  return (
    <section style={{ marginTop: "50px", marginBottom: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>🔥 Produk Terbaru</h2>

        <button
          style={{
            background: "transparent",
            border: "1px solid #FFD700",
            color: "#FFD700",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Lihat Semua
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {latest.map((product) => (
          <div
            key={product.id}
            style={{
              minWidth: "240px",
              background: "#111",
              borderRadius: "16px",
              padding: "15px",
              flexShrink: 0,
            }}
          >
            <img
              src={product.image || "/no-image.png"}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "contain",
                background: "#111",
              }}
            />

            <h4 style={{ color: "#FFD700", margin: "10px 0 5px" }}>
              {product.brand}
            </h4>

            <div>{product.name}</div>

            <p style={{ color: "#aaa" }}>
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}