"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
const ADMIN_PIN = "rolex@1";

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
  const [authorized, setAuthorized] = useState(false);
const [pin, setPin] = useState("");

function login() {
  if (pin === ADMIN_PIN) {
    localStorage.setItem(
      "admin_login_expire",
      (Date.now() + 3 * 60 * 60 * 1000).toString()
    );
    setAuthorized(true);
  } else {
    alert("PIN salah");
  }
}
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

  console.log("BRANDS DATA =", data);
  console.log("BRANDS ERROR =", error);

  if (error) {
    alert(error.message);
    return;
  }

  setBrands(data || []);

  if (data && data.length > 0) {
    setBrand(data[0].name);
  }
}
 
const [brands, setBrands] = useState<Brand[]>([]);
const [newBrand, setNewBrand] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("1000");
  const [stock, setStock] = useState("Ready Stock");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

 useEffect(() => {
  const expire = localStorage.getItem("admin_login_expire");

  if (expire && Date.now() < Number(expire)) {
    setAuthorized(true);
  }

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
async function addBrand() {
  if (!newBrand.trim()) {
    alert("Masukkan nama merek");
    return;
  }

  const { error } = await supabase
    .from("brands")
    .insert([{ name: newBrand.trim() }]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Merek berhasil ditambahkan");

  setNewBrand("");

  loadBrands();
}


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
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select();

  console.log("DELETE DATA:", data);
  console.log("DELETE ERROR:", error);

  if (error) {
  alert(error.message);
  return;
}

alert("Produk berhasil dihapus");

loadProducts();
};
if (!authorized) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#111",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: "25px" }}>
          ADMIN SATUJAM.ID
        </h1>

        <input
          type="password"
          placeholder="Masukkan PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") login();
          }}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #444",
            background: "#1a1a1a",
            color: "#fff",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#d4af37",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          MASUK
        </button>
      </div>
    </main>
  );
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
      <h1>ADMIN SATUJAM.ID</h1>
      <button
  onClick={() => {
    localStorage.removeItem("admin_login_expire");
    setAuthorized(false);
    setPin("");
  }}
  style={{
    padding: "10px 20px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    float: "right",
    marginBottom: "20px",
  }}
>
  LOGOUT
</button>

      <div
        style={{
          display: "grid",
          gap: 15,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <input
  type="text"
  placeholder="Tambah Merek Baru"
  value={newBrand}
  onChange={(e) => setNewBrand(e.target.value)}
  style={{
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
/>

<button
  onClick={addBrand}
  style={{
    padding: "12px",
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  TAMBAH MEREK
</button>
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
      <input
  type="text"
  placeholder="Cari produk..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    marginBottom: "20px",
    background: "#1a1a1a",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "10px",
  }}
/>

      {products
  .filter((product) => {
  const keyword = search
    .toLowerCase()
    .replace(/[\s-]/g, "");

  const text = `${product.brand}${product.name}`
    .toLowerCase()
    .replace(/[\s-]/g, "");

  return text.includes(keyword);
})
  .map((product) => (
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

         <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button
    onClick={() => {
     window.location.href = `/seiko88/edit/${product.id}`;
    }}
    style={{
      padding: "10px 18px",
      background: "#0070f3",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ✏️ EDIT
  </button>

  <button
    onClick={() => deleteProduct(product.id)}
    style={{
      padding: "10px 18px",
      background: "#e53935",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🗑️ HAPUS
  </button>
</div>
        </div>
      ))}
      </div>
    </main>
  );
}