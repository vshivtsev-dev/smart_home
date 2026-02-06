import type {Metadata} from "next";
import "@/styles/main.scss";
import SideBar from "@/components/sideBar/SideBar";

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
        <SideBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
