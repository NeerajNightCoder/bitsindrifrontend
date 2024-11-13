import "./globals.css";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";
import Avatar from "@/app/assets/elon.webp";
import FullScreenBtn from "./components/FullScreenBtn";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const currentUrl = headersList.get("x-nextjs-route"); // The current path
  console.log(currentUrl);
  return (
    <html lang="en">
      <head>
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
            <FullScreenBtn />
          </div>
          <p>{currentUrl}</p>
          <div className="avatar">
            <Image src={Avatar} width={1280} height={1280} alt="avatar" />
          </div>
        </div>
        <div className="flex">
          <Sidebar />

          {children}
        </div>
      </body>
    </html>
  );
}
