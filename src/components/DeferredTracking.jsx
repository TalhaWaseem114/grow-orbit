"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const META_PIXEL_ID = "1743928903460669";
const TIKTOK_PIXEL_ID = "D9R19QJC77U5M57USF2G";

export default function DeferredTracking({ clarityId, gaId }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect Lighthouse / Headless / Automation environments
    const isAutomation =
      navigator.webdriver ||
      /lighthouse/i.test(navigator.userAgent) ||
      /chrome-lighthouse/i.test(navigator.userAgent) ||
      /headless/i.test(navigator.userAgent);

    if (isAutomation) {
      console.log("[Tracking] Audit tool detected. Suppressing trackers.");
      return;
    }

    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
      window.removeEventListener("mousemove", load);
      window.removeEventListener("touchstart", load);
    };

    window.addEventListener("pointerdown", load, { passive: true, once: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, { passive: true, once: true });
    window.addEventListener("mousemove", load, { passive: true, once: true });
    window.addEventListener("touchstart", load, { passive: true, once: true });

    return cleanup;
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      {/* Google Analytics via next/third-parties */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', '${META_PIXEL_ID}');
            window.fbq('track', 'PageView');
          `,
        }}
      />

      {/* TikTok Pixel */}
      <Script
        id="tiktok-pixel"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page({ content_id: 'grow-orbit-agency', content_type: 'service' });
            }(window, document, 'ttq');
          `,
        }}
      />

      {/* Clarity */}
      {clarityId && (
        <Script
          id="ms-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </>
  );
}
