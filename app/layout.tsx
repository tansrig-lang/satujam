
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SATUJAM.ID | Jual Jam Tangan Original Medan",
  description:
    "SATUJAM.ID adalah toko jam tangan original di Medan yang menjual Seiko, Casio, Bonia, Alexandre Christie, Citizen, Orient, Rolex dan merek ternama lainnya.",

  keywords: [
    "jual jam tangan original medan",
    "toko jam tangan medan",
    "seiko original medan",
    "casio original medan",
    "bonia original medan",
    "alexandre christie original medan",
    "orient original medan",
    "rolex medan",
    "jam tangan pria",
    "jam tangan wanita",
    "satujam.id",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

