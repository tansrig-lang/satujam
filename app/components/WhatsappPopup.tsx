"use client";

import { useState } from "react";

export default function WhatsappPopup() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#25D366",
          color: "#fff",
          padding: "20px",
          borderRadius: "15px",
          width: "320px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        }}
      >
        <button
          onClick={() => setShow(false)}
          style={{
            float: "right",
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        <h3>Butuh Bantuan?</h3>

        <p>
          Hubungi Customer Service SATUJAM.ID
          melalui WhatsApp.
        </p>

        <a
          href="https://wa.me/628126076263"
          target="_blank"
          rel="noreferrer"
        >
          <button
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            CHAT WHATSAPP
          </button>
        </a>
      </div>
    </div>
  );
}