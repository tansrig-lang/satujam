"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("selectedProduct");

    if (data) {
      const item = JSON.parse(data);
      setProduct(item.name || "");
      setPrice(item.price || "");
    }
  }, []);

  const sendWhatsApp = () => {
  const message = [
"Pesanan SATUJAM.ID",
"",
"Produk: " + product,
"Harga: " + price,
"",
"Nama: " + name,
"WhatsApp: " + phone,
"",
"Provinsi: " + province,
"Kota: " + city,
"Kecamatan: " + district,
"Kode Pos: " + postalCode,
"",
"Alamat:",
address,
"",
"Kurir: " + courier
].join("\n");


    window.open(
      "https://wa.me/628126076263?text=" +
        encodeURIComponent(message),
      "_blank"
    );
  };

  return (
    <main>
      <h1>Checkout SATUJAM.ID</h1>

      <p>Produk: {product}</p>
      <p>Harga: {price}</p>

      <input
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="WhatsApp"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendWhatsApp}>
        KIRIM PESANAN
      </button>
    </main>
  );
}