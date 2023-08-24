import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter, Urbanist, Montserrat, Roboto } from "next/font/google";
import localFont from "next/font/local";
import AuthProvider from "@/components/Providers/Providers";

const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Felix Ramallo",
  description: "Periodista",
};

const neueMontreal = localFont({
  src: [
    {
      path: "../utils/fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../utils/fonts/NeueMontreal-Medium.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={urbanist.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
