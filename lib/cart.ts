import { supabase } from "./supabase";

function generateSessionId() {
  return crypto.randomUUID();
}

export function getSessionId() {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("session_id", sessionId);
  }

  return sessionId;
}

export async function getOrCreateCart() {
  const sessionId = getSessionId();

  const { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (cart) return cart;

  const { data: newCart, error } = await supabase
    .from("carts")
    .insert({
      session_id: sessionId,
    })
    .select()
    .single();

  if (error) throw error;

  return newCart;
}

export async function addToCart(productId: number) {
  const cart = await getOrCreateCart();

  const { data: item } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (item) {
    const { error } = await supabase
      .from("cart_items")
      .update({
        qty: item.qty + 1,
      })
      .eq("id", item.id);

    if (error) throw error;

    window.dispatchEvent(new Event("cartUpdated"));
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .insert({
      cart_id: cart.id,
      product_id: productId,
      qty: 1,
    });

  if (error) throw error;

  window.dispatchEvent(new Event("cartUpdated"));
}

export async function decreaseCartItem(itemId: number) {
  const { data: item } = await supabase
    .from("cart_items")
    .select("qty")
    .eq("id", itemId)
    .maybeSingle();

  if (!item) return;

  if (item.qty > 1) {
    const { error } = await supabase
      .from("cart_items")
      .update({
        qty: item.qty - 1,
      })
      .eq("id", itemId);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) throw error;
  }

  window.dispatchEvent(new Event("cartUpdated"));
}