import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SessionWrapper from "./component/SessionWrapper";
import { PaymentProvider } from "./context/paymentContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai - fund your projects with chai",
  description: "This website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white">
        <SessionWrapper>
          <PaymentProvider>
            <div className="flex flex-col min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              <Navbar />
              <main className="flex-1 overflow-y-auto">  {/* ← add overflow-y-auto */}
                {children}
              </main>
              <Footer />
            </div>
          </PaymentProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}