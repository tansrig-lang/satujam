"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [courier, setCourier] = useState("JNE");

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1>Checkout SATUJAM.ID</h1>

      <input
        placeholder="Nama Penerima"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <input
        placeholder="Nomor WhatsApp"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <input
        placeholder="Provinsi"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <input
        placeholder="Kota / Kabupaten"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <input
        placeholder="Kecamatan"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <input
        placeholder="Kode Pos"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <textarea
        placeholder="Alamat Lengkap"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          height: "120px",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      />

      <select
        value={courier}
        onChange={(e) => setCourier(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px",
        }}
      >
        <option>JNE</option>
        <option>J&T</option>
        <option>SiCepat</option>
        <option>AnterAja</option>
        <option>Ninja Xpress</option>
      </select>

      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Pembayaran QRIS Mandiri
      </h2>

      <img
        src="/qris-mandiri.jpg"
        alt="QRIS Mandiri"
        style={{
          width: "350px",
          maxWidth: "100%",
          borderRadius: "15px",
        }}
      />

      <button
        onClick={() => {
          const message = `
Pesanan SATUJAM.ID

Nama: ${name}
WhatsApp: ${phone}

Provinsi: ${province}
Kota: ${city}
Kecamatan: ${district}
Kode Pos: ${postalCode}

Alamat:
${address}

Kurir: ${courier}

Mohon konfirmasi ongkir dan total pembayaran.
`;

          window.open(
            `https://wa.me/628126076263?text=${encodeURIComponent(
              message
            )}`,
            "_blank"
          );
        }}
        style={{
          width: "100%",
          padding: "18px",
          marginTop: "30px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        KIRIM PESANAN KE ADMIN
      </button>
    </main>
  );
}