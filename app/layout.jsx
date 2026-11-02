import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3004"),
  title: {
    default: "Forma — Thoughtful websites & brand design",
    template: "%s | Forma",
  },
  description:
    "An independent digital studio concept. Explore thoughtful web design, brand identity and ongoing website care.",
  openGraph: {
    title: "Forma — A little clarity. A lot of possibility.",
    description: "A fictional service business built with Next.js.",
    images: ["/studio.webp"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
