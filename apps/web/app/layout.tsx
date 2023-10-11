import Header from "@web/components/organisms/header";
import "./globals.css";
import "./animations.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ImageKeeperStoreProvider } from "@web/store/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Keeper",
  description: "Image storage for all your pictures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImageKeeperStoreProvider>
          <Header />
          <main>{children}</main>
        </ImageKeeperStoreProvider>
      </body>
    </html>
  );
}
