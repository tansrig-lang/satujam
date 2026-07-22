"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/cart";

export default function CartIcon() {
  const [count, setCount] = useState(0);

 useEffect(() => {
  loadCartCount();

  function handleCartUpdate() {
    loadCartCount();
  }

  window.addEventListener(
    "cartUpdated",
    handleCartUpdate
  );

  return () => {
    window.removeEventListener(
      "cartUpdated",
      handleCartUpdate
    );
  };
}, []);

  async function loadCartCount() {
    const sessionId = getSessionId();

    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (!cart) return;

    const { data: items } = await supabase
      .from("cart_items")
      .select("qty")
      .eq("cart_id", cart.id);

    if (!items) return;

    const total = items.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    setCount(total);
  }
  return (
    <Link href="/cart">
      <div
        style={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "32px" }}>🛒</span>

        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "red",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
    {count}
        </div>
      </div>
    </Link>
  );
}