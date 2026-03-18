import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import type { LeadInput } from "@shared/routes";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getUTMParams, getSourceFromUTM, fireConversionEvent } from "@/lib/utm";

const SERVICE_ZIPS = new Set([
  '94565','94509','94531','94513','94561','94517','94510','94553','94523',
  '94518','94519','94520','94521','94522','94524','94595','94596','94597','94598',
  '94506','94526','94582','94583','94568','94566','94588','94550','94551',
  '94547','94564','94569','94572','94530','94548','94549',
  '94801','94802','94803','94804','94805','94806','94807','94808',
  '94589','94590','94591','94592','94533','94534','94585','94571',
  '94546','94577','94578','94579','94541','94542','94543','94544','94545',
  '94536','94537','94538','94539','94555','94587','94560',
  '94601','94602','94603','94605','94606','94607','94608','94609',
  '94610','94611','94612','94613','94618','94619','94621',
  '94702','94703','94704','94705','94706','94707','94708','94709','94710',
  '95201','95202','95203','95204','95205','95206','95207','95208','95209','95210','95212',
  '95376','95377','95686','95687','95688',
]);

interface LeadFormProps {
  serviceType?: string;
}

export function LeadForm({ serviceType }: LeadFormProps = {}) {
  const { mutate, isPending } = useCreateLead();
  const [zipStatus, setZipStatus] = useState<'valid' | 'invalid' | 'empty'>('empty');
  const [, setLocation] = useLocation();
  
  const form = useForm<LeadInput>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      serviceType: serviceType || "repair",
      propertyType: "residential",
      description: "",
      preferredDate: "",
      source: "web",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    }
  });

  useEffect(() => {
    const utm = getUTMParams();
    const source = getSourceFromUTM(utm);
    form.setValue('source', source);
    form.setValue('utmSource', utm.utmSource);
    form.setValue('utmMedium', utm.utmMedium);
    form.setValue('utmCampaign', utm.utmCampaign);
    form.setValue('utmContent', utm.utmContent);
    form.setValue('utmTerm', utm.utmTerm);
  }, [form]);

  const onSubmit = (data: LeadInput) => {
    mutate(data, {
      onSuccess: () => {
        fireConversionEvent({ email: data.email, value: 100 });
        setLocation('/thank-you');
      }
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
      id="quote"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold text-gray-900">Request Service</h3>
        <p className="text-gray-500 mt-1">Get a free quote or schedule a repair today.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              {...form.register("name")}
              className="input-field"
              placeholder="John Doe"
              data-testid="input-name"
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              {...form.register("phone")}
              className="input-field"
              placeholder="(555) 123-4567"
              data-testid="input-phone"
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              {...form.register("email")}
              type="email"
              className="input-field"
              placeholder="john@example.com"
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Zip Code</label>
            <input
              {...form.register("zipCode", {
                onChange: (e) => {
                  const val = e.target.value.trim();
                  if (val.length === 5) {
                    setZipStatus(SERVICE_ZIPS.has(val) ? 'valid' : 'invalid');
                  } else {
                    setZipStatus('empty');
                  }
                }
              })}
              className="input-field"
              placeholder="94565"
              maxLength={5}
              data-testid="input-zipcode"
            />
            {zipStatus === 'valid' && (
              <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> We service your area!
              </p>
            )}
            {zipStatus === 'invalid' && (
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <XCircle className="w-3.5 h-3.5" /> Outside our area. Call us: (510) 619-6586
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Property Address</label>
          <input
            {...form.register("address")}
            className="input-field"
            placeholder="123 Main St, City, State"
            data-testid="input-address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Property Type</label>
            <select
              {...form.register("propertyType")}
              className="input-field cursor-pointer"
              data-testid="select-property-type"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Service Type</label>
            <select
              {...form.register("serviceType")}
              className="input-field cursor-pointer"
              data-testid="select-service-type"
            >
              <option value="repair">Emergency Repair</option>
              <option value="install">New Installation</option>
              <option value="maintenance">Routine Maintenance</option>
              <option value="mini-split">Mini-Split Install</option>
              <option value="commercial">Commercial HVAC</option>
              <option value="thermostat">Smart Thermostat</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              Preferred Date (optional)
            </label>
            <input
              {...form.register("preferredDate")}
              type="date"
              min={today}
              className="input-field cursor-pointer"
              data-testid="input-preferred-date"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Preferred Time</label>
            <select
              {...form.register("timeSlot")}
              className="input-field cursor-pointer"
              data-testid="select-time-slot"
            >
              <option value="">Any time</option>
              <option value="morning">Morning (8am – 12pm)</option>
              <option value="afternoon">Afternoon (12pm – 4pm)</option>
              <option value="evening">Evening (4pm – 7pm)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Issue Description</label>
          <textarea
            {...form.register("description")}
            className="input-field min-h-[110px] resize-none"
            placeholder="Please describe the issue or what you need..."
            data-testid="input-description"
          />
          {form.formState.errors.description && (
            <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
          data-testid="button-submit-lead"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get My Free Quote
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          We'll call you within 5 minutes. No spam, ever.
        </p>
      </form>
    </motion.div>
  );
}
