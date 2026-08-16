"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PRODUCTS_PER_PAGE = 20;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [selectedGender, setSelectedGender] = useState("Semua");
  const [brands, setBrands] = useState<string[]>(["Semua"]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  async function loadBrands() {
    const { data, error } = await supabase
      .from("brands")
      .select("name")
      .order("name", { ascending: true });

    if (!error && data) {
      const brandNames = data
        .map((brand: any) => brand.name)
        .filter(Boolean);

      setBrands(["Semua", ...brandNames]);
      return;
    }

    // Kalau tabel brands gagal dibaca,
    // gunakan brand dari produk yang sudah dimuat.
    setBrands((prev) => {
      const productBrands = products
        .map((product) => product.brand)
        .filter(Boolean);

      return [
        "Semua",
        ...new Set([
          ...prev.filter((brand) => brand !== "Semua"),
          ...productBrands,
        ]),
      ];
    });
  }

  async function loadProducts(
    pageNumber = 0,
    reset = false
  ) {
    if (loadingProducts) return;

    setLoadingProducts(true);

    const from = pageNumber * PRODUCTS_PER_PAGE;
    const to = from + PRODUCTS_PER_PAGE - 1;

    let query = supabase
      .from("products")
      .select(
        "id,brand,name,price,image,gender,slug"
      )
      .order("id", {
        ascending: false,
      })
      .range(from, to);

    // Filter brand
    if (selectedBrand !== "Semua") {
      query = query.eq(
        "brand",
        selectedBrand
      );
    }

    // Filter gender
    if (selectedGender !== "Semua") {
      query = query.eq(
        "gender",
        selectedGender
      );
    }

    // Search nama atau brand
    const keyword = search
      .trim()
      .replace(/[\s-]/g, "");

    if (keyword !== "") {
      query = query.or(
        `name.ilike.%${keyword}%,brand.ilike.%${keyword}%`
      );
    }

    const { data, error } = await query;

    console.log(
      "PRODUCTS PAGE:",
      data
    );

    if (error) {
      console.error(
        "Gagal mengambil produk:",
        error
      );

      setLoadingProducts(false);
      return;
    }

    const newProducts = data || [];

    if (reset) {
      setProducts(newProducts);
    } else {
      setProducts((prev) => [
        ...prev,
        ...newProducts,
      ]);
    }

    // Kalau hasil kurang dari 20,
    // berarti sudah tidak ada produk berikutnya.
    setHasMore(
      newProducts.length ===
        PRODUCTS_PER_PAGE
    );

    setPage(pageNumber);
    setLoadingProducts(false);
  }

  // Load pertama kali
  useEffect(() => {
    loadBrands();
  }, []);

  // Setiap search / filter berubah,
  // mulai lagi dari 20 produk pertama.
  useEffect(() => {
    setPage(0);
    setHasMore(true);

    loadProducts(0, true);
  }, [
    search,
    selectedBrand,
    selectedGender,
  ]);

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Semua Produk
      </h1>

      <input
        type="text"
        placeholder="Cari jam tangan..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
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
              width: "220px",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#111",
              color: "#fff",
            }}
          >
            {brands.map((brand) => (
              <option
                key={brand}
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
              width: "180px",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #444",
              background: "#111",
              color: "#fff",
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

        <p
          style={{
            color: "#aaa",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {products.length} Produk Ditampilkan
        </p>
      </div>

      {products.length === 0 &&
      !loadingProducts ? (
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            marginTop: "60px",
          }}
        >
          Tidak ada produk ditemukan.
        </p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "25px",
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#111",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
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
                  <Link
                    href={`/brands/${encodeURIComponent(
                      product.brand
                    )}`}
                    style={{
                      color: "#FFD700",
                      textDecoration:
                        "none",
                    }}
                  >
                    <h3>
                      {product.brand}
                    </h3>
                  </Link>

                  <h2>
                    {product.name}
                  </h2>

                  <p>
                    Rp{" "}
                    {Number(
                      product.price
                    ).toLocaleString(
                      "id-ID"
                    )}
                  </p>

                  <Link
                    href={`/product/${product.slug}`}
                  >
                    <button
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          "#FFD700",
                        color: "#000",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                        marginTop:
                          "15px",
                      }}
                    >
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {loadingProducts && (
            <p
              style={{
                textAlign: "center",
                marginTop: "40px",
                color: "#aaa",
              }}
            >
              Memuat produk...
            </p>
          )}

          {hasMore &&
            !loadingProducts && (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  marginTop: "50px",
                  marginBottom: "40px",
                }}
              >
                <button
                  onClick={() =>
                    loadProducts(
                      page + 1,
                      false
                    )
                  }
                  style={{
                    padding:
                      "15px 35px",
                    background:
                      "#FFD700",
                    color: "#000",
                    border: "none",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "bold",
                    cursor:
                      "pointer",
                    fontSize:
                      "16px",
                  }}
                >
                  LIHAT 20 PRODUK
                  LAGI →
                </button>
              </div>
            )}

          {!hasMore &&
            products.length > 0 && (
              <p
                style={{
                  textAlign:
                    "center",
                  color: "#777",
                  marginTop:
                    "40px",
                  marginBottom:
                    "40px",
                }}
              >
                Semua produk sudah
                ditampilkan.
              </p>
            )}
        </>
      )}
    </main>
  );
}