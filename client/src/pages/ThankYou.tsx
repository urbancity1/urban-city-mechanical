import { motion } from "framer-motion";
import { CheckCircle2, Phone, Clock, Home } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
          We Got Your Request!
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          A technician from Urban City Mechanical will call you within:
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8" data-testid="countdown-timer">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <span className="text-4xl font-bold text-primary font-display tabular-nums">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">5-minute response guarantee</p>
        </div>

        <p className="text-gray-600 mb-6">
          While you wait, save our number so you recognize the call:
        </p>

        <a
          href="tel:5106196586"
          data-testid="link-call-now"
          className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-8 py-4 rounded-xl transition-colors mb-6"
        >
          <Phone className="w-6 h-6" />
          (510) 619-6586
        </a>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 text-sm transition-colors"
          data-testid="link-back-home"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
