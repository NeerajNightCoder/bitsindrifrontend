import "./globals.css";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";
import Avatar from "@/app/assets/elon.webp";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const currentUrl = headersList.get("x-nextjs-route"); // The current path
  return (
    <html lang="en">
      <head>
        {/* Favicon using the base64-encoded image */}
        <link
          rel="icon"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA21BMVEVHcEz///////////////////////////////////////////////8BgkPOwgXl4K/g0xn6+/+9miPiAifp2wDHvBz87cLmFCjYywZumTDPIif19vvs6+UMh0O0xbuoqygmjkXVy1nROyfAdh3v7/Lj3aGslxrDtRLWzba7rwfODSDf1sjLUib56LSZmCJnWBTgcmwAdyzg12QAfzX58taXtaHzrpDR19X46QC7UyPl5tuncSbcAAf9++pNkGeFrzPYp6qJfyM5SyvFxZDSS1FOlTyzuXRlmXvKXQBTHkJPAAAADHRSTlMAYmBCJFyiRErwnJtNAP3+AAABeElEQVQ4jY2T6XaCQAyF26q1tswgsgyLIjuCuOGOW/f2/Z+oQY51AE/r/TWZfCe5A8nNzXWq1kuqUum7BnNBjdopf38pneoxy99SVzNpt6PCrAZdX2KlGd3l6I8uOhgvJDpOnT4UgAEdV4qAtJByFep5YKnPjb2uty8BnMuCPhXQW3piuQKgYXkkCFgUfVFewRGXATwSm5nk4EUuA5438lqgLmj4OhwWASYMyZpXVR6l6iBUesX7mlg22QBgGADsS8DYjsiGWBtkiH4XTecloL9dkygiFjq0RL8zXZYALoxUvgUeDFE8nCzkvuTztgsAQejDU04dcgCnqpFlg0llqJwKUEA7ARc23wrhBcZkySROAej1ocm3Zdmo05noEPcKgCsA0YMSCKX5vuAWgERYmRrjjMPJl8No5krI/nnlPHKa6eOYTXr6jI1xAPBRVWpoHRN7GAeyHwSymVnMhvY89m03bmKhGbu/I1UrLw7HUcHTtav3//L+pR+KVj35oODCWgAAAABJRU5ErkJggg=="
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` antialiased`}>
        <div className="page-header">
          <div className="brand">
            <Link href="/">
              <p>BitSindri</p>
            </Link>
          </div>
          <p>{currentUrl}</p>
          <div className="avatar">
            <Image src={Avatar} width={1280} height={1280} alt="avatar" />
          </div>
        </div>
        <div className="flex">
          <Sidebar />
          <div className="pagecontent relative">
            {children}
            </div>
        </div>
      </body>
    </html>
  );
}
