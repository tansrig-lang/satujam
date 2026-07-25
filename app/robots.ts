import type { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/admin",
        ],
      },
    ],
    sitemap: "https://satujam.online/sitemap.xml",
    host: "https://satujam.online",
  };
}

