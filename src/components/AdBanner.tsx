// src/components/AdBanner.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AdBanner: React.FC = () => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block my-4"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3373647109086636"         // Replace with your actual client ID
      data-ad-slot="1234567890"               // Replace with your ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
};

export default AdBanner;
