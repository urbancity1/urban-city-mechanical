import { z } from 'zod';
import { insertLeadSchema, leads } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    list: {
      method: 'GET' as const,
      path: '/api/leads',
      input: z.object({
        source: z.string().optional(),
        status: z.string().optional(),
        zipCode: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof leads.$inferSelect>()),
      },
    },
    stats: {
      method: 'GET' as const,
      path: '/api/leads/stats',
      responses: {
        200: z.object({
          total: z.number(),
          totalRevenue: z.number(),
          bySource: z.record(z.string(), z.number()),
          byStatus: z.record(z.string(), z.number()),
          byServiceType: z.record(z.string(), z.number()),
        }),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/leads',
      input: insertLeadSchema,
      responses: {
        201: z.custom<typeof leads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/leads/:id',
      responses: {
        200: z.custom<typeof leads.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/leads/:id/status',
      input: z.object({ status: z.string() }),
      responses: {
        200: z.custom<typeof leads.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    updateLead: {
      method: 'PATCH' as const,
      path: '/api/leads/:id',
      input: z.object({
        status: z.string().optional(),
        jobValue: z.number().nullable().optional(),
      }),
      responses: {
        200: z.custom<typeof leads.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    analyze: {
      method: 'POST' as const,
      path: '/api/leads/:id/analyze',
      responses: {
        200: z.custom<typeof leads.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type LeadInput = z.infer<typeof api.leads.create.input>;
export type LeadResponse = z.infer<typeof api.leads.create.responses[201]>;
export type LeadStats = z.infer<typeof api.leads.stats.responses[200]>;
