import React, { useState, useEffect, useRef } from 'react';

const AdBanner = ({ className }) => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={className} ref={containerRef}>
      {shouldLoad && (
        <iframe
          title="Advertisement"
          sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          className="h-[50px] w-[320px] border-0"
          src="/adsterra-banner-320x50.html"
        />
      )}
    </div>
  );
};

export default AdBanner;
