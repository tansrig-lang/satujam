"use client";

import { useEffect, useState } from "react";

export default function BrandsPage() {
const ADMIN_PIN = "123456";

const [authorized, setAuthorized] =
  useState(false);

const [pin, setPin] = useState("");

  const [brands, setBrands] = useState<string[]>([]);
  const [newBrand, setNewBrand] = useState("");

  useEffect(() => {
    const savedBrands = JSON.parse(
      localStorage.getItem("brands") || "[]"
    );
    const loggedIn =
  localStorage.getItem("adminLoggedIn");

if (loggedIn === "true") {
  setAuthorized(true);
}

    if (savedBrands.length > 0) {
      setBrands(savedBrands);
    }
  }, []);

  const addBrand = () => {
    if (!newBrand.trim()) return;

    const updated = [
      ...brands,
      newBrand.trim(),
    ];

    localStorage.setItem(
      "brands",
      JSON.stringify(updated)
    );

    setBrands(updated);
    setNewBrand("");
  };

  const deleteBrand = (
    brandToDelete: string
  ) => {
    const updated = brands.filter(
      (brand) => brand !== brandToDelete
    );

    localStorage.setItem(
      "brands",
      JSON.stringify(updated)
    );

    setBrands(updated);
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
        <h1>LOGIN MEREK</h1>

        <input
          type="password"
          placeholder="Masukkan PIN"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value)
          }
        />

        <button
          onClick={() => {
            if (pin === ADMIN_PIN) {
              localStorage.setItem(
                "adminLoggedIn",
                "true"
              );

              setAuthorized(true);
            } else {
              alert("PIN Salah");
            }
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
      <h1>Kelola Merek</h1>

      <input
        type="text"
        placeholder="Merek Baru"
        value={newBrand}
        onChange={(e) =>
          setNewBrand(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={addBrand}
        style={{
          padding: "12px 20px",
        }}
      >
        TAMBAH MEREK
      </button>

      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Daftar Merek
      </h2>

      {brands.map((brand, index) => (
        <div
          key={`${brand}-${index}`}

          style={{
            background: "#111",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            display: "flex",
            justifyContent:
              "space-between",
          }}
        >
          <span>{brand}</span>

          <button
            onClick={() =>
              deleteBrand(brand)
            }
          >
            HAPUS
          </button>
        </div>
      ))}
    </main>
  );
}