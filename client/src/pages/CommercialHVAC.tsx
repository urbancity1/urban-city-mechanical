import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, SERVICE_CITIES } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Building2, Clock, ShieldCheck, Phone, MapPin, Wrench, Thermometer, Star, CalendarCheck } from "lucide-react";

const COMMERCIAL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial HVAC Service & Repair",
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
  description: "Commercial HVAC service, repair, and maintenance for businesses, restaurants, offices, and retail throughout the East Bay. Rooftop units, packaged systems, and preventive maintenance contracts. Licensed CA HVAC contractor #1093253.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: "East Bay, CA",
  },
};

const BENEFITS = [
  "Minimize business downtime — fast response times",
  "Rooftop units, packaged systems & split systems",
  "Preventive maintenance contracts available",
  "All major commercial brands serviced",
  "Licensed CA HVAC Contractor Lic #1093253",
  "Free commercial estimates & site assessments",
];

const SERVICES = [
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Rooftop Unit (RTU) Repair",
    desc: "We service all major commercial rooftop units — Carrier, Trane, Lennox, York, and more. Fast diagnosis to keep your business running.",
  },
  {
    icon: <Thermometer className="w-8 h-8" />,
    title: "Commercial AC & Heating",
    desc: "Full repair and replacement of commercial air conditioning and heating systems for any size building — from small offices to large retail spaces.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8" />,
    title: "Preventive Maintenance Contracts",
    desc: "Scheduled seasonal tune-ups to prevent costly breakdowns. Priority scheduling and discounted rates for contract customers.",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "New Commercial Installations",
    desc: "Design and install HVAC systems for new construction, tenant improvements, or full system replacements. Properly sized for your square footage.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Emergency Commercial Repair",
    desc: "AC or heat fails during business hours? We prioritize commercial calls to minimize your downtime and lost revenue.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Air Quality & Ventilation",
    desc: "Ensure your staff and customers breathe clean air. We inspect, clean, and upgrade commercial ductwork and ventilation systems.",
  },
];

const INDUSTRIES = [
  { icon: "🍽️", label: "Restaurants & Food Service" },
  { icon: "🏢", label: "Office Buildings" },
  { icon: "🏪", label: "Retail & Shopping Centers" },
  { icon: "🏥", label: "Medical & Dental Offices" },
  { icon: "🏫", label: "Schools & Daycares" },
  { icon: "🏭", label: "Warehouses & Light Industrial" },
  { icon: "💆", label: "Salons & Spas" },
  { icon: "🏨", label: "Hotels & Hospitality" },
  { icon: "⛪", label: "Churches & Community Centers" },
  { icon: "🏋️", label: "Gyms & Fitness Centers" },
  { icon: "🚗", label: "Auto Shops & Dealerships" },
  { icon: "🏗️", label: "New Commercial Construction" },
];

export default function CommercialHVAC() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Commercial HVAC Service in East Bay & Contra Costa CA | Urban City Mechanical"
        description="Commercial HVAC repair, installation & maintenance contracts for businesses in Pittsburg, Antioch, Concord, San Jose & East Bay CA. Rooftop units, packaged systems, all brands. Call (510) 619-6586. CA Lic #1093253."
        canonical="https://www.urbancityairca.com/commercial-hvac"
        schema={COMMERCIAL_SCHEMA}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300 text-sm font-medium uppercase tracking-wide">East Bay · Contra Costa · South Bay</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                Commercial HVAC<br />
                <span className="text-yellow-400">for East Bay Businesses</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                From rooftop units to full system replacements, Urban City Mechanical keeps your business comfortable year-round. We serve restaurants, offices, retail, and more throughout Pittsburg, Antioch, Concord, San Jose, and the entire East Bay.
              </p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="tel:5106196586"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-xl px-6 py-4 rounded-xl transition-colors"
                data-testid="link-call-commercial"
              >
                <Phone className="w-5 h-5" />
                (510) 619-6586 — Call Now
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <LeadForm serviceType="commercial" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-4">
            Commercial HVAC Services — East Bay CA
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            We handle everything from emergency repairs to long-term maintenance contracts. One call covers your entire commercial HVAC needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {SERVICES.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-gray-400 transition-colors">
                <div className="text-gray-700 mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-100 mb-8">
            <h3 className="font-bold text-gray-900 text-xl mb-2 text-center">Industries We Serve</h3>
            <p className="text-gray-500 text-sm text-center mb-6">If you run a business in the East Bay, we've got your HVAC covered.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INDUSTRIES.map((ind) => (
                <div key={ind.label} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-yellow-100 shadow-sm">
                  <span className="text-xl">{ind.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why choose us */}
          <div className="bg-gray-900 rounded-2xl p-8 text-white mb-8">
            <h3 className="font-bold text-xl mb-6 text-center">Why East Bay Businesses Choose Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />, title: "Fast Response", desc: "We prioritize commercial calls to minimize your business downtime." },
                { icon: <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />, title: "5.0 Stars · 109 Reviews", desc: "Trusted by homeowners and business owners throughout the East Bay." },
                { icon: <ShieldCheck className="w-8 h-8 text-yellow-400 mx-auto mb-2" />, title: "Licensed & Insured", desc: "CA Lic #1093253. Fully insured for commercial property work." },
              ].map((item) => (
                <div key={item.title}>
                  {item.icon}
                  <p className="font-bold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* City coverage */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Commercial HVAC Service Area — East Bay, Contra Costa & South Bay
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
          {" "}· Commercial HVAC Service in East Bay CA
        </p>
      </footer>
    </div>
  );
}
