import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ZaloIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
  <rect width="50" height="50" rx="12" fill="#0A94FF"/>
  <text x="25" y="30" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="18" fill="#fff">Zalo</text>
</svg>
);

const MessengerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.448 5.51 3.717 7.22V22l3.406-1.87c.91.252 1.876.387 2.877.387 5.523 0 10-4.145 10-9.243C22 6.144 17.523 2 12 2zm.993 12.415l-2.567-2.74-5.008 2.74 5.51-5.845 2.63 2.74 4.945-2.74-5.51 5.845z"/>
  </svg>
);

const FloatingContacts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contacts = [
    {
      href: "https://wa.me/84902197160?text=Hi%20Rivercity!%20I%20have%20a%20question%20about%20rentals.",
      label: "WhatsApp",
      aria: "Chat on WhatsApp",
      color: "#25D366",
      hoverColor: "#1da851",
      Icon: WhatsAppIcon,
      segmentIndex: 0,
      iconAngle: 150,
    },
    {
      href: "https://zalo.me/0902197160",
      label: "Zalo",
      aria: "Chat on Zalo",
      color: "#0068FF",
      hoverColor: "#0052CC",
      Icon: ZaloIcon,
      segmentIndex: 1,
      iconAngle: 270,
    },
    {
      href: "https://www.facebook.com/RiverCityBikeRentals/",
      label: "Messenger",
      aria: "Chat on Facebook Messenger",
      color: "#0084FF",
      hoverColor: "#006ADB",
      Icon: MessengerIcon,
      segmentIndex: 2,
      iconAngle: 30,
    },
  ];

  return (
    <>
      {/* Desktop Version - Always visible wheel */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="relative w-32 h-32">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {contacts.map((contact, index) => {
              const startAngle = (index * 120) - 90;
              const endAngle = startAngle + 115;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const largeArc = 0;
              
              const x1 = 50 + 45 * Math.cos(startRad);
              const y1 = 50 + 45 * Math.sin(startRad);
              const x2 = 50 + 45 * Math.cos(endRad);
              const y2 = 50 + 45 * Math.sin(endRad);
              
              return (
                <g key={contact.label}>
                  <a href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.aria}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={contact.color}
                      className="transition-all duration-300 hover:brightness-110 cursor-pointer"
                      filter="url(#glow)"
                      style={{
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                      }}
                    />
                  </a>
                </g>
              );
            })}
            <circle cx="50" cy="50" r="18" fill="white" className="drop-shadow-lg" />
          </svg>
          
          {contacts.map((contact) => {
            const angleRad = ((contact.iconAngle + 90) * Math.PI) / 180;
            const iconX = 50 + 28 * Math.cos(angleRad);
            const iconY = 50 + 28 * Math.sin(angleRad);
            
            return (
              <div
                key={contact.label}
                className="absolute pointer-events-none"
                style={{
                  left: `${iconX}%`,
                  top: `${iconY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <contact.Icon className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            );
          })}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Expandable wheel */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute bottom-0 right-0 w-40 h-40"
              style={{ transformOrigin: "bottom right" }}
            >
              <div className="relative w-full h-full">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <defs>
                    <filter id="glow-mobile">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {contacts.map((contact, index) => {
                    const startAngle = (index * 120) - 90;
                    const endAngle = startAngle + 115;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    const largeArc = 0;
                    
                    const x1 = 50 + 45 * Math.cos(startRad);
                    const y1 = 50 + 45 * Math.sin(startRad);
                    const x2 = 50 + 45 * Math.cos(endRad);
                    const y2 = 50 + 45 * Math.sin(endRad);
                    
                    return (
                      <g key={contact.label}>
                        <a href={contact.href} target="_blank" rel="noreferrer" aria-label={contact.aria}>
                          <path
                            d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={contact.color}
                            className="transition-all duration-300 active:brightness-110"
                            filter="url(#glow-mobile)"
                            style={{
                              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                            }}
                          />
                        </a>
                      </g>
                    );
                  })}
                </svg>
                
                {contacts.map((contact) => {
                  const angleRad = ((contact.iconAngle + 90) * Math.PI) / 180;
                  const iconX = 50 + 28 * Math.cos(angleRad);
                  const iconY = 50 + 28 * Math.sin(angleRad);
                  
                  return (
                    <div
                      key={contact.label}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${iconX}%`,
                        top: `${iconY}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <contact.Icon className="w-5 h-5 text-white drop-shadow-md" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </div>
    </>
  );
};

export default FloatingContacts;
