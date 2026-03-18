import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, SERVICE_CITIES } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Wrench, Clock, ShieldCheck, Phone, MapPin, CalendarCheck, Zap, DollarSign, ThumbsUp } from "lucide-react";

const MAINTENANCE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HVAC Maintenance & Seasonal Tune-Up",
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
  description: "Annual HVAC maintenance and seasonal tune-up service for residential and commercial properties throughout the East Bay. Prevent costly breakdowns, extend equipment life, and keep energy bills low. Licensed CA HVAC contractor #1093253.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: "East Bay, CA",
  },
};

const BENEFITS = [
  "Prevent expensive emergency breakdowns",
  "Lower energy bills — clean systems run 15-20% more efficiently",
  "Extend equipment life by 5–10 years",
  "Catch small problems before they become big ones",
  "Licensed CA HVAC Contractor Lic #1093253",
  "Available for both residential and commercial properties",
];

const TUNE_UP_INCLUDES = [
  { icon: <Wrench className="w-6 h-6" />, title: "Filter Inspection & Replacement", desc: "Dirty filters make your system work harder and cost more. We check and replace if needed." },
  { icon: <Zap className="w-6 h-6" />, title: "Electrical & Controls Check", desc: "Inspect all electrical connections, capacitors, contactors, and thermostat calibration." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Refrigerant Level Check", desc: "Low refrigerant is the #1 cause of AC failure. We check levels and look for leaks." },
  { icon: <ThumbsUp className="w-6 h-6" />, title: "Coil Cleaning", desc: "Dirty evaporator and condenser coils reduce efficiency by up to 30%. We clean both." },
  { icon: <DollarSign className="w-6 h-6" />, title: "Drain Line Flush", desc: "Clogged drain lines cause water damage and mold. We flush and clear the drain pan." },
  { icon: <CalendarCheck className="w-6 h-6" />, title: "Full System Report", desc: "You get a written summary of your system's condition and any recommended repairs." },
];

const BEST_TIMES = [
  { season: "Spring", icon: "🌸", desc: "Best time for AC tune-up — before summer heat arrives and demand spikes." },
  { season: "Fall", icon: "🍂", desc: "Perfect for heating system check — before the first cold night catches you off guard." },
  { season: "Anytime", icon: "📅", desc: "Just moved in? Bought a new property? A tune-up tells you exactly what you have." },
];

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="HVAC Maintenance & Tune-Up in East Bay CA | Urban City Mechanical"
        description="Annual HVAC tune-up and seasonal maintenance in Pittsburg, Antioch, Concord, Walnut Creek & East Bay CA. Prevent breakdowns, lower energy bills, extend system life. Call (510) 619-6586. CA Lic #1093253."
        canonical="https://www.urbancityairca.com/maintenance"
        schema={MAINTENANCE_SCHEMA}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <CalendarCheck className="w-5 h-5 text-yellow-400" />
                <span className="text-green-200 text-sm font-medium uppercase tracking-wide">Pittsburg · Antioch · East Bay</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                HVAC Maintenance<br />
                <span className="text-yellow-400">& Seasonal Tune-Up</span>
              </h1>
              <p className="text-green-100 text-lg mb-6">
                The best time to fix your HVAC is before it breaks. Urban City Mechanical's tune-up service keeps your system running efficiently all year, lowers your energy bill, and prevents the expensive emergency calls.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-green-100">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="tel:5106196586"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xl px-6 py-4 rounded-xl transition-colors"
                data-testid="link-call-maintenance"
              >
                <Phone className="w-5 h-5" />
                (510) 619-6586 — Schedule Now
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <LeadForm serviceType="maintenance" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-4">
            What's Included in Every Tune-Up
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Every maintenance visit is a full system inspection — not a quick look-over. We check everything so you're not surprised later.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {TUNE_UP_INCLUDES.map((item) => (
              <div key={item.title} className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-green-700 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Best Times */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mb-8">
            <h3 className="font-bold text-gray-900 text-xl mb-6 text-center">When Should You Schedule a Tune-Up?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {BEST_TIMES.map((t) => (
                <div key={t.season} className="text-center">
                  <div className="text-4xl mb-2">{t.icon}</div>
                  <div className="font-bold text-gray-900 mb-1">{t.season}</div>
                  <p className="text-gray-600 text-sm">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why it matters */}
          <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-xl mb-4 text-center">The Cost of Skipping Maintenance</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { value: "15-20%", label: "Higher energy bills from dirty coils and filters" },
                { value: "50%", label: "Of breakdowns are preventable with annual maintenance" },
                { value: "5–10 yrs", label: "Added equipment life with regular tune-ups" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-display font-bold text-yellow-400 mb-2">{stat.value}</div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* City Grid */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              HVAC Maintenance Service Area — East Bay & Contra Costa County
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
          {" "}· HVAC Maintenance in Pittsburg, Antioch & East Bay CA
        </p>
      </footer>
    </div>
  );
}
