"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

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
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("Rolex");
  type Brand = {
  id: number;
  name: string;
};
async function loadBrands() {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return;
  }

  setBrands(data || []);
}
const [brands, setBrands] = useState<Brand[]>([]);
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("1000");
  const [stock, setStock] = useState("Ready Stock");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  loadBrands();
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setProducts(data || []);
    }
  }

 const uploadImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) {
    alert("File tidak dipilih");
    return;
  }

  console.log("FILE:", file);

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  console.log("UPLOAD DATA:", data);
  console.log("UPLOAD ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  console.log("PUBLIC URL:", urlData.publicUrl);

  setImage(urlData.publicUrl);
};


  const saveProduct = async () => {
    if (!name || !price || !image) {
      alert("Nama, Harga dan Gambar wajib diisi");
      return;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          brand,
          name,
          price,
          gender,
          weight,
          stock,
          image,
          description,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produk berhasil disimpan");

    setName("");
    setPrice("");
    setImage("");

    loadProducts();
  };

  const deleteProduct = async (id: number) => {
    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    loadProducts();
  };

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
      <h1>ADMIN SATUJAM.ID</h1>

      <div
        style={{
          display: "grid",
          gap: 15,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
      <select
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
  style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
>
  {brands.map((item) => (
    <option key={item.id} value={item.name}>
      {item.name}
    </option>
  ))}
</select>


        <input
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
           style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
        />

        <input
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
           style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
           style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Unisex</option>
        </select>

        <input
          type="number"
          placeholder="Berat"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
           style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
        />

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
           style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
        >
          <option>Ready Stock</option>
          <option>Pre Order</option>
          <option>Sold Out</option>
        </select>

        <textarea
          rows={5}
          placeholder="Deskripsi"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: 180,
              borderRadius: 10,
            }}
          />
        )}

        <button
  onClick={saveProduct}
  style={{
    padding: "15px",
    background: "#d4af37",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  SIMPAN PRODUK
</button>
      </div>

      <h2>Daftar Produk</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
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

          <p>Berat : {product.weight} gram</p>

          <p>Stock : {product.stock}</p>

          <p>{product.description}</p>

          <button
            onClick={() =>
              deleteProduct(product.id)
            }
          >
            HAPUS
          </button>
        </div>
      ))}
      </div>
    </main>
  );
}