import { useAuth } from "@/hooks/use-auth";
import { useLeads, useLeadStats, useUpdateLead, useAnalyzeLead, useUpdateLeadNotes } from "@/hooks/use-leads";
import { Navigation } from "@/components/Navigation";
import { TrackingSetupInstructions } from "@/components/TrackingPixels";
import { Loader2, BrainCircuit, Phone, AlertCircle, TrendingUp, Filter, MapPin, DollarSign, CheckCheck, PhoneCall, FileText, CalendarCheck, Star, Search, ClipboardList, BarChart2, Zap } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { Lead } from "@shared/schema";

const PIPELINE_STAGES = [
  { key: 'new',    label: 'New',    color: 'bg-blue-500',   text: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200',   icon: AlertCircle },
  { key: 'called', label: 'Called', color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: PhoneCall },
  { key: 'quoted', label: 'Quoted', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: FileText },
  { key: 'booked', label: 'Booked', color: 'bg-purple-500', text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', icon: CalendarCheck },
  { key: 'closed', label: 'Closed', color: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  icon: CheckCheck },
];

const SOURCE_COLORS: Record<string, string> = {
  google: '#3b82f6',
  facebook: '#6366f1',
  instagram: '#ec4899',
  web: '#6b7280',
  direct: '#22c55e',
};

const SOURCE_LABELS: Record<string, string> = {
  google: 'Google Ads',
  facebook: 'Facebook',
  instagram: 'Instagram',
  web: 'Website',
  direct: 'Direct',
};

function calcQualityScore(lead: Lead): number {
  let score = 40;
  if (lead.phone) score += 10;
  if (lead.zipCode) score += 10;
  if (lead.preferredDate) score += 15;
  if (lead.description && lead.description.length > 30) score += 10;
  if (lead.description && lead.description.length > 80) score += 5;
  if (lead.serviceType === 'repair' || lead.serviceType === 'commercial') score += 10;
  if (lead.utmSource) score += 5;
  if (lead.status && lead.status !== 'new') score += 5;
  return Math.min(score, 100);
}

function QualityBadge({ score }: { score: number }) {
  const color = score >= 75
    ? 'bg-green-100 text-green-700 border-green-200'
    : score >= 55
    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
    : 'bg-gray-100 text-gray-500 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>
      <Star className="w-3 h-3" />
      {score}
    </span>
  );
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [filters, setFilters] = useState<{ source?: string; status?: string; zipCode?: string }>({});
  const [showHighQuality, setShowHighQuality] = useState(false);
  const { data: leads, isLoading: leadsLoading } = useLeads(filters);
  const { data: allLeads } = useLeads({});
  const { data: stats, isLoading: statsLoading } = useLeadStats();
  const updateLead = useUpdateLead();
  const analyzeLead = useAnalyzeLead();
  const updateNotes = useUpdateLeadNotes();
  const [editingValue, setEditingValue] = useState<Record<number, string>>({});
  const [editingNotes, setEditingNotes] = useState<Record<number, string>>({});

  if (authLoading || leadsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }

  const totalLeads = stats?.total || 0;
  const booked = stats?.byStatus?.booked || 0;
  const closed = stats?.byStatus?.closed || 0;
  const closeRate = totalLeads > 0 ? Math.round(closed / totalLeads * 100) : 0;
  const totalRevenue = stats?.totalRevenue || 0;

  const today = new Date().toDateString();
  const todayLeads = allLeads?.filter(l => l.createdAt && new Date(l.createdAt).toDateString() === today).length || 0;

  const conversionRate = totalLeads > 0 ? Math.round((booked + closed) / totalLeads * 100) : 0;

  const scoredLeads = allLeads?.map(l => ({ ...l, qualityScore: calcQualityScore(l) })) || [];
  const avgQuality = scoredLeads.length > 0
    ? Math.round(scoredLeads.reduce((sum, l) => sum + l.qualityScore, 0) / scoredLeads.length)
    : 0;

  const highQualityLeads = scoredLeads.filter(l => l.qualityScore >= 75);

  const displayLeads = leads?.map(l => ({ ...l, qualityScore: calcQualityScore(l) })) || [];
  const filteredDisplay = showHighQuality ? displayLeads.filter(l => l.qualityScore >= 75) : displayLeads;

  const sourceChartData = stats?.bySource
    ? Object.entries(stats.bySource).map(([source, count]) => ({
        name: SOURCE_LABELS[source] || source,
        leads: count,
        key: source,
      }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Lead Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.firstName || 'Admin'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: <Search className="w-5 h-5" />,
              label: 'Find Leads',
              desc: 'Permit search',
              color: 'bg-blue-600',
              onClick: () => window.open('https://app.shovels.ai', '_blank'),
            },
            {
              icon: <ClipboardList className="w-5 h-5" />,
              label: 'Permits',
              desc: 'County portal',
              color: 'bg-gray-700',
              onClick: () => window.open('https://epermits.cccounty.us/citizenaccess/', '_blank'),
            },
            {
              icon: <PhoneCall className="w-5 h-5" />,
              label: 'Call Back',
              desc: `${stats?.byStatus?.new || 0} need follow-up`,
              color: 'bg-orange-500',
              onClick: () => setFilters(f => ({ ...f, status: 'new' })),
            },
            {
              icon: <BarChart2 className="w-5 h-5" />,
              label: 'Analytics',
              desc: `${totalLeads} total leads`,
              color: 'bg-purple-600',
              onClick: () => document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth' }),
            },
          ].map((action) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={action.onClick}
              className={`${action.color} text-white rounded-2xl p-4 text-left hover:opacity-90 transition-opacity shadow-sm`}
              data-testid={`button-quickaction-${action.label.toLowerCase().replace(' ', '-')}`}
            >
              <div className="mb-2">{action.icon}</div>
              <div className="font-bold text-sm">{action.label}</div>
              <div className="text-white/70 text-xs">{action.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard title="Total Leads" value={totalLeads} icon={<AlertCircle className="w-5 h-5" />} color="bg-blue-500" />
          <StatCard title="Today's Leads" value={todayLeads} icon={<Zap className="w-5 h-5" />} color="bg-cyan-500" />
          <StatCard title="Conversion Rate" value={`${conversionRate}%`} icon={<TrendingUp className="w-5 h-5" />} color="bg-orange-500" />
          <StatCard title="Avg Lead Quality" value={avgQuality} icon={<Star className="w-5 h-5" />} color="bg-yellow-500" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Booked Jobs" value={booked} icon={<CalendarCheck className="w-5 h-5" />} color="bg-purple-500" />
          <StatCard title="Close Rate" value={`${closeRate}%`} icon={<CheckCheck className="w-5 h-5" />} color="bg-green-500" />
          <StatCard
            title="Total Revenue"
            value={totalRevenue > 0 ? `$${totalRevenue.toLocaleString()}` : '$0'}
            icon={<DollarSign className="w-5 h-5" />}
            color="bg-green-500"
          />
          <StatCard title="High-Quality Leads" value={highQualityLeads.length} icon={<Star className="w-5 h-5" />} color="bg-amber-500" />
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {PIPELINE_STAGES.map((stage) => {
            const count = stats?.byStatus?.[stage.key] || 0;
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${stage.bg} border ${stage.border} rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow ${filters.status === stage.key ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                onClick={() => setFilters(f => ({ ...f, status: f.status === stage.key ? undefined : stage.key }))}
              >
                <Icon className={`w-5 h-5 mx-auto mb-2 ${stage.text}`} />
                <div className={`text-2xl font-bold ${stage.text}`}>{count}</div>
                <div className={`text-xs font-medium mt-1 ${stage.text}`}>{stage.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* High-Quality Leads spotlight */}
        {highQualityLeads.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h2 className="text-lg font-bold text-gray-900">High-Quality Leads</h2>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Score 75+
                </span>
              </div>
              <button
                onClick={() => setShowHighQuality(v => !v)}
                className="text-sm text-amber-700 font-medium hover:underline"
                data-testid="button-toggle-high-quality"
              >
                {showHighQuality ? 'Show All' : 'See All'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {highQualityLeads.slice(0, 6).map((lead) => (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm flex items-start justify-between"
                  data-testid={`card-hqlead-${lead.id}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{lead.serviceType}</p>
                    {lead.jobValue ? (
                      <p className="text-xs text-green-600 font-medium mt-1">${lead.jobValue.toLocaleString()}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-2 flex-shrink-0">
                    <QualityBadge score={lead.qualityScore} />
                    <a href={`tel:${lead.phone}`}>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" data-testid={`button-hq-call-${lead.id}`}>
                        <Phone className="w-3.5 h-3.5 text-green-600" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Row */}
        <div id="analytics-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Leads by Source</h2>
            {sourceChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sourceChartData} barCategoryGap="40%">
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => [`${v} leads`, 'Count']} />
                  <Bar dataKey="leads" radius={[6, 6, 0, 0]}>
                    {sourceChartData.map((entry) => (
                      <Cell key={entry.key} fill={SOURCE_COLORS[entry.key] || '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm">
                No leads yet. Chart will appear here once leads arrive.
              </div>
            )}
          </div>
          <TrackingSetupInstructions />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-4 items-center">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            value={filters.source || ''}
            onChange={(e) => setFilters(f => ({ ...f, source: e.target.value || undefined }))}
            data-testid="filter-source"
          >
            <option value="">All Sources</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="web">Website</option>
            <option value="direct">Direct</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
            value={filters.status || ''}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value || undefined }))}
            data-testid="filter-status"
          >
            <option value="">All Status</option>
            {PIPELINE_STAGES.map(s => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by zip"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:ring-2 focus:ring-primary/20"
              value={filters.zipCode || ''}
              onChange={(e) => setFilters(f => ({ ...f, zipCode: e.target.value || undefined }))}
              data-testid="filter-zipcode"
            />
          </div>

          <button
            onClick={() => setShowHighQuality(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${showHighQuality ? 'bg-amber-50 border-amber-300 text-amber-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            data-testid="button-filter-high-quality"
          >
            <Star className="w-3.5 h-3.5" />
            High Quality Only
          </button>

          {(filters.source || filters.status || filters.zipCode || showHighQuality) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setFilters({}); setShowHighQuality(false); }}
              data-testid="button-clear-filters"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Lead Inquiries</h2>
            <div className="text-sm text-gray-500">{filteredDisplay.length} leads</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-5 py-4">Quality</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Service / Type</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Appt. Date</th>
                  <th className="px-5 py-4">Pipeline</th>
                  <th className="px-5 py-4">Job Value</th>
                  <th className="px-5 py-4">Notes</th>
                  <th className="px-5 py-4">AI Insight</th>
                  <th className="px-5 py-4">Received</th>
                  <th className="px-5 py-4 text-right">Call</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDisplay.map((lead) => {
                  const stage = PIPELINE_STAGES.find(s => s.key === (lead.status || 'new')) || PIPELINE_STAGES[0];
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors" data-testid={`row-lead-${lead.id}`}>
                      <td className="px-5 py-4">
                        <QualityBadge score={lead.qualityScore} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                        <div className="text-xs text-gray-400">{lead.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize mb-1">
                          {lead.serviceType}
                        </span>
                        {lead.propertyType && (
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                              lead.propertyType === 'commercial' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                              lead.propertyType === 'industrial' ? 'bg-red-50 text-red-700 border border-red-100' :
                              'bg-green-50 text-green-700 border border-green-100'
                            }`}>
                              {lead.propertyType}
                            </span>
                          </div>
                        )}
                        {lead.zipCode && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3" />{lead.zipCode}
                          </div>
                        )}
                        {(lead as any).timeSlot && (
                          <div className="text-xs text-gray-400 mt-0.5 capitalize">
                            🕐 {(lead as any).timeSlot}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: SOURCE_COLORS[lead.utmSource || lead.source || 'direct'] || '#94a3b8' }}
                          />
                          <span className="text-sm text-gray-600 capitalize">
                            {SOURCE_LABELS[lead.utmSource || lead.source || 'direct'] || lead.utmSource || lead.source || 'Direct'}
                          </span>
                        </div>
                        {lead.utmCampaign && (
                          <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[110px]" title={lead.utmCampaign}>
                            {lead.utmCampaign}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {lead.preferredDate || <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          className={`text-xs font-semibold border rounded-lg px-2 py-1 cursor-pointer ${stage.text} ${stage.bg} ${stage.border}`}
                          value={lead.status || 'new'}
                          onChange={(e) => updateLead.mutate({ id: lead.id, status: e.target.value })}
                          disabled={updateLead.isPending}
                          data-testid={`select-status-${lead.id}`}
                        >
                          {PIPELINE_STAGES.map(s => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-sm">$</span>
                          <input
                            type="number"
                            placeholder="0"
                            className="w-20 text-sm border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={editingValue[lead.id] ?? (lead.jobValue !== null && lead.jobValue !== undefined ? String(lead.jobValue) : '')}
                            onChange={(e) => setEditingValue(ev => ({ ...ev, [lead.id]: e.target.value }))}
                            onBlur={(e) => {
                              const val = e.target.value === '' ? null : Number(e.target.value);
                              updateLead.mutate({ id: lead.id, jobValue: val });
                              setEditingValue(ev => { const n = { ...ev }; delete n[lead.id]; return n; });
                            }}
                            data-testid={`input-job-value-${lead.id}`}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <textarea
                          className="w-32 text-xs border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                          rows={2}
                          placeholder="Add notes..."
                          value={editingNotes[lead.id] ?? (lead.notes || '')}
                          onChange={(e) => setEditingNotes(n => ({ ...n, [lead.id]: e.target.value }))}
                          onBlur={(e) => {
                            updateNotes.mutate({ id: lead.id, notes: e.target.value });
                            setEditingNotes(n => { const next = { ...n }; delete next[lead.id]; return next; });
                          }}
                          data-testid={`textarea-notes-${lead.id}`}
                        />
                      </td>
                      <td className="px-5 py-4 max-w-[160px]">
                        {lead.aiAnalysis ? (
                          <div className="text-xs text-gray-600 bg-purple-50 p-2 rounded-lg border border-purple-100">
                            <BrainCircuit className="w-3 h-3 text-purple-500 inline mr-1" />
                            {lead.aiAnalysis}
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => analyzeLead.mutate(lead.id)}
                            disabled={analyzeLead.isPending}
                            data-testid={`button-analyze-${lead.id}`}
                          >
                            {analyzeLead.isPending
                              ? <Loader2 className="w-3 h-3 animate-spin mr-1" />
                              : <BrainCircuit className="w-3 h-3 mr-1" />
                            }
                            Analyze
                          </Button>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">
                        {lead.createdAt ? format(new Date(lead.createdAt), 'MMM d, yyyy') : '—'}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <a href={`tel:${lead.phone}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-call-${lead.id}`}>
                            <Phone className="w-4 h-4 text-gray-500" />
                          </Button>
                        </a>
                      </td>
                    </tr>
                  );
                })}

                {filteredDisplay.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                      No leads found. {filters.source || filters.status || filters.zipCode || showHighQuality ? 'Try adjusting your filters.' : 'Waiting for new submissions.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number | string; icon: any; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10`}>
          <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-500 text-xs font-medium mb-1">{title}</h3>
      <div className="text-2xl font-display font-bold text-gray-900">{value}</div>
    </motion.div>
  );
}
