import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Home",
  description: "Smart Home App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <p>
          <Link href={"/dashboard"}>dashboard</Link>
        </p>
        <p>
          <Link href={"/sign-in"}>sign-in</Link>
        </p>
        {children}
      </body>
    </html>
  );
}
