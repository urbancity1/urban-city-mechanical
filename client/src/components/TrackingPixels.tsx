import { useEffect } from 'react';

interface TrackingPixelsProps {
  facebookPixelId?: string;
  googleTagId?: string;
}

export function TrackingPixels({ facebookPixelId, googleTagId }: TrackingPixelsProps) {
  useEffect(() => {
    // Initialize Facebook Pixel
    if (facebookPixelId && typeof window !== 'undefined') {
      const fbScript = document.createElement('script');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${facebookPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

    // Initialize Google Tag (gtag.js)
    if (googleTagId && typeof window !== 'undefined') {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
      document.head.appendChild(gtagScript);

      const gtagInit = document.createElement('script');
      gtagInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleTagId}');
      `;
      document.head.appendChild(gtagInit);
    }
  }, [facebookPixelId, googleTagId]);

  return null;
}

// Instructions component for admin to set up tracking
export function TrackingSetupInstructions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Ad Tracking Setup</h3>
      <p className="text-sm text-gray-600">
        To track conversions from your ad campaigns, add these environment variables:
      </p>
      
      <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm text-gray-800">VITE_FACEBOOK_PIXEL_ID</p>
          <p className="text-xs text-gray-500 mt-1">
            Get from Facebook Business Manager &rarr; Events Manager &rarr; Data Sources
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm text-gray-800">VITE_GOOGLE_TAG_ID</p>
          <p className="text-xs text-gray-500 mt-1">
            Get from Google Analytics 4 &rarr; Admin &rarr; Data Streams &rarr; Measurement ID (starts with G-)
          </p>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-2">UTM Parameters</h4>
        <p className="text-sm text-gray-600 mb-3">
          When creating ads, add these parameters to your landing page URL:
        </p>
        <code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto">
          yoursite.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=hvac-repair
        </code>
      </div>
    </div>
  );
}
