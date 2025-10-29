import type { Metadata } from "next";
import { FilterBar } from "./ui/FilterBar";
import "./ui/global.css";
import Header from "./ui/header";

// 🧩 Configuración global del head (para todas las páginas)
export const metadata: Metadata = {
  title: {
    default: "Million Real Estate",
    template: "%s | Million Real Estate", // Las páginas pueden cambiar %s dinámicamente
  },
  description: "Panel de control y gestión de propiedades.",
  keywords: ["inmuebles", "ventas", "alquileres", "dashboard"],
  icons: {
    icon: "/favicon.ico", // tu icono del sitio
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50 text-gray-900">
        <Header />
        <FilterBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
