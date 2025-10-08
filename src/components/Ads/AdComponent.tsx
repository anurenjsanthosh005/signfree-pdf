import React, { useEffect } from "react";

function AdBannerComponent() {
  useEffect(() => {
    // try {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // } catch (e) {
    //   console.error("AdSense error:", e);
    // }
  }, []);

  return (
    <div className="w-full flex justify-center my-4 bg-amber-50">
      <ins
        className="adsbygoogle block w-full max-w-[320px] h-[50px] sm:max-w-[728px] sm:h-[90px]"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXX" // replace with your AdSense ID
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdBannerComponent;
