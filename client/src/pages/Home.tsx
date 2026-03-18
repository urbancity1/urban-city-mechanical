import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { SEO, LOCAL_BUSINESS_SCHEMA } from "@/components/SEO";
import { motion } from "framer-motion";
import { CheckCircle2, ThermometerSun, Wind, PenTool, ShieldCheck, Clock, Wrench, MapPin, Star, Quote, MessageSquare, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import beforeAC from "@assets/IMG_1185_1773468902349.jpeg";
import afterAC from "@assets/IMG_0799_1773468902350.jpeg";
import beforeMiniSplit from "@assets/IMG_2050_1773468902350.jpeg";
import afterMiniSplit from "@assets/IMG_1897_1773468902350.jpeg";
import beforeDuctwork from "@assets/IMG_1662_1773469659787.jpeg";
import afterDuctwork from "@assets/IMG_1874_1773468902350.jpeg";
import beforeThermostat from "@assets/IMG_2090_1773469659787.jpeg";
import afterThermostat from "@assets/IMG_1301_1773469659787.jpeg";
import techPhoto1 from "@assets/IMG_1898_1773468902350.jpeg";
import techPhoto2 from "@assets/IMG_1874_1773468902350.jpeg";

const GOOGLE_REVIEWS = [
  {
    name: "Cydney Chandler",
    date: "12 weeks ago",
    text: "My savior after three different techs came to my house, he swooped in fixed my heater! No runaround, no upselling, very kind, & knowledgeable. Definitely recommended!",
  },
  {
    name: "Lady Kathi Mills",
    date: "5 weeks ago",
    text: "Im so glad I can call on Raushaun and know that he'll always come through for me. You won't be disappointed with his services. Book him now and let him work his HVAC magic!!",
  },
  {
    name: "Angela Marcal",
    date: "10 weeks ago",
    text: "Rashaun was very polite & very knowledgeable and not afraid of climbing into the attic to survey the duct work. Highly recommend — great price for the work done.",
  },
  {
    name: "Ron",
    date: "11 weeks ago",
    text: "One of the best experiences I have had with HVAC repair. Shaun came at the last minute and the repair time was half of what I expected. Great price, great service.",
  },
  {
    name: "Sintu Turan",
    date: "2 weeks ago",
    text: "Shaun is great — he helped fix my exhaust fan system at my store. He's great and reliable. Will definitely be calling again for any future HVAC needs.",
  },
  {
    name: "Joseph Karr",
    date: "6 days ago",
    text: "Our heater stopped working shortly after we moved in. The first HVAC company we reached out to couldn't figure it out. Urban City Mechanical diagnosed and fixed it the same day. Incredible service.",
  },
];

export default function Home() {
  const [slots, setSlots] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setSlots(2), 45000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="HVAC Repair & Installation in Pittsburg, Antioch & East Bay CA | Urban City Mechanical"
        description="Top-rated HVAC contractor serving Pittsburg, Antioch, Brentwood, Concord & the East Bay. AC repair, furnace service & mini-split installation. 5.0 stars · 109 reviews. Call (510) 619-6586 for same-day service. Licensed CA Lic #1093253."
        canonical="https://www.urbancityairca.com/"
        schema={LOCAL_BUSINESS_SCHEMA}
      />
      {/* Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-2.5 px-4 text-sm font-semibold sticky top-0 z-[60] flex items-center justify-center gap-2" data-testid="banner-urgency">
        <Flame className="w-4 h-4 animate-pulse" />
        Only <span className="font-black text-yellow-300 mx-1">{slots} spots</span> available this week in the East Bay — <a href="#quote" className="underline underline-offset-2 hover:text-yellow-200 ml-1">Book Now</a>
      </div>

      {/* Floating SMS Button */}
      <a
        href="sms:+15106196586?body=Hi%2C%20I%27m%20interested%20in%20an%20HVAC%20quote!"
        data-testid="button-sms-float"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg font-bold text-sm transition-all hover:scale-105"
      >
        <MessageSquare className="w-5 h-5" />
        Text Us Now
      </a>

      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Professional HVAC technician working on AC unit */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop"
            alt="HVAC Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium">Available 24/7 for Emergencies</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                Expert Climate Control <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  For Your Home
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Trusted HVAC professionals dedicated to your comfort. We handle repairs, installations, and maintenance with speed and precision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#quote" className="btn-accent px-8 py-4 rounded-xl font-bold text-lg text-center">
                  Get Free Estimate
                </a>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-blue-900 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">500+ Happy Clients</p>
                    <p className="text-xs text-blue-200">5.0 Star Rating ★★★★★</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 w-full max-w-xl">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Complete HVAC Solutions</h2>
            <p className="text-lg text-gray-600">We provide a full range of heating and cooling services to keep your home comfortable year-round.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/ac-repair" className="block group">
              <ServiceCard 
                icon={<Wind className="w-8 h-8 text-primary" />}
                title="AC Repair & Service"
                desc="Fast diagnostics and repairs for all major brands. Same-day service available."
              />
            </a>
            <a href="/furnace-repair" className="block group">
              <ServiceCard 
                icon={<Flame className="w-8 h-8 text-primary" />}
                title="Furnace Repair"
                desc="Keep warm during winter with expert furnace repair, tune-ups, and replacement."
              />
            </a>
            <a href="/mini-split" className="block group">
              <ServiceCard 
                icon={<ThermometerSun className="w-8 h-8 text-primary" />}
                title="Mini-Split Installation"
                desc="Ductless system installation and service for homes and offices without ductwork."
              />
            </a>
            <a href="/maintenance" className="block group">
              <ServiceCard 
                icon={<Wrench className="w-8 h-8 text-primary" />}
                title="HVAC Maintenance"
                desc="Annual tune-ups that prevent breakdowns, lower energy bills, and extend system life."
              />
            </a>
            <a href="/commercial-hvac" className="block group">
              <ServiceCard 
                icon={<ShieldCheck className="w-8 h-8 text-primary" />}
                title="Commercial HVAC"
                desc="Full-service commercial heating and cooling for offices, retail, restaurants, and more."
              />
            </a>
            <a href="/about" className="block group">
              <ServiceCard 
                icon={<CheckCircle2 className="w-8 h-8 text-primary" />}
                title="About Urban City"
                desc="Family-owned, licensed, and trusted with 109 five-star reviews across the East Bay."
              />
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
              <FeatureBox icon={<Clock />} title="24/7 Service" />
              <FeatureBox icon={<ShieldCheck />} title="Licensed & Insured" />
              <FeatureBox icon={<PenTool />} title="Upfront Pricing" />
              <FeatureBox icon={<CheckCircle2 />} title="Satisfaction Guarantee" />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Why Choose <span className="text-primary">Urban City Mechanical</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We understand that inviting a technician into your home requires trust. That's why every member of our team is background-checked, drug-tested, and rigorously trained.
              </p>
              <ul className="space-y-4 mb-8">
                {['Local family-owned business', '100% money-back guarantee', 'Same-day service available'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#quote" className="text-primary font-bold text-lg hover:underline decoration-2 underline-offset-4">
                Schedule your service now &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Quality Work</h2>
            <p className="text-lg text-gray-600">Real jobs, real results — see the Urban City Mechanical difference.</p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            <BeforeAfterPair
              beforeImg={beforeAC}
              afterImg={afterAC}
              beforeLabel="Old Rusty AC Unit"
              afterLabel="New Bryant High-Efficiency System"
              jobTitle="AC Replacement — Contra Costa County"
            />
            <BeforeAfterPair
              beforeImg={beforeDuctwork}
              afterImg={afterDuctwork}
              beforeLabel="Airtemp Furnace — Old System Before Upgrade"
              afterLabel="Upgrade Complete — New Ductwork & System Running"
              jobTitle="Ductwork Replacement & Furnace Upgrade"
            />
            <BeforeAfterPair
              beforeImg={beforeMiniSplit}
              afterImg={afterMiniSplit}
              beforeLabel="Mini-Split Diagnosis & Repair"
              afterLabel="New Pioneer Mini-Split Installed"
              jobTitle="Mini-Split Installation"
            />
            <BeforeAfterPair
              beforeImg={beforeThermostat}
              afterImg={afterThermostat}
              beforeLabel="Old Honeywell — Dead Screen, No WiFi"
              afterLabel="New Honeywell Home ProSeries Smart Thermostat"
              jobTitle="Smart Thermostat Upgrade"
            />
          </div>

          <div className="text-center mt-12">
            <a href="#quote" className="btn-accent px-8 py-4 rounded-xl font-bold text-lg inline-block" data-testid="link-get-quote-before-after">
              Get Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-24 bg-blue-900 border-t border-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Your Local HVAC Experts</h2>
            <p className="text-lg text-blue-200">Licensed, insured, and dedicated to keeping you comfortable year-round.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={techPhoto1} alt="Urban City Mechanical technician" className="w-full h-80 object-cover object-top" />
              <div className="bg-white p-4">
                <p className="font-bold text-gray-900">Mini-Split Installation Complete</p>
                <p className="text-sm text-gray-500">Pioneer system — customer satisfied ✓</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img src={techPhoto2} alt="Urban City Mechanical technician on the job" className="w-full h-80 object-cover object-top" />
              <div className="bg-white p-4">
                <p className="font-bold text-gray-900">Furnace & Ductwork Service</p>
                <p className="text-sm text-gray-500">Airtemp system diagnostics & repair ✓</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real reviews from homeowners in the Bay Area</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah M."
              location="Pittsburg, CA"
              rating={5}
              text="Urban City Mechanical saved us during a heat wave! They came out the same day and fixed our AC. Professional, friendly, and fair pricing."
            />
            <TestimonialCard 
              name="Michael T."
              location="Antioch, CA"
              rating={5}
              text="Best HVAC company I've ever worked with. They installed a new furnace and the whole process was seamless. Highly recommend!"
            />
            <TestimonialCard 
              name="Jennifer L."
              location="Concord, CA"
              rating={5}
              text="Quick response, honest technicians, and they cleaned up after themselves. Will definitely use them again for our annual maintenance."
            />
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-24 bg-primary/5 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Proudly Serving the <span className="text-primary">East Bay Area</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We provide heating and cooling services within a 50-mile radius of Pittsburg, CA (94565). Our service area includes:
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Pittsburg', 'Antioch', 'Concord', 'Walnut Creek',
                  'Brentwood', 'Oakley', 'Martinez', 'Pleasant Hill',
                  'Bay Point', 'Clayton', 'Danville', 'San Ramon'
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
              
              <a href="#quote" className="btn-primary px-8 py-4 rounded-xl font-bold inline-block" data-testid="link-check-service-area">
                Check If We Service Your Area
              </a>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
              <div className="rounded-xl overflow-hidden" style={{ height: '340px' }}>
                <iframe
                  title="Urban City Mechanical Service Area"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d161484.5!2d-121.8847!3d37.9651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                />
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-green-800 font-medium text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  50-mile radius from Pittsburg, CA 94565 — free service call estimates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900">5.0 Stars on Google</h2>
            <p className="text-gray-500 mt-2">109 reviews · Trusted by East Bay homeowners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm"
                data-testid={`card-review-${review.name.split(' ')[0].toLowerCase()}`}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.date} · Google Review</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=Urban+City+Mechanical+Heating+and+Cooling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 px-6 py-3 rounded-xl font-medium text-sm transition-colors"
              data-testid="link-google-reviews"
            >
              <Star className="w-4 h-4" />
              See All Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* Service Pages Links */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-display font-bold text-center text-gray-900 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/ac-repair', label: 'AC Repair & Replacement', color: 'bg-blue-600', desc: 'Same-day cooling repairs' },
              { href: '/furnace-repair', label: 'Furnace & Heating Repair', color: 'bg-orange-600', desc: 'Emergency heat service' },
              { href: '/mini-split', label: 'Mini-Split Installation', color: 'bg-teal-600', desc: 'Ductless heating & cooling' },
              { href: '/commercial-hvac', label: 'Commercial HVAC', color: 'bg-gray-800', desc: 'Businesses, restaurants & offices' },
            ].map(s => (
              <a
                key={s.href}
                href={s.href}
                data-testid={`link-service-${s.href.replace('/', '')}`}
                className={`${s.color} text-white rounded-2xl p-6 hover:opacity-90 transition-opacity block`}
              >
                <div className="font-bold text-lg mb-1">{s.label}</div>
                <div className="text-white/80 text-sm">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-1">Urban City <span className="text-primary">Mechanical</span></h3>
              <p className="text-gray-400 text-sm mb-1">Heating and Cooling Services</p>
              <p className="text-gray-500 text-xs">CA HVAC Contractor License: <span className="text-gray-400 font-medium">#1093253</span></p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <a href="tel:5106196586" className="text-green-400 font-bold text-lg hover:text-green-300 transition-colors">
                📞 (510) 619-6586
              </a>
              <a href="sms:+15106196586?body=Hi%2C%20I%27m%20interested%20in%20an%20HVAC%20quote!" className="text-gray-400 text-sm hover:text-white transition-colors">
                💬 Text us anytime
              </a>
              <p className="text-sm text-gray-500 mt-2">&copy; {new Date().getFullYear()} Urban City Mechanical. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureBox({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:border-primary/20 transition-colors">
      <div className="w-10 h-10 text-primary mb-3">
        {icon}
      </div>
      <span className="font-semibold text-gray-900">{title}</span>
    </div>
  );
}

function BeforeAfterPair({ beforeImg, afterImg, beforeLabel, afterLabel, jobTitle }: {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  jobTitle: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">{jobTitle}</h3>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="relative">
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Before</div>
          <img src={beforeImg} alt={beforeLabel} className="w-full h-72 object-cover" />
          <div className="px-4 py-3 bg-red-50 border-t border-red-100">
            <p className="text-sm font-medium text-red-700">{beforeLabel}</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">After</div>
          <img src={afterImg} alt={afterLabel} className="w-full h-72 object-cover" />
          <div className="px-4 py-3 bg-green-50 border-t border-green-100">
            <p className="text-sm font-medium text-green-700">{afterLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ name, location, rating, text }: { name: string; location: string; rating: number; text: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      <p className="text-gray-600 leading-relaxed mb-6">{text}</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-lg">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </motion.div>
  );
}
