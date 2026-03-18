import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type LeadInput, type LeadResponse, type LeadStats } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

interface LeadFilters {
  source?: string;
  status?: string;
  zipCode?: string;
}

export function useLeads(filters?: LeadFilters) {
  const queryString = filters 
    ? '?' + new URLSearchParams(
        Object.entries(filters).filter(([_, v]) => v) as [string, string][]
      ).toString()
    : '';
    
  return useQuery({
    queryKey: [api.leads.list.path, filters],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path + queryString, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch leads");
      return api.leads.list.responses[200].parse(await res.json());
    },
  });
}

export function useLeadStats() {
  return useQuery({
    queryKey: [api.leads.stats.path],
    queryFn: async () => {
      const res = await fetch(api.leads.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.leads.stats.responses[200].parse(await res.json());
    },
  });
}

export function useLead(id: number) {
  return useQuery({
    queryKey: [api.leads.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      const url = buildUrl(api.leads.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lead");
      return api.leads.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LeadInput) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.leads.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit request");
      }
      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.leads.stats.path] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const url = buildUrl(api.leads.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.leads.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update status");
      return api.leads.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.leads.stats.path] });
      toast({ title: "Status Updated" });
    },
    onError: () => {
      toast({ title: "Update Failed", variant: "destructive" });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, jobValue }: { id: number; status?: string; jobValue?: number | null }) => {
      const url = buildUrl(api.leads.updateLead.path, { id });
      const res = await fetch(url, {
        method: api.leads.updateLead.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, jobValue }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update lead");
      return api.leads.updateLead.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.leads.stats.path] });
    },
  });
}

export function useUpdateLeadNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, notes }: { id: number; notes: string }) => {
      const res = await fetch(`/api/leads/${id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save notes");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}

export function useAnalyzeLead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.leads.analyze.path, { id });
      const res = await fetch(url, {
        method: api.leads.analyze.method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Analysis failed");
      return api.leads.analyze.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
      toast({ title: "AI Analysis Complete" });
    },
    onError: () => {
      toast({ title: "Analysis Failed", variant: "destructive" });
    },
  });
}
