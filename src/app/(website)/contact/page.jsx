import Contact from "../components/Contact";

export const metadata = {
  title: "Contact Us | Balaji Luxury Interior Designers",
  description:
    "Get in touch with Balaji Luxury Interior Designers for custom home interior solutions. Reach out for free consultation, quote, and expert design advice.",
  alternates: {
    canonical: "https://balajiluxuryinteriordesigners.in/contact",
  },
  openGraph: {
    title: "Contact Us | Balaji Luxury Interior Designers",
    description:
      "Reach out for a free consultation and expert interior design guidance from Balaji Luxury Interior Designers in Bangalore.",
    url: "https://balajiluxuryinteriordesigners.in/contact",
    images: [
      {
        url: "https://res.cloudinary.com/dnekarzit/image/upload/v1752933755/logo_zgrywd.jpg",
        width: 1200,
        height: 630,
        alt: "Balaji Luxury Interior Designers",
      },
    ],
  },
};

export default function ContactPage() {
  return <Contact />;
}
