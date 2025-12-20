import React from 'react';

const AdBanner = ({ className }) => {
  return (
    <div className={className}>
      <iframe
        title="Advertisement"
        sandbox="allow-scripts allow-top-navigation-by-user-activation"
        referrerPolicy="no-referrer-when-downgrade"
        loading="lazy"
        className="h-[50px] w-[320px] border-0"
        src="/adsterra-banner-320x50.html"
      />
    </div>
  );
};

export default AdBanner;
