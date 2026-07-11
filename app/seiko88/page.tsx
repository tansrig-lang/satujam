"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  brand: string;
  name: string;
  weight: string;
  price: string;
  gender: string;
  stock: string;
  image: string;
  description: string;
};

export default function AdminPage() {
  const ADMIN_PIN = "123456";

  const [authorized, setAuthorized] = useState(false);
  const [pin, setPin] = useState("");
  const [brand, setBrand] = useState("");

const [brands, setBrands] = useState([
  "Rolex",
  "Seiko",
  "Casio",
  "Bonia",
]);

const [newBrand, setNewBrand] =
  useState("");

 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("1000");
  const [stock, setStock] = useState("Ready Stock");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("adminLoggedIn");
const loginTime = Number(
  localStorage.getItem(
    "adminLoginTime"
  )
);

const now = Date.now();

const twoHours =
  2 * 60 * 60 * 1000;

if (
  loggedIn === "true" &&
  now - loginTime < twoHours
) {
  setAuthorized(true);
}
   

    const saved = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    setProducts(saved);
   const savedBrands = JSON.parse(
  localStorage.getItem("brands") || "[]"
);

if (savedBrands.length > 0) {
  setBrands(savedBrands);
}


  }, []);

  const saveProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      brand,
      name,
      price,
      weight,
      gender,
      stock,
      image,
      description,
      
    };
    if (
  !name ||
  !price ||
  !image
) {
  alert(
    "Nama, harga dan gambar wajib diisi"
  );
  return;
}

    const updated = [...products, newProduct];

    localStorage.setItem(
      "products",
      JSON.stringify(updated)
    );

    setProducts(updated);

    setName("");
    setPrice("");
    setImage("");
    setDescription("");

    alert("Produk berhasil disimpan");
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter(
      (p) => p.id !== id
    );

    localStorage.setItem(
      "products",
      JSON.stringify(updated)
    );

    setProducts(updated);
  };

  if (!authorized) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#111",
            padding: "40px",
            borderRadius: "20px",
            width: "380px",
          }}
        >
          <h1>ADMIN LOGIN</h1>

          <input
            type="password"
            placeholder="Masukkan PIN"
            value={pin}
            onChange={(e) =>
              setPin(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
            }}
          />

          <button
            onClick={() => {
              if (pin === ADMIN_PIN) {
                localStorage.setItem(
                  "adminLoggedIn",
                  "true"
                );
                localStorage.setItem(
  "adminLoginTime",
  Date.now().toString()
);

                setAuthorized(true);
              } else {
                alert("PIN Salah");
              }
            }}
            style={{
              width: "100%",
              padding: "15px",
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
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>ADMIN SATUJAM.ID</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Link href="/seiko88/banner">
            <button>
              KELOLA BANNER
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem(
                "adminLoggedIn"
              );

              location.reload();
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "15px",
        }}
        >
          <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
>
          <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }}
></div>
     <select
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
>
  {brands.map((item) => (
    <option
      key={item}
      value={item}
    >
      {item}
    </option>
  ))}
</select>

<input
  type="text"
  placeholder="Nama Produk"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="text"
  placeholder="Harga Produk"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option>Male</option>
  <option>Female</option>
  <option>Unisex</option>
</select>

<select
  value={stock}
  onChange={(e) => setStock(e.target.value)}
>
  <option>Ready Stock</option>
  <option>Pre Order</option>
  <option>Sold Out</option>
</select>

<input
  type="number"
  placeholder="Berat Produk (gram)"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
/>

<input
  type="file"
  accept="image/*"
/>

<textarea
  placeholder="Deskripsi Produk"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

<button
  onClick={saveProduct}
>
  SIMPAN PRODUK
</button>
</div>


      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Produk Tersimpan
      </h2>

      <input
        placeholder="Cari Produk"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      />

      {products
        .filter((p) =>
          p.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((product) => (
          <div
            key={product.id}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "15px",
              fontSize: "20px",
            }}
          >
            <strong>
              {product.brand} - {product.name}
            </strong>

  <p>{product.price}</p>

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