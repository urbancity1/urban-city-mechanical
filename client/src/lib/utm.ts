// UTM Parameter Tracking Utility

export interface UTMParams {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  
  // Check URL params first, then sessionStorage (for persistence during session)
  const utmSource = params.get('utm_source') || sessionStorage.getItem('utm_source');
  const utmMedium = params.get('utm_medium') || sessionStorage.getItem('utm_medium');
  const utmCampaign = params.get('utm_campaign') || sessionStorage.getItem('utm_campaign');
  const utmContent = params.get('utm_content') || sessionStorage.getItem('utm_content');
  const utmTerm = params.get('utm_term') || sessionStorage.getItem('utm_term');
  
  // Store in session for persistence
  if (utmSource) sessionStorage.setItem('utm_source', utmSource);
  if (utmMedium) sessionStorage.setItem('utm_medium', utmMedium);
  if (utmCampaign) sessionStorage.setItem('utm_campaign', utmCampaign);
  if (utmContent) sessionStorage.setItem('utm_content', utmContent);
  if (utmTerm) sessionStorage.setItem('utm_term', utmTerm);
  
  return {
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };
}

export function getSourceFromUTM(utm: UTMParams): string {
  if (utm.utmSource) {
    return utm.utmSource;
  }
  
  // Try to detect source from referrer
  if (typeof document !== 'undefined' && document.referrer) {
    const referrer = document.referrer.toLowerCase();
    if (referrer.includes('google')) return 'google';
    if (referrer.includes('facebook') || referrer.includes('fb.com')) return 'facebook';
    if (referrer.includes('instagram')) return 'instagram';
    if (referrer.includes('bing')) return 'bing';
    if (referrer.includes('yahoo')) return 'yahoo';
  }
  
  return 'direct';
}

// Fire conversion events for tracking pixels
export function fireConversionEvent(leadData: { email: string; value?: number }) {
  // Facebook Pixel conversion
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: 'HVAC Service Request',
      value: leadData.value || 0,
      currency: 'USD',
    });
  }
  
  // Google Analytics 4 / gtag conversion
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'HVAC Lead Form',
      value: leadData.value || 0,
    });
  }
}
