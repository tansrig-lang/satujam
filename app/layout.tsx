import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://satujam.online"),

  title: {
    default: "SATUJAM.ONLINE | Jual Jam Tangan Original Medan",
    template: "%s | SATUJAM.ONLINE",
  },

  description:
    "SATUJAM.ONLINE adalah toko jam tangan original di Medan yang menjual Seiko, Casio, Citizen, Orient, Bonia, Alexandre Christie, Rolex dan merek ternama dengan garansi resmi.",

  keywords: [
    "jual jam tangan original",
    "toko jam tangan medan",
    "jam tangan original indonesia",
    "seiko original",
    "casio original",
    "citizen original",
    "orient original",
    "bonia original",
    "alexandre christie original",
    "rolex original",
    "jam tangan pria",
    "jam tangan wanita",
    "satujam",
    "satujam online",
    "satujam.online"
  ],

  authors: [
    {
      name: "SATUJAM.ONLINE",
    },
  ],

  creator: "SATUJAM.ONLINE",

  publisher: "SATUJAM.ONLINE",

  alternates: {
    canonical: "https://satujam.online",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://satujam.online",
    siteName: "SATUJAM.ONLINE",
    title: "SATUJAM.ONLINE | Jual Jam Tangan Original",
    description:
      "Toko jam tangan original terpercaya di Medan. Seiko, Casio, Citizen, Bonia, Alexandre Christie, Orient, Rolex dan lainnya.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SATUJAM.ONLINE",
    description:
      "Jual Jam Tangan Original Medan",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
  export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}