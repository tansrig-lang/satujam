"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [province, setProvince] = useState("");
const [city, setCity] = useState("");
const [district, setDistrict] = useState("");
const [postalCode, setPostalCode] = useState("");
const [address, setAddress] = useState("");
const [courier, setCourier] = useState("JNE");

useEffect(() => {
  const data = localStorage.getItem("selectedProduct");

  if (data) {
    const item = JSON.parse(data);

    setProduct(item.name || "");
    setPrice(item.price || "");
  }
}, []);


const sendWhatsApp = () => {
  const message =
    "Pesanan SATUJAM.ID\n\n" +
    "Produk: " + product + "\n" +
    "Harga: " + price + "\n\n" +
    "Nama: " + name + "\n" +
    "WhatsApp: " + phone + "\n\n" +
    "Provinsi: " + province + "\n" +
    "Kota: " + city + "\n" +
    "Kecamatan: " + district + "\n" +
    "Kode Pos: " + postalCode + "\n\n" +
    "Alamat: " + address + "\n\n" +
    "Kurir: " + courier;

  window.open(
    "https://wa.me/628126076263?text=" +
      encodeURIComponent(message),
    "_blank"
  );
};


return (
  <main
    style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        color: "#FFD700",
      }}
    >
      Checkout SATUJAM.ID
    </h1>

    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "20px",
      }}
    >
      <h2>Ringkasan Pesanan</h2>

      <p>
        <strong>Produk:</strong> {product}
      </p>

      <p>
        <strong>Harga:</strong> {price}
      </p>
    </div>

<h2
  style={{
    marginTop: "20px",
    marginBottom: "15px",
  }}
>
  Data Penerima
</h2>




    <input
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Nama"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="WhatsApp"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    />

    <input
    
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Provinsi"
      value={province}
      onChange={(e) => setProvince(e.target.value)}
    />

    <input
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Kota / Kabupaten"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />

    <input
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Kecamatan"
      value={district}
      onChange={(e) => setDistrict(e.target.value)}
    />

    <input
  
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Kode Pos"
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />

    <textarea
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      placeholder="Alamat Lengkap"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />

    <select
   
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  boxSizing: "border-box",
}}


      value={courier}
      onChange={(e) => setCourier(e.target.value)}
    >
      <option>JNE</option>
      <option>J&T</option>
      <option>SiCepat</option>
      <option>AnterAja</option>
    </select>
   <div
  style={{
    background: "#111",
    padding: "20px",
    borderRadius: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  <h2>QRIS Pembayaran</h2>

  <img
    src="/qris.jpg"
    alt="QRIS"
    style={{
      width: "280px",
      maxWidth: "100%",
    }}
  />
</div>
<div
  style={{
    marginBottom: "20px",
  }}
>
  <h3>Upload Bukti Transfer</h3>

  <input type="file" />
</div>
<button
  onClick={sendWhatsApp}
  style={{
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background: "#FFD700",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  KIRIM PESANAN
</button>
  </main>
);
}