import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: [
        "/favicon.svg",
        "/apple-touch-icon.png",
        "/pwa-192x192.png",
        "/pwa-512x512.png",
        "/logo.svg",
        "/robots.txt",
      ],
      manifest: {
        name: "Parcel Mate",
        short_name: "ParcelMate",
        description: "Your ParcelMate",
        theme_color: "#ffffff",
        icons: [
          { src: "apple-touch-icon.png", sizes: "180x180", type: "image/png" },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "public/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Cache the Google Maps API and the desired map tiles
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/maps.googleapis.com\/maps\/(?!vt\/).*/,

            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "map-cache",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
          {
            urlPattern: /^https:\/\/maps.googleapis.com\/maps\/vt\/.*/,

            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "map-tiles",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
    react(),
  ],
});
