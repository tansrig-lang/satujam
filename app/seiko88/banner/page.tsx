"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


type Banner = {
   id: number;
  title: string;
  subtitle: string;
  image: string;
};

export default function BannerPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
  loadBanners();
}, []);

async function loadBanners() {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setBanners(data || []);
}

 const saveBanner = async () => {
  if (!title || !image) {
    alert("Judul dan gambar wajib diisi");
    return;
  }

const { data, error } = await supabase
    .from("banners")
    .insert([
      {
        title,
        subtitle,
        image,
      },
   
    ]);
    console.log("DATA:", data);
console.log("ERROR:", error);

  if (error) {
    console.error(error);
    alert("Gagal menyimpan banner");
    return;
  }

  alert("Banner berhasil ditambahkan");

  setTitle("");
  setSubtitle("");
  setImage("");

  loadBanners();
};

  const deleteBanner = async (id: number) => {
  const { error } = await supabase
    .from("banners")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Gagal menghapus banner");
    return;
  }

  loadBanners();
};

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>KELOLA BANNER</h1>

       <Link href="/seiko88">
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            KEMBALI ADMIN
          </button>
        </Link>
      </div>

      <div
        style={{
          background: "#111",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Judul Banner"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Sub Judul Banner"
          value={subtitle}
          onChange={(e) =>
            setSubtitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "10px",
          }}
        />
        <p
  style={{
    color: "#aaa",
    marginBottom: "10px",
  }}
>
  Ukuran disarankan:
  1920 × 650 px (JPG)
</p>
<input
  type="file"
  accept="image/*"
  
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );
   

    const data = await res.json();

    if (data.success) {
      setImage(data.image);
    }
  }}
/>
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              marginTop: "20px",
              borderRadius: "15px",
            }}
          />
        )}

        <button
          onClick={saveBanner}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          TAMBAH BANNER
        </button>
      </div>
      <button
  onClick={() => {
    localStorage.removeItem(
      "homepageBanners"
    );

    setBanners([]);
  }}
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  }}
>
  HAPUS SEMUA BANNER
</button>

     <h2>
  Banner Tersimpan ({banners.length})
</h2>

      {banners.map((banner, index) => (
        <div
          key={index}
          style={{
            background: "#111",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <img
            src={banner.image}
            alt={banner.title}
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />

          <h3>{banner.title}</h3>

          <p>{banner.subtitle}</p>

          <button
          onClick={() =>
  deleteBanner(banner.id)
}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            HAPUS BANNER
          </button>
        </div>
      ))}
    </main>
  );
}