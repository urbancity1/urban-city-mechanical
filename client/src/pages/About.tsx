import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Star, ShieldCheck, Clock, Award, MapPin, Heart } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Urban City Mechanical Heating & Air Conditioning service",
  description: "Family-owned HVAC contractor serving the East Bay, Contra Costa County, and South Bay. Founded by Raushaun, a licensed California HVAC technician with years of experience in residential and commercial heating and cooling.",
  telephone: "+15106196586",
  foundingLocation: "Pittsburg, CA",
  url: "https://www.urbancityairca.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pittsburg",
    addressRegion: "CA",
    postalCode: "94565",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "109",
  },
};

const VALUES = [
  { icon: <Clock className="w-6 h-6 text-blue-600" />, title: "Same-Day Service", desc: "When your AC or heater fails, you can't wait. We prioritize same-day appointments so your family stays comfortable." },
  { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "Honest Pricing", desc: "We give you a flat-rate price before we start. No surprise charges, no upselling — just fair, transparent work." },
  { icon: <Heart className="w-6 h-6 text-blue-600" />, title: "Family-Owned", desc: "This is our livelihood and our reputation. We treat every job like it's in our own home — because our name is on every invoice." },
  { icon: <Award className="w-6 h-6 text-blue-600" />, title: "Licensed & Insured", desc: "CA Contractor License #1093253. Fully insured for residential and commercial work throughout California." },
];

const STATS = [
  { value: "109+", label: "5-Star Reviews" },
  { value: "5.0", label: "Google Rating" },
  { value: "46", label: "Cities Served" },
  { value: "24/7", label: "Emergency Service" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About Urban City Mechanical | HVAC Contractor Pittsburg CA | CA Lic #1093253"
        description="Meet Raushaun, founder of Urban City Mechanical. Family-owned HVAC contractor serving Pittsburg, Antioch, Concord & the East Bay. Licensed CA Lic #1093253. 5.0 stars · 109 reviews."
        canonical="https://www.urbancityairca.com/about"
        schema={ABOUT_SCHEMA}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 text-blue-200 text-sm">5.0 · 109 Google Reviews</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              About Urban City <span className="text-yellow-400">Mechanical</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
              A family-owned HVAC company built on one principle — treat every customer the way we'd want our own family treated.
            </p>
            <a
              href="tel:5106196586"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-6 py-4 rounded-xl transition-colors"
              data-testid="link-call-about"
            >
              <Phone className="w-5 h-5" />
              (510) 619-6586 — Call Anytime
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-8 text-center">
                <div className="text-3xl font-display font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                Meet Raushaun — <span className="text-blue-600">Your Local HVAC Expert</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Urban City Mechanical was founded by Raushaun (Shaun) — a licensed California HVAC technician who built his reputation one job at a time throughout the East Bay and Contra Costa County.
                </p>
                <p>
                  Shaun started in the trades knowing that the industry needed something different: a contractor who shows up on time, explains the problem clearly, and charges a fair price without cutting corners. That's the standard he holds himself to on every single call.
                </p>
                <p>
                  From mini-split installations in Pittsburg to emergency furnace repairs in Concord, Shaun has handled it all — and the 109 five-star Google reviews speak for themselves. His customers keep calling him back because they trust him.
                </p>
                <p>
                  Whether it's a residential home in Antioch or a restaurant in San Jose, every job gets the same level of care and professionalism.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "CA Lic #1093253",
                  "Fully Insured",
                  "All Brands Serviced",
                  "Residential & Commercial",
                  "Same-Day Available",
                ].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-blue-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">What Customers Say About Shaun</h3>
                <div className="space-y-5">
                  {[
                    {
                      text: "I'm so glad I can call on Raushaun and know that he'll always come through for me. You won't be disappointed with his services.",
                      author: "Alecia T.", location: "Pittsburg, CA"
                    },
                    {
                      text: "One of the best experiences I have had with HVAC repair. Shaun came at the last minute and the repair time was half of what I expected.",
                      author: "James K.", location: "Antioch, CA"
                    },
                    {
                      text: "Urban City Mechanical diagnosed and fixed it the same day. The first HVAC company we called couldn't figure it out. Incredible service.",
                      author: "Patricia M.", location: "Concord, CA"
                    },
                  ].map((review) => (
                    <div key={review.author} className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-blue-100 text-sm italic mb-2">"{review.text}"</p>
                      <p className="text-yellow-400 text-xs font-semibold">{review.author} · {review.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">How We Do Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Serving the East Bay & Beyond</h2>
          <p className="text-gray-500 mb-6">Based in Pittsburg, CA — we cover a 50-mile radius including Contra Costa, Alameda, Solano, Santa Clara, and San Joaquin counties.</p>
          <a
            href="tel:5106196586"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            data-testid="link-call-about-bottom"
          >
            <Phone className="w-4 h-4" />
            Call (510) 619-6586
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-display font-bold text-center text-gray-900 mb-8">Schedule a Service Call</h2>
          <LeadForm />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Urban City Mechanical · CA Lic #1093253 ·{" "}
          <a href="tel:5106196586" className="text-green-400 hover:underline">(510) 619-6586</a>
          {" "}· HVAC Contractor — Pittsburg, CA
        </p>
      </footer>
    </div>
  );
}
