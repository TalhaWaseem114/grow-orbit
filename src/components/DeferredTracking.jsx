"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const META_PIXEL_ID = "1743928903460669";

export default function DeferredTracking({ clarityId, gaId }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let loaded = false;
    let idleId;
    let timeoutId;

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
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    window.addEventListener("pointerdown", load, { passive: true, once: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, { passive: true, once: true });

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 10000 });
    } else {
      timeoutId = window.setTimeout(load, 10000);
    }

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
