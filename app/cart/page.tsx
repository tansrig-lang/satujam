"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { getSessionId, decreaseCartItem } from "@/lib/cart";
function toNumber(price: any) {
  if (typeof price === "number") return price;

  return Number(String(price).replace(/\./g, ""));
}

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const sessionId = getSessionId();

    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (!cart) return;

    console.log("Cart ID:", cart.id);
    const { data, error } = await supabase
  .from("cart_items")
  .select(`
    id,
    qty,
    product:products (
      id,
      brand,
      name,
      price,
      image
    )
  `)
  .eq("cart_id", cart.id);

console.log("ITEMS:", data);
console.log("ERROR:", error);
if (data) {
  setItems(data);
}
  }
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        🛒 Keranjang Belanja
      </h1>

      <div
        style={{
          background: "#111",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        {items.map((item: any) => (
  <div
    key={item.id}
    style={{
      display: "flex",
      gap: "20px",
      alignItems: "center",
      padding: "20px",
      marginBottom: "20px",
      background: "#1b1b1b",
      borderRadius: "12px",
    }}
  >
    <img
      src={item.product.image}
      alt={item.product.name}
      style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />

    <div style={{ flex: 1 }}>
      <h2>{item.product.brand}</h2>

      <p>{item.product.name}</p>

      <p>
        Harga : Rp{" "}
        toNumber(item.product.price).toLocaleString("id-ID")
      </p>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  }}
>
  <button
    onClick={async () => {
      await decreaseCartItem(item.id);
      loadCart();
    }}
    style={{
      width: "35px",
      height: "35px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
    }}
  >
    ➖
  </button>

 

</div>
      <p>Harga Asli: {item.product.price}</p>

      <p>
        Subtotal : Rp{" "}
        {(
          toNumber(item.product.price) * item.qty
        ).toLocaleString("id-ID")}
      </p>
    </div>
  </div>
))}
<div
  style={{
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #333",
    textAlign: "right",
  }}
>
  <h2>
    Total : Rp{" "}
    <button
  onClick={() => {
    localStorage.setItem(
      "checkoutItems",
      JSON.stringify(items)
    );
    window.location.href = "/checkout";
  }}
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "16px",
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  LANJUT CHECKOUT
</button>
    {items
      .reduce(
        (total: number, item: any) =>
          total +
          toNumber(item.product.price) * item.qty,
        0
      )
      .toLocaleString("id-ID")}
  </h2>
</div>
      </div>
    </main>
  );
}