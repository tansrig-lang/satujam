"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
const [selectedBrand, setSelectedBrand] = useState("Semua");
const [selectedGender, setSelectedGender] = useState("Semua");
const [brands, setBrands] = useState<string[]>(["Semua"]);



  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
   const { data } = await supabase
  .from("products")
  .select("id,brand,name,price,image,gender,slug")
  .order("id", { ascending: false });

    setProducts(data || []);
    const uniqueBrands = [
  "Semua",
  ...new Set(
    (data || [])
      .map((p) => p.brand)
      .filter(Boolean)
  ),
];

setBrands(uniqueBrands);
  }
const filtered = products.filter((product) => {
  const keyword = search
    .toLowerCase()
    .replace(/[\s-]/g, "");

  const text = `${product.brand}${product.name}`
    .toLowerCase()
    .replace(/[\s-]/g, "");

  const brandMatch =
    selectedBrand === "Semua" ||
    product.brand === selectedBrand;

  const genderMatch =
    selectedGender === "Semua" ||
    product.gender === selectedGender;

  const searchMatch =
    keyword === "" || text.includes(keyword);

  return (
    brandMatch &&
    genderMatch &&
    searchMatch
  );
});
 

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Semua Produk
      </h1>

      <input
        type="text"
        placeholder="Cari jam tangan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
    }}
  >
    <select
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
      style={{
        width: "220px",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #444",
        background: "#111",
        color: "#fff",
      }}
    >
      {brands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>

    <select
      value={selectedGender}
      onChange={(e) => setSelectedGender(e.target.value)}
      style={{
        width: "180px",
        padding: "14px",
        borderRadius: "10px",
        border: "1px solid #444",
        background: "#111",
        color: "#fff",
      }}
    >
      <option value="Semua">Semua Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Unisex">Unisex</option>
    </select>
  </div>

  <p
    style={{
      color: "#aaa",
      fontWeight: "bold",
      margin: 0,
    }}
  >
    {filtered.length} Produk
  </p>
</div>




        {filtered.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#111",
              borderRadius: "20px",
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
                height: "320px",
                objectFit: "contain",
                background: "#111",
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#FFD700" }}>
                {product.brand}
              </h3>

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
                    borderRadius: "10px",
                    border: "none",
                    background: "#FFD700",
                    color: "#000",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginTop: "15px",
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