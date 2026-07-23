"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return;

    setName(data.name);
    setPrice(data.price);
    setBrand(data.brand);
    setDescription(data.description || "");
  }

  async function saveProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        brand,
        name,
        price,
        description,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produk berhasil diupdate");

    router.push("/seiko88");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "40px",
      }}
    >
      <h1>Edit Produk</h1>

      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Harga"
        style={{ width: "100%", padding: 12, marginBottom: 15 }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: 12 }}
      />

      <button
        onClick={saveProduct}
        style={{
          marginTop: 20,
          padding: "14px 30px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        SIMPAN PERUBAHAN
      </button>
    </main>
  );
}