import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, SERVICE_CITIES } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Thermometer, Clock, ShieldCheck, Phone, MapPin } from "lucide-react";

const AC_REPAIR_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AC Repair & Air Conditioning Service",
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
  description: "Same-day AC repair and air conditioner replacement throughout the East Bay. All brands serviced. Licensed CA HVAC contractor #1093253.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: "East Bay, CA",
  },
};

const BENEFITS = [
  "Same-day AC repair — most jobs done in one visit",
  "All brands: Carrier, Lennox, Trane, Rheem & more",
  "Upfront flat-rate pricing, no surprise charges",
  "Serving Pittsburg, Antioch, Brentwood & Concord",
  "Licensed CA HVAC Contractor Lic #1093253",
  "100% satisfaction guarantee",
];


export default function ACRepair() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="AC Repair in Pittsburg, Antioch & East Bay CA | Same-Day Service | Urban City Mechanical"
        description="Fast air conditioner repair in Pittsburg, Antioch, Brentwood, Concord & the East Bay. All brands serviced. Same-day appointments. Call (510) 619-6586. Licensed CA Lic #1093253."
        canonical="https://www.urbancityairca.com/ac-repair"
        schema={AC_REPAIR_SCHEMA}
      />
      <Navigation />

      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">Pittsburg · Antioch · East Bay</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                AC Repair in<br />
                <span className="text-yellow-400">Pittsburg & Antioch</span>
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                Air conditioner not cooling? Urban City Mechanical provides same-day AC repair throughout Pittsburg, Antioch, Brentwood, Concord, and the East Bay. We fix all brands — most repairs done in a single visit.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-blue-100">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="tel:5106196586"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-6 py-4 rounded-xl transition-colors"
                data-testid="link-call-ac"
              >
                <Phone className="w-5 h-5" />
                (510) 619-6586 — Call Now
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <LeadForm serviceType="repair" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-4">
            Common AC Problems We Fix — East Bay CA
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Whether you're in Pittsburg, Antioch, or anywhere in Contra Costa County, we diagnose and repair your AC the same day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Thermometer className="w-8 h-8" />,
                title: "AC Not Cooling",
                desc: "Running but not reaching temperature? Could be low refrigerant, dirty evaporator coils, or a failing compressor. We diagnose it fast.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "AC Short Cycling",
                desc: "Turning on and off every few minutes wastes energy and damages the compressor. We find the root cause and fix it right.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Unusual Noises or Smells",
                desc: "Rattling, banging, or burning smells are red flags. Don't wait — call us before a small issue turns into a full replacement.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="text-blue-600 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* City coverage */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              AC Repair Service Area — East Bay & Contra Costa County
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
          {" "}· AC Repair in Pittsburg, Antioch & East Bay CA
        </p>
      </footer>
    </div>
  );
}
