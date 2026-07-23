"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

type Brand = {
  id: number;
  name: string;
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [brands, setBrands] = useState<Brand[]>([]);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadBrands();
    loadProduct();
  }, []);

  async function loadBrands() {
    const { data } = await supabase
      .from("brands")
      .select("*")
      .order("name");

    if (data) setBrands(data);
  }

  async function loadProduct() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return;

    setBrand(data.brand || "");
    setName(data.name || "");
    setPrice(String(data.price || ""));
    setGender(data.gender || "");
    setWeight(String(data.weight || ""));
    setStock(String(data.stock || ""));
    setDescription(data.description || "");
    setImage(data.image || "");
    setPreview(data.image || "");
  }

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(data.publicUrl);
    setPreview(data.publicUrl);

    setUploading(false);
  }

  async function saveProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        brand,
        name,
        price: Number(price),
        gender,
        weight: Number(weight),
        stock: Number(stock),
        description,
        image,
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
        padding: 40,
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: 30 }}>✏️ Edit Produk</h1>

      <label>Brand</label>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      >
        <option value="">Pilih Brand</option>

        {brands.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>

      <label>Nama Produk</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      />

      <label>Harga</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      />

      <label>Gender</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      >
        <option value="">Pilih Gender</option>
        <option value="Pria">Pria</option>
        <option value="Wanita">Wanita</option>
        <option value="Unisex">Unisex</option>
      </select>

      <label>Berat (gram)</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      />

      <label>Stock</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 20 }}
      />

      <label>Deskripsi</label>
      <textarea
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
        }}
      />

      <label>Gambar Produk</label>

      {preview && (
        <div style={{ marginBottom: 20 }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 220,
              borderRadius: 10,
              border: "1px solid #444",
            }}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        style={{ marginBottom: 20 }}
      />

      {uploading && (
        <p style={{ color: "#00e676" }}>Uploading gambar...</p>
      )}

      <div
        style={{
          display: "flex",
          gap: 15,
          marginTop: 25,
        }}
      >
        <button
          type="button"
          onClick={saveProduct}
          style={{
            padding: "14px 30px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💾 SIMPAN PERUBAHAN
        </button>

        <button
          type="button"
          onClick={() => router.push("/seiko88")}
          style={{
            padding: "14px 30px",
            background: "#666",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❌ BATAL
        </button>
      </div>
    </main>
  );
}