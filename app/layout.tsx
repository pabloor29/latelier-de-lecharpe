import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FloridaBlanca - Bar à Poulpe",
  description: "Le Floridablanca à Carcassonne vous invite à découvrir une large sélection de tapas savoureuses dans un cadre convivial. Situé au pied de la cité médiévale, notre restaurant propose une cuisine méditerranéenne créative, mettant en valeur des produits frais et locaux.",
  icons: "/logo-blue.webp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>FloridaBlanca - Bar à Poulpe</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content="Tapas, Bar à poulpe, restaurant, carcassonne" />
        <meta name="description" content="Le Floridablanca à Carcassonne vous invite à découvrir une large sélection de tapas savoureuses dans un cadre convivial. Situé au pied de la cité médiévale, notre restaurant propose une cuisine méditerranéenne créative, mettant en valeur des produits frais et locaux." />
        <meta property="og:title" content="FloridaBlanca - Bar à Poulpe" />
        <meta property="og:image" content="/logo-blue.webp" />
        <meta property="og:url" content="https://www.floridablanca.fr/" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/logo-blue.webp"></link>
      </Head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
