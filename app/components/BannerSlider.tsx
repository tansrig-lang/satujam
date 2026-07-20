"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadBanners() {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("id", { ascending: false });

    console.log("BANNERS:", data);
    console.log("ERROR:", error);

    if (error) return;

    setBanners(data || []);
  }

  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return (
      <div
        style={{
          height: "600px",
          background: "#111",
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
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
    </div>
  );
}