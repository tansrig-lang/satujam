"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: string;
  gender: string;
  weight: string;
  stock: string;
  image: string;
  description: string;
  active: boolean;
};

export default function ProdukNonaktifPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", false)
      .order("id", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }
  }

  async function aktifkan(id: number) {
    const { error } = await supabase
      .from("products")
      .update({
        active: true,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produk berhasil diaktifkan kembali");

    loadProducts();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1>📦 Produk Nonaktif</h1>

        <Link href="/seiko88">
          <button
            style={{
              padding: "12px 20px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              marginBottom: "30px",
            }}
          >
            ← Kembali ke Admin
          </button>
        </Link>

        {products.length === 0 && (
          <p>Tidak ada produk nonaktif.</p>
        )}

        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #444",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: 120,
                marginBottom: 10,
              }}
            />

            <h3>
              {product.brand} - {product.name}
            </h3>

            <p>Harga : {product.price}</p>

            <p>Gender : {product.gender}</p>

            <p>Berat : {product.weight}</p>

            <p>Stock : {product.stock}</p>

            <button
              onClick={() => aktifkan(product.id)}
              style={{
                marginTop: "15px",
                padding: "12px 20px",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✅ AKTIFKAN KEMBALI
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}