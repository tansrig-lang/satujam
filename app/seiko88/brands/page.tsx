"use client";
import { supabase } from "@/lib/supabase";

import { useEffect, useState } from "react";

export default function BrandsPage() {
const ADMIN_PIN = "123456";

const [authorized, setAuthorized] =
  useState(false);

const [pin, setPin] = useState("");

 type Brand = {
  id: number;
  name: string;
};

const [brands, setBrands] = useState<Brand[]>([]);
  const [newBrand, setNewBrand] = useState("");
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
useEffect(() => {
  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (loggedIn === "true") {
    setAuthorized(true);
  }

  loadBrands();
}, []);

  

  async function addBrand() {
  if (!newBrand.trim()) return;

  const { error } = await supabase
    .from("brands")
    .insert([{ name: newBrand.trim() }]);

  if (error) {
    alert(error.message);
    return;
  }

  setNewBrand("");
loadBrands();
}



async function deleteBrand(id: number) {
  const { error } = await supabase
    .from("brands")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadBrands();
}


  
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
{brands.map((brand) => (
  <div
    key={brand.id}
    style={{
      background: "#111",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span>{brand.name}</span>

    <button
      onClick={() => deleteBrand(brand.id)}
    >
      HAPUS
    </button>
  </div>
))}
       
    </main>
  );
}