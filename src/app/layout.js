import Footer from "@/shared/Footer";
import ClientLayout from "@/shared/ClientLayout";
// import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import "@/styles/globals.css";

export const metadata = {
  title: "Banco de Buenas Prácticas de Planeación Municipal | Gobierno del Estado de Hidalgo",
  description:
    "Revive los logros que han transformado Hidalgo. Explora las buenas prácticas de planeación democrática, regional, territorial y sostenible implementadas en nuestros municipios.",
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "Unidad de Planeación y Prospectiva - Coordinación General de Planeación y Proyectos - Gabriel Gómez Gómez",
      // url: "https://planestataldedesarrollo.hidalgo.gob.mx", // personalizar
    },
  ],
  // Open Graph (para compartir en redes como Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Banco de Buenas Prácticas de Planeación Municipal | Gobierno de Hidalgo",
    description:
      "Revive los logros que han transformado Hidalgo. Explora las buenas prácticas de planeación democrática, regional, territorial y sostenible implementadas en nuestros municipios.",
    url: "https://buenaspracticas.hidalgo.gob.mx",
    siteName: "Banco de Buenas Prácticas de Planeación Municipal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Banco de Buenas Prácticas de Planeación Municipal",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  // URL base para generar links absolutos
  metadataBase: new URL("https://buenaspracticas.hidalgo.gob.mx"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* <GoogleAnalytics /> */}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
