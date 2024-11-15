import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Rooms | Friendly PG",
  description: "Generated by create next app",
};

export default function RoomLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      <body className={` ${font.variable} antialiased bg-gray-100`}>
        <Header />
        {children}
        <Footer />
        {/* Map Floating Icon */}
        <a
          href="https://maps.app.goo.gl/kjM1p7AuU5QriVnt7"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-[5rem] right-4 bg-blue-500 p-1 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          {/* Map SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="48"
            height="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"></path>
            <path d="M6.428 12.494l7.314 -9.252"></path>
            <path d="M10.002 7.935l-2.937 -2.545"></path>
            <path d="M17.693 6.593l-8.336 9.979"></path>
            <path d="M17.591 6.376c.472 .907 .715 1.914 .709 2.935a7.263 7.263 0 0 1 -.72 3.18a19.085 19.085 0 0 1 -2.089 3c-.784 .933 -1.49 1.93 -2.11 2.98c-.314 .62 -.568 1.27 -.757 1.938c-.121 .36 -.277 .591 -.622 .591c-.315 0 -.463 -.136 -.626 -.593a10.595 10.595 0 0 0 -.779 -1.978a18.18 18.18 0 0 0 -1.423 -2.091c-.877 -1.184 -2.179 -2.535 -2.853 -4.071a7.077 7.077 0 0 1 -.621 -2.967a6.226 6.226 0 0 1 1.476 -4.055a6.25 6.25 0 0 1 4.811 -2.245a6.462 6.462 0 0 1 1.918 .284a6.255 6.255 0 0 1 3.686 3.092z"></path>
          </svg>
        </a>

        {/* WhatsApp Floating Icon */}
        <a
          href="https://wa.me/+918477081261"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 bg-green-500 p-1 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          {/* WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="48"
            height="48"
            className="text-white"
          >
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
            <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
          </svg>
        </a>
      </body>
    </html>
  );
}
