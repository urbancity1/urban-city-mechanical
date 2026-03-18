import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, SERVICE_CITIES } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Wind, Zap, Star, Phone, MapPin } from "lucide-react";

const MINISPLIT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ductless Mini-Split Installation",
  provider: {
    "@type": "HVACBusiness",
    name: "Urban City Mechanical Heating & Air Conditioning service",
    telephone: "+15106196586",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pittsburg",
      addressRegion: "CA",
      postalCode: "94565",
    },
  },
  areaServed: SERVICE_CITIES.map(c => `${c}, CA`),
  description: "Ductless mini-split installation in the East Bay. Single-zone and multi-zone systems. Mitsubishi, LG, Daikin, Fujitsu. Licensed CA HVAC contractor #1093253.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: "East Bay, CA",
  },
};

const BENEFITS = [
  "Single-zone & multi-zone ductless systems",
  "Mitsubishi, LG, Daikin & Fujitsu brands",
  "No ductwork — perfect for older East Bay homes",
  "Up to 40% energy savings vs. traditional HVAC",
  "Qualifies for PG&E rebates & tax credits",
  "Licensed CA HVAC Contractor Lic #1093253",
];


export default function MiniSplit() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Mini-Split Installation in Pittsburg, Antioch & East Bay CA | Urban City Mechanical"
        description="Ductless mini-split installation in Pittsburg, Antioch, Brentwood & the East Bay. Mitsubishi, LG & Daikin systems. PG&E rebates available. Free quote: (510) 619-6586. CA Lic #1093253."
        canonical="https://www.urbancityairca.com/mini-split"
        schema={MINISPLIT_SCHEMA}
      />
      <Navigation />

      <section className="pt-28 pb-16 bg-gradient-to-br from-teal-900 to-teal-700 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Wind className="w-5 h-5 text-yellow-400" />
                <span className="text-teal-200 text-sm font-medium uppercase tracking-wide">Pittsburg · Antioch · East Bay</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                Mini-Split Installation<br />
                <span className="text-yellow-400">in Pittsburg & Antioch</span>
              </h1>
              <p className="text-teal-100 text-lg mb-6">
                Add efficient heating and cooling to any room — no ductwork required. Urban City Mechanical installs ductless mini-splits throughout Pittsburg, Antioch, Brentwood, Concord, and the East Bay. Perfect for older homes, additions, and garages.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-teal-100">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="tel:5106196586"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-6 py-4 rounded-xl transition-colors"
                data-testid="link-call-minisplit"
              >
                <Phone className="w-5 h-5" />
                (510) 619-6586 — Free Quote
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <LeadForm serviceType="mini-split" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-4">
            Why East Bay Homeowners Choose Mini-Splits
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Older homes in Pittsburg, Antioch, and Brentwood often lack ductwork. Mini-splits are the most efficient way to add year-round comfort to any space.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Up to 40% Energy Savings",
                desc: "Inverter technology adjusts output continuously — no wasteful on/off cycling like traditional central AC. Most customers see lower PG&E bills immediately.",
              },
              {
                icon: <Wind className="w-8 h-8" />,
                title: "No Ductwork Needed",
                desc: "Ideal for Contra Costa County homes without ducts: room additions, converted garages, bonus rooms, and older construction throughout the East Bay.",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "PG&E Rebates Available",
                desc: "Many ductless systems qualify for PG&E rebates and federal tax credits. We'll help you identify which savings apply to your installation.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <div className="text-teal-600 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Mini-Split Installation Service Area — East Bay & Contra Costa County
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {SERVICE_CITIES.map((city) => (
                <div key={city} className="text-sm text-gray-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Urban City Mechanical · CA Lic #1093253 ·{" "}
          <a href="tel:5106196586" className="text-green-400 hover:underline">(510) 619-6586</a>
          {" "}· Mini-Split Installation in Pittsburg, Antioch & East Bay CA
        </p>
      </footer>
    </div>
  );
}
