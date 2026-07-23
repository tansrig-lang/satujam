"use client";

import { addToCart } from "@/lib/cart";

import NewProducts from "./components/NewProducts";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

import BannerSlider from "./components/BannerSlider";
import WhatsappPopup from "./components/WhatsappPopup";
import CartIcon from "./components/CartIcon";
export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] =
    useState<any[]>([]);

  const [selectedBrand, setSelectedBrand] =
    useState("Semua");

  const [selectedGender, setSelectedGender] =
    useState("Semua");
  const [brands, setBrands] =
    useState<string[]>(["Semua"]);
 const [visibleProducts, setVisibleProducts] = useState(12);

  
    async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", {
      ascending: false,
    });

  console.log("PRODUCTS:", data);
  console.log("ERROR:", error);

  if (error) {
    console.log(error);
    return;
  }

  setProducts(data || []);

    const uniqueBrands = [
      "Semua",
      ...new Set(
        (data || [])
          .map((p) => p.brand)
          .filter(Boolean)
      ),
    ];



    setBrands(uniqueBrands);
  }
useEffect(() => {
  loadProducts();



}, []);

  const filteredProducts = [...products]
  .sort((a: any, b: any) => {
    const keyword = search
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const aText = `${a.brand}${a.name}`
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const bText = `${b.brand}${b.name}`
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const aScore = aText.indexOf(keyword);
    const bScore = bText.indexOf(keyword);

    if (aScore === -1 && bScore === -1) return 0;
    if (aScore === -1) return 1;
    if (bScore === -1) return -1;

    return aScore - bScore;
  })
  .filter((product: any) => {
    const brandMatch =
      selectedBrand === "Semua" ||
      product.brand === selectedBrand;

    const genderMatch =
      selectedGender === "Semua" ||
      product.gender === selectedGender;

    const keyword = search
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const text = `${product.brand}${product.name}`
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const searchMatch =
      keyword === "" || text.includes(keyword);

    return (
      brandMatch &&
      genderMatch &&
      searchMatch
    );
  });
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
        <div
          style={{
            textAlign: "center",
            margin: "30px 0",
          }}
        >
          <h1
  style={{
    color: "#fff",
    fontSize: "clamp(28px, 7vw, 48px)",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: 0,
    textAlign: "center",
    wordBreak: "break-word",
  }}
>
  SATUJAM.ONLINE
</h1>

          <p
            style={{
              color: "#bbb",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Luxury Watch Store
          </p>
        </div>
        <CartIcon />
         </div>
<BannerSlider />
<NewProducts products={products} />

<input
  type="text"
  placeholder="🔍 Cari nama jam tangan..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
  }}
/>

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
         {randomProducts
  .slice(0, visibleProducts)
  .map(
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
                    objectFit: "contain",
                    background: "#111",
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
                   
  Rp{" "}
  {Number(product.price).toLocaleString("id-ID")}
</p>

                  <p
                    style={{
                      color: "#888",
                      marginBottom: "20px",
                    }}
                  >
                    {product.gender}
                  </p>
                 <button
  onClick={async () => {
    await addToCart(product.id);
    alert("Produk berhasil ditambahkan ke keranjang");
  }}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background: "#FFD700",
    color: "#000",
    marginBottom: "10px",
  }}
>
  🛒 Tambah ke Keranjang
</button>
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

{visibleProducts < randomProducts.length && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
    }}
  >
    <button
      onClick={() =>
        setVisibleProducts((prev) => prev + 12)
      }
      style={{
        padding: "15px 35px",
        background: "#FFD700",
        color: "#000",
        border: "none",
        borderRadius: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Lihat Produk Selanjutnya
    </button>
  </div>
)}

<WhatsappPopup />
    </main>
  );
}