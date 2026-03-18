import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, SERVICE_CITIES } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, Clock, ShieldCheck, Phone, MapPin } from "lucide-react";

const FURNACE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Furnace Repair & Heating Service",
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
  description: "Emergency furnace repair and heating service throughout the East Bay. Gas furnaces, heat pumps, wall heaters. Licensed CA HVAC contractor #1093253.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: "East Bay, CA",
  },
};

const BENEFITS = [
  "Gas furnace, heat pump & wall heater repair",
  "Carbon monoxide & heat exchanger safety checks",
  "All brands: Carrier, Lennox, Goodman, Rheem",
  "Serving Pittsburg, Antioch, Brentwood & Concord",
  "Flat-rate honest pricing, no upselling",
  "Licensed CA HVAC Contractor Lic #1093253",
];


export default function FurnaceRepair() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Furnace Repair in Pittsburg, Antioch & East Bay CA | Urban City Mechanical"
        description="Emergency furnace & heating repair in Pittsburg, Antioch, Brentwood, Concord & the East Bay. Gas furnaces, heat pumps, wall heaters. Call (510) 619-6586. CA Lic #1093253."
        canonical="https://www.urbancityairca.com/furnace-repair"
        schema={FURNACE_SCHEMA}
      />
      <Navigation />

      <section className="pt-28 pb-16 bg-gradient-to-br from-orange-900 to-orange-700 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-yellow-400" />
                <span className="text-orange-200 text-sm font-medium uppercase tracking-wide">Pittsburg · Antioch · East Bay</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                Furnace Repair in<br />
                <span className="text-yellow-400">Pittsburg & Antioch</span>
              </h1>
              <p className="text-orange-100 text-lg mb-6">
                Heater not working? Urban City Mechanical provides fast furnace and heating repairs throughout Pittsburg, Antioch, Brentwood, Concord, and the entire East Bay. We fix gas furnaces, heat pumps, and wall heaters — most jobs completed the same day.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-orange-100">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="tel:5106196586"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-6 py-4 rounded-xl transition-colors"
                data-testid="link-call-furnace"
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
            Heating Problems We Fix — East Bay CA
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            From Pittsburg to Walnut Creek, we diagnose and repair any heating issue. Don't wait through a cold night — call us now.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Flame className="w-8 h-8" />,
                title: "No Heat or Weak Heat",
                desc: "Furnace running but blowing cold air? Could be a bad ignitor, failed heat exchanger, or dirty flame sensor. We fix it same day.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Pilot Light or Ignition Issues",
                desc: "Pilot won't light or keeps going out. Usually a faulty thermocouple or gas valve — a quick, affordable repair we handle every day.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Gas Smell or CO Warning",
                desc: "If you smell gas or your CO detector goes off, leave the house and call us immediately. We perform full safety inspections.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="text-orange-600 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Furnace Repair Service Area — East Bay & Contra Costa County
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
          {" "}· Furnace Repair in Pittsburg, Antioch & East Bay CA
        </p>
      </footer>
    </div>
  );
}
