import { db } from "./db";
import { leads, type InsertLead, type Lead } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface LeadFilters {
  source?: string;
  status?: string;
  zipCode?: string;
}

export interface LeadStats {
  total: number;
  totalRevenue: number;
  bySource: Record<string, number>;
  byStatus: Record<string, number>;
  byServiceType: Record<string, number>;
}

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(filters?: LeadFilters): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  updateLead(id: number, fields: { status?: string; jobValue?: number | null }): Promise<Lead | undefined>;
  updateLeadNotes(id: number, notes: string): Promise<Lead | undefined>;
  updateLeadAnalysis(id: number, analysis: string): Promise<Lead | undefined>;
  getLeadStats(): Promise<LeadStats>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    const conditions = [];
    
    if (filters?.source) {
      conditions.push(eq(leads.source, filters.source));
    }
    if (filters?.status) {
      conditions.push(eq(leads.status, filters.status));
    }
    if (filters?.zipCode) {
      conditions.push(eq(leads.zipCode, filters.zipCode));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(leads).where(and(...conditions)).orderBy(desc(leads.createdAt));
    }
    
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async updateLead(id: number, fields: { status?: string; jobValue?: number | null }): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set(fields)
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async updateLeadNotes(id: number, notes: string): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({ notes })
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async updateLeadAnalysis(id: number, analysis: string): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({ aiAnalysis: analysis })
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async getLeadStats(): Promise<LeadStats> {
    const allLeads = await db.select().from(leads);
    
    const bySource: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    const byServiceType: Record<string, number> = {};
    let totalRevenue = 0;
    
    allLeads.forEach(lead => {
      const src = lead.utmSource || lead.source || 'direct';
      bySource[src] = (bySource[src] || 0) + 1;
      
      const status = lead.status || 'new';
      byStatus[status] = (byStatus[status] || 0) + 1;
      
      const svc = lead.serviceType || 'other';
      byServiceType[svc] = (byServiceType[svc] || 0) + 1;

      if (lead.jobValue) totalRevenue += lead.jobValue;
    });
    
    return {
      total: allLeads.length,
      totalRevenue,
      bySource,
      byStatus,
      byServiceType,
    };
  }
}

export const storage = new DatabaseStorage();
