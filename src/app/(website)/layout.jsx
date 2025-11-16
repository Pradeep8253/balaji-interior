import Footer from "./components/Footer";
import FloatingActionFooter from "./components/FloatingActionFooter";
import Header from "./components/Header";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const metadata = {
  title:
    "Balaji Luxury Interiors | Tiles, Modular Work, False Ceiling, Wall Finishes",
  description:
    "Balaji Luxury Interior Designers transforms every space with elegant, functional interiors. From smart modular kitchens and designer false ceilings to premium flooring and wall finishes—we deliver personalized luxury at an affordable price.",
  keywords:
    "interior designers in Bangalore,best interior designers in Bangalore,affordable interior designers Bangalore,luxury interior design Bangalore,home interior designers near me,interior decorators in Bangalore,modular kitchen designers Bangalore,residential interior designers Bangalore,commercial interior designers in Bangalore,top-rated interior designers in Bangalore,modular kitchen L-shape U-shape Bangalore,POP false ceiling design Bangalore,gypsum ceiling work Bangalore,wall paneling & texture Bangalore,wardrobe design sliding hinged Bangalore,custom bed design Bangalore,TV unit design Bangalore,bathroom fittings interior Bangalore,lighting and electrical layout Bangalore,granite kitchen platforms Bangalore,wooden & PVC wall cladding Bangalore,Balaji Luxury Interior Designers,BLID interior company,balajiluxuryinteriordesigners.in,complete home interiors Bangalore,turnkey interior design Bangalore,creative home makeovers Bangalore,interior design services near me,home renovation near me,modular kitchen near me,POP ceiling near me,Bangalore interior design firm near me,budget interior designer near me,custom furniture maker near me , best interior design company Bangalore,interior design consultation Bangalore,home decor solutions Bangalore,interior design for small spaces Bangalore,modern interior design Bangalore,traditional interior design Bangalore,luxury home interiors Bangalore,affordable home interiors Bangalore",
  author: "balaji luxury interior designers",
  thumbnail:
    "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg",
  openGraph: {
    title:
      "Balaji Luxury Interiors | Tiles, Modular Work, False Ceiling, Wall Finishes",
    description:
      "Balaji Luxury Interior Designers transforms every space with elegant, functional interiors. From smart modular kitchens and designer false ceilings to premium flooring and wall finishes—we deliver personalized luxury at an affordable price.",
    url: `https://balajiluxuryinteriordesigners.in/`,
    images: [
      {
        url:
          "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg" ||
          "https://res.cloudinary.com/dnekarzit/image/upload/v1752934741/balaji-small-logo_fqeh4x.jpg", // Fallback image,
        width: 1200,
        height: 630,
        alt: `Balaji Luxury Interior Designers – Complete Home and Commercial Interior Services`,
      },
    ],
  },
  metadataBase: new URL("https://balajiluxuryinteriordesigners.in/"),
  alternates: {
    canonical: "https://balajiluxuryinteriordesigners.in/",
    languages: {
      "en-US": "/en-US",
    },
  },
  verification: {
    google: "YhP5iU5BZtclm_YBF1r0U6FARTP8f-IJ5BMr45i",
  },
  icons: {
    icon: "/favicon.ico",
  },

  category: [
    "interior design",
    "modular kitchen",
    "home renovation",
    "luxury interiors",
    "residential interiors",
    "commercial interiors",
    "false ceiling work",
    "wall paneling",
    "custom furniture",
    "POP & gypsum design",
    "lighting and decor",
    "complete home interiors",
    "turnkey interior solutions",
  ],
};

export default function layout({ children }) {
  return (
    <>
      <GoogleTagManager gtmId="GTM-NH2ZGH9C" />

      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingActionFooter />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4WKYHJ9E2N`}
      />
      <Script
        id="ga"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}  

          gtag('js', new Date());
          gtag('config', 'G-4WKYHJ9E2N', {
            page_path: window.location.pathname,  

          });
        `,
        }}
      />
    </>
  );
}
