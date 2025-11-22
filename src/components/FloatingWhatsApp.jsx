import React, { useState } from "react";
import { MessageCircle, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContacts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contacts = [
    {
      href: "https://wa.me/84902197160?text=Hi%20Rivercity!%20I%20have%20a%20question%20about%20rentals.",
      label: "WhatsApp",
      aria: "Chat on WhatsApp",
      color: "#25D366",
      hoverColor: "#1da851",
      Icon: MessageCircle,
      angle: 30,
    },
    {
      href: "https://zalo.me/0902197160",
      label: "Zalo",
      aria: "Chat on Zalo",
      color: "#0068FF",
      hoverColor: "#0052CC",
      Icon: MessageSquare,
      angle: 150,
    },
    {
      href: "https://www.facebook.com/RiverCityBikeRentals/",
      label: "Messenger",
      aria: "Chat on Facebook Messenger",
      color: "#0084FF",
      hoverColor: "#006ADB",
      Icon: Send,
      angle: 270,
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
            const angleRad = ((contact.angle + 90) * Math.PI) / 180;
            const iconX = 50 + 28 * Math.cos(angleRad);
            const iconY = 50 + 28 * Math.sin(angleRad);
            
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                aria-label={contact.aria}
                className="absolute"
                style={{
                  left: `${iconX}%`,
                  top: `${iconY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <contact.Icon className="w-5 h-5 text-white drop-shadow-md" />
              </a>
            );
          })}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-4 h-4 text-white" />
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
                  const angleRad = ((contact.angle + 90) * Math.PI) / 180;
                  const iconX = 50 + 28 * Math.cos(angleRad);
                  const iconY = 50 + 28 * Math.sin(angleRad);
                  
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={contact.aria}
                      className="absolute"
                      style={{
                        left: `${iconX}%`,
                        top: `${iconY}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <contact.Icon className="w-5 h-5 text-white drop-shadow-md" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
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
