// components/seo/JsonLd.js
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "GodFirst Fashion",
    "image": "https://god-first-fashion.vercel.app//images/atelier_measurement.png",
    "@id": "https://god-first-fashion.vercel.app/",
    "url": "https://god-first-fashion.vercel.app/",
    "telephone": "+2348023828071",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26D Olowu Street",
      "addressLocality": "Ikeja",
      "addressRegion": "Lagos",
      "postalCode": "100001",
      "addressCountry": "NG"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/godfirstfashion",
      "https://www.facebook.com/godfirstfashion"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}