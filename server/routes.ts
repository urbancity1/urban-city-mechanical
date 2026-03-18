import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { sendNewLeadNotification, sendCustomerConfirmation } from "./twilio";
import { sendNewLeadEmail, sendSmsViaVerizonGateway } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.leads.list.path, async (req, res) => {
    const filters = {
      source: req.query.source as string | undefined,
      status: req.query.status as string | undefined,
      zipCode: req.query.zipCode as string | undefined,
    };
    const leads = await storage.getLeads(filters);
    res.json(leads);
  });

  app.get(api.leads.stats.path, async (req, res) => {
    const stats = await storage.getLeadStats();
    res.json(stats);
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      
      sendSmsViaVerizonGateway({
        name: lead.name,
        phone: lead.phone,
        serviceType: lead.serviceType,
        zipCode: lead.zipCode,
      }).catch(console.error);

      sendNewLeadEmail({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        serviceType: lead.serviceType,
        description: lead.description,
        zipCode: lead.zipCode,
      }).catch(console.error);

      sendNewLeadNotification({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        serviceType: lead.serviceType,
        description: lead.description,
        zipCode: lead.zipCode || undefined
      }).catch(console.error);
      
      if (lead.phone && lead.phone.length >= 10) {
        sendCustomerConfirmation(lead.phone, lead.name).catch(console.error);
      }

      // Forward lead to HVAC Lead Flow app
      fetch("https://2b095c7a-5609-4ea3-b7b4-90cc991ba941-00-3cy1vo5pves4l.worf.replit.dev/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          serviceType: lead.serviceType,
          propertyType: lead.propertyType || "residential",
          message: lead.description,
        }),
      }).catch((err) => console.error("Lead forward failed:", err));

      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.leads.get.path, async (req, res) => {
    const lead = await storage.getLead(Number(req.params.id));
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  });

  // Generic lead update (status + jobValue)
  app.patch(api.leads.updateLead.path, async (req, res) => {
    const { status, jobValue } = req.body;
    const lead = await storage.updateLead(Number(req.params.id), { status, jobValue });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  });

  app.patch(`/api/leads/:id/notes`, async (req, res) => {
    const { notes } = req.body;
    const lead = await storage.updateLeadNotes(Number(req.params.id), notes || "");
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  });

  app.patch(api.leads.updateStatus.path, async (req, res) => {
    const { status } = req.body;
    const lead = await storage.updateLeadStatus(Number(req.params.id), status);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  });

  app.post(api.leads.analyze.path, async (req, res) => {
    const leadId = Number(req.params.id);
    const lead = await storage.getLead(leadId);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    let analysis = "Standard request.";
    const desc = lead.description.toLowerCase();
    if (desc.includes("emergency") || desc.includes("leak") || desc.includes("broken")) {
      analysis = "URGENT: Customer indicates immediate issue.";
    } else if (desc.includes("install") || desc.includes("quote")) {
      analysis = "SALES: Potential new installation opportunity.";
    } else if (desc.includes("maintenance") || desc.includes("check")) {
      analysis = "ROUTINE: Scheduled maintenance request.";
    }

    const updated = await storage.updateLeadAnalysis(leadId, analysis);
    res.json(updated);
  });

  return httpServer;
}

async function seedDatabase() {
  const leads = await storage.getLeads();
  if (leads.length === 0) {
    await storage.createLead({
      name: "John Doe",
      email: "john@example.com",
      phone: "555-0123",
      address: "123 Maple St, Pittsburg, CA",
      zipCode: "94565",
      serviceType: "Repair",
      description: "AC is making a loud rattling noise and not cooling.",
      source: "google",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "hvac-repair-bay-area"
    });
    await storage.createLead({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-0198",
      address: "456 Oak Ave, Antioch, CA",
      zipCode: "94509",
      serviceType: "Installation",
      description: "Looking for a quote to replace 15 year old unit.",
      source: "facebook",
      utmSource: "facebook",
      utmMedium: "social",
      utmCampaign: "hvac-install-summer"
    });
    await storage.createLead({
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "555-0456",
      address: "789 Pine Rd, Brentwood, CA",
      zipCode: "94513",
      serviceType: "Maintenance",
      description: "Annual maintenance check needed before summer.",
      source: "web",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null
    });
    console.log("Database seeded with sample leads!");
  }
}

seedDatabase().catch(console.error);
