import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  zipCode: text("zip_code"),
  serviceType: text("service_type").notNull(),
  description: text("description").notNull(),
  preferredDate: text("preferred_date"),
  source: text("source").default("web"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  // Pipeline: new → called → quoted → booked → closed
  status: text("status").default("new"),
  propertyType: text("property_type"),
  timeSlot: text("time_slot"),
  jobValue: integer("job_value"),
  notes: text("notes"),
  aiAnalysis: text("ai_analysis"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  createdAt: true, 
  status: true, 
  aiAnalysis: true,
  jobValue: true,
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
