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
const PRODUCTS_PER_PAGE = 20;

const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);
const [loadingProducts, setLoadingProducts] = useState(false);

  async function loadBrands() {
  const { data, error } = await supabase
    .from("brands")
    .select("name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Gagal mengambil merek:", error);
    return;
  }

  const brandNames = (data || [])
    .map((brand: any) => String(brand.name || "").trim())
    .filter(Boolean);

  setBrands([
    "Semua",
    ...brandNames,
  ]);
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
      "id, brand, name, price, gender, weight, stock, image, slug, description",
      { count: "exact" }
    )
    .eq("active", true)
    .order("id", { ascending: false })
    .range(from, to);

  if (selectedBrand !== "Semua") {
    query = query.eq("brand", selectedBrand);
  }

  if (selectedGender !== "Semua") {
    query = query.eq("gender", selectedGender);
  }

  if (search.trim() !== "") {
    query = query.ilike(
      "name",
      `%${search.trim()}%`
    );
  }

  const {
    data,
    error,
    count,
  } = await query;

  console.log("PRODUCT BATCH:", data);
  console.log("PRODUCT ERROR:", error);

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

  const totalLoaded = reset
    ? newProducts.length
    : products.length + newProducts.length;

  setHasMore(
    count !== null
      ? totalLoaded < count
      : newProducts.length === PRODUCTS_PER_PAGE
  );

  setPage(pageNumber);

  setLoadingProducts(false);
}

useEffect(() => {
  loadBrands();
}, []);

useEffect(() => {
  loadProducts(0, true);
}, [search, selectedBrand, selectedGender]);


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
    {filteredProducts.map(
            (
              product: any,
              index
            ) => (
              <div
               key={product.slug}
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
     {product.slug ? (
  <Link href={`/product/${product.slug}`}>
    <button
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        background: "#444",
        color: "#fff",
        marginBottom: "10px",
      }}
    >
      👁 Lihat Detail
    </button>
  </Link>
) : (
  <button
    disabled
    style={{
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      border: "none",
      background: "#666",
      color: "#ccc",
      cursor: "not-allowed",
      marginBottom: "10px",
    }}
  >
    Slug belum tersedia
  </button>
)}

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
        "checkoutItems",
        JSON.stringify([
          {
            id: product.id,
            qty: 1,
            product,
          },
        ])
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

{hasMore && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
      marginBottom: "40px",
    }}
  >
    <button
      onClick={() => loadProducts(page + 1, false)}
      disabled={loadingProducts}
      style={{
        padding: "15px 35px",
        background: "#FFD700",
        color: "#000",
        border: "none",
        borderRadius: "12px",
        fontWeight: "bold",
        cursor: loadingProducts
          ? "not-allowed"
          : "pointer",
        fontSize: "16px",
        opacity: loadingProducts ? 0.6 : 1,
      }}
    >
      {loadingProducts
        ? "MEMUAT PRODUK..."
        : "LIHAT 20 PRODUK LAGI →"}
    </button>
  </div>
)}

<WhatsappPopup />
    </main>
  );
}