import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Karla, Luckiest_Guy, Palanquin_Dark } from "next/font/google";
import ReduxProvider from "./ReduxProvider/ReduxProvider";
import ClientSessionProvider from "@/components/sessionProvider";
import { getServerSession } from "next-auth";

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const luckiestGuy = Luckiest_Guy({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-luckiest-guy",
});

const palanquinDark = Palanquin_Dark({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-palanquin-dark",
});

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${karla.variable} ${luckiestGuy.variable} ${palanquinDark.variable}`}
      >
        <ClientSessionProvider session={session}>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
