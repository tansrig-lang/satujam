"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import { products as defaultProducts } from "./data/products";
import BannerSlider from "./components/BannerSlider";
import WhatsappPopup from "./components/WhatsappPopup";
export default function Home() {
  const [products, setProducts] =
      useState(defaultProducts);
      
        const [selectedBrand, setSelectedBrand] =
            useState("Semua");
            
              const [selectedGender, setSelectedGender] =
                  useState("Semua");
                  const [brands, setBrands] =
  useState<string[]>(["Semua"]);
  useEffect(() => {
  (
    "Homepage brands:",
    localStorage.getItem("brands")
  );
}, []);
                    
                       useEffect(() => {
  const savedProducts = JSON.parse(
    localStorage.getItem("products") || "[]"
  );

  if (savedProducts.length > 0) {
    setProducts([
      ...defaultProducts,
      ...savedProducts,
    ]);
  }

  const savedBrands = JSON.parse(
    localStorage.getItem("brands") || "[]"
  );

  if (savedBrands.length > 0) {
    setBrands([
      "Semua",
      ...savedBrands,
    ]);
  }
}, []);
   


  const filteredProducts = products.filter(
    (product: any) => {
      const brandMatch =
        selectedBrand === "Semua" ||
        product.brand === selectedBrand;

      const genderMatch =
        selectedGender === "Semua" ||
        product.gender === selectedGender;

      return brandMatch && genderMatch;
    }
  );
const randomProducts =
  filteredProducts.slice(0, 20);
 
  return (
    <main
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        padding: "40px",
        fontFamily: "Arial",
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
        <h1>SATUJAM.ID</h1>
        </div>
        

        
          

      <BannerSlider />

      <p
        style={{
          color: "#aaa",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Produk
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedBrand}
          onChange={(e) =>
            setSelectedBrand(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          {brands.map((brand, index) => (

  <option
    key={`${brand}-${index}`}
    value={brand}
  >
    {brand}
  </option>

))}

         

          

        </select>

        <select
          value={selectedGender}
          onChange={(e) =>
            setSelectedGender(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <option value="Semua">
            Semua Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Unisex">
            Unisex
          </option>
        </select>
      </div>

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        {filteredProducts.length} Produk
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {randomProducts.map(
          (
            product: any,
            index
          ) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  "#111",
                borderRadius:
                  "20px",
                overflow:
                  "hidden",
              }}
            >
              <img
  src={
    product.image &&
    product.image.trim() !== ""
      ? product.image
      : "/no-image.png"
  }
  alt={product.name}
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#FFD700",
                    marginBottom: "5px",
                  }}
                >
                  {product.brand}
                </h3>

                <h2>{product.name}</h2>

                <p
                  style={{
                    color: "#aaa",
                    marginBottom: "10px",
                  }}
                >
                  {product.price}
                </p>

                <p
                  style={{
                    color: "#888",
                    marginBottom: "20px",
                  }}
                >
                  {product.gender}
                </p>
                <Link href="/checkout">
  <button
    onClick={() => {
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify({
          name: product.name,
          price: product.price,
        })
      );
    }}
    style={{
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    BELI SEKARANG
  </button>
</Link>

             
              </div>
            </div>
          )
        )}
      </div>
      <WhatsappPopup />
    </main>
  );
}