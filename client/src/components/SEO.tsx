import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}

export function SEO({ title, description, canonical, schema }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    // Open Graph
    const og: Record<string, string> = {
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:site_name": "Urban City Mechanical",
    };
    Object.entries(og).forEach(([property, content]) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    // JSON-LD schema
    let schemaEl = document.querySelector("#json-ld-schema");
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement("script");
        schemaEl.setAttribute("type", "application/ld+json");
        schemaEl.setAttribute("id", "json-ld-schema");
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }

    return () => {
      // cleanup: reset title on unmount
      document.title = "Urban City Mechanical";
    };
  }, [title, description, canonical, schema]);

  return null;
}

// All cities within ~50-mile radius of Pittsburg CA 94565
export const SERVICE_CITIES = [
  // Contra Costa County — core service area
  "Pittsburg", "Bay Point", "Antioch", "Oakley", "Brentwood",
  "Concord", "Pleasant Hill", "Martinez", "Clayton", "Walnut Creek",
  "Danville", "San Ramon", "Hercules", "Pinole", "San Pablo",
  "Orinda", "Lafayette", "Moraga", "El Sobrante", "Benicia",
  // Alameda County
  "Richmond", "El Cerrito", "Berkeley", "Oakland", "San Leandro",
  "Castro Valley", "Hayward", "Fremont", "Livermore", "Dublin",
  "Pleasanton", "Union City", "Newark",
  // Solano County
  "Vallejo", "American Canyon", "Fairfield", "Vacaville", "Suisun City",
  // San Joaquin County (eastern edge)
  "Tracy", "Mountain House", "Stockton",
  // Santa Clara County — South Bay
  "Milpitas", "San Jose", "Santa Clara", "Sunnyvale", "Mountain View",
  "Cupertino", "Campbell", "Los Altos",
];

// Shared LocalBusiness schema — used on homepage
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Urban City Mechanical Heating & Air Conditioning service",
  url: "https://www.urbancityairca.com",
  telephone: "+15106196586",
  priceRange: "$$",
  image: "https://www.urbancityairca.com/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pittsburg",
    addressLocality: "Pittsburg",
    addressRegion: "CA",
    postalCode: "94565",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.0274,
    longitude: -121.8847,
  },
  areaServed: SERVICE_CITIES.map(c => `${c}, CA`),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "109",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.google.com/maps/search/Urban+City+Mechanical+Heating+%26+Air+Conditioning",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HVAC Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furnace Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mini-Split Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HVAC Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HVAC Maintenance" } },
    ],
  },
};
