"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

"use client";

export default function BannerSlider() {
  return (
    <div
      style={{
        height: "600px",
        background: "red",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "50px",
        fontWeight: "bold",
      }}
    >
      TEST BANNER BARU
    </div>
  );
}

   
async function loadBanners() {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("id", { ascending: false });

  console.log("BANNERS:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
    return;
  }

  setBanners(data || []);
}

useEffect(() => {
  loadBanners();
}, []);
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) =>
          (prev + 1) % banners.length
      );
    }, 8000);

    return () =>
      clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <div
        style={{
          height: "600px",
          background: "#111",
          borderRadius: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <h2>Belum Ada Banner</h2>
      </div>
    );
  }

  const banner = banners[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        height: "600px",
        borderRadius: "25px",
        overflow: "hidden",
        marginBottom: "40px",
      }}
    >
      <img
        src={banner.image}
        alt={banner.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform:
            "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {banners.map(
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentIndex(index)
              }
              style={{
                width: "12px",
                height: "12px",
                borderRadius:
                  "50%",
                border: "none",
                cursor: "pointer",
                background:
                  currentIndex ===
                  index
                    ? "#fff"
                    : "#666",
              }}
            />
          )
        )}
      </div>
    </div>
  );
}