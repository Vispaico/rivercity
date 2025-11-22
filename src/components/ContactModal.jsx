import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageSquare } from "lucide-react";

const WhatsAppIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ZaloIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
    <rect width="50" height="50" rx="12" fill="#0A94FF"/>
    <text x="25" y="30" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">Zalo</text>
  </svg>
);

const MessengerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.448 5.51 3.717 7.22V22l3.406-1.87c.91.252 1.876.387 2.877.387 5.523 0 10-4.145 10-9.243C22 6.144 17.523 2 12 2zm.993 12.415l-2.567-2.74-5.008 2.74 5.51-5.845 2.63 2.74 4.945-2.74-5.51 5.845z"/>
  </svg>
);

const ContactModal = ({ isOpen, onClose, context = {} }) => {
  const { vehicleName, vehiclePrice, messageType = "rental" } = context;

  const getWhatsAppMessage = () => {
    if (vehicleName && vehiclePrice) {
      return `Hi Rivercity! I'm interested in renting the ${vehicleName} (${vehiclePrice}/day). Can you provide more details?`;
    } else if (messageType === "custom") {
      return "Hi Rivercity! I need a custom rental quote.";
    }
    return "Hi Rivercity! I have a question about rentals.";
  };

  const getEmailSubject = () => {
    if (vehicleName) {
      return `Inquiry about ${vehicleName}`;
    } else if (messageType === "custom") {
      return "Custom Rental Quote Request";
    }
    return "Rental Inquiry";
  };

  const getEmailBody = () => {
    if (vehicleName && vehiclePrice) {
      return `Hi Rivercity Team,\n\nI'm interested in renting the ${vehicleName} (${vehiclePrice}/day).\n\nPlease provide more information about:\n- Availability\n- Booking process\n- Payment options\n\nThank you!`;
    } else if (messageType === "custom") {
      return `Hi Rivercity Team,\n\nI would like to request a custom quote for:\n\n[Please specify your requirements]\n\nThank you!`;
    }
    return `Hi Rivercity Team,\n\nI have a question about your rental services.\n\nThank you!`;
  };

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      color: "bg-green-500 hover:bg-green-600",
      href: `https://wa.me/84902197160?text=${encodeURIComponent(getWhatsAppMessage())}`,
    },
    {
      name: "Messenger",
      icon: MessengerIcon,
      color: "bg-blue-500 hover:bg-blue-600",
      href: "https://www.facebook.com/RiverCityBikeRentals/",
    },
    {
      name: "Zalo",
      icon: ZaloIcon,
      color: "bg-blue-600 hover:bg-blue-700",
      href: "https://zalo.me/0902197160",
    },
    {
      name: "Phone",
      icon: Phone,
      color: "bg-purple-500 hover:bg-purple-600",
      href: "tel:+84902197160",
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-orange-500 hover:bg-orange-600",
      href: `mailto:info@rivercitybikerentals.com?subject=${encodeURIComponent(getEmailSubject())}&body=${encodeURIComponent(getEmailBody())}`,
    },
    {
      name: "Contact Form",
      icon: MessageSquare,
      color: "bg-gray-700 hover:bg-gray-800",
      action: "form",
    },
  ];

  const handleContactClick = (option) => {
    if (option.action === "form") {
      onClose();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (option.href) {
      window.open(option.href, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Get in Touch
                </h2>
                <p className="text-blue-100 text-sm">
                  Choose your preferred contact method
                </p>
                {vehicleName && (
                  <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-sm font-medium">
                      Inquiring about: <span className="font-bold">{vehicleName}</span>
                    </p>
                    {vehiclePrice && (
                      <p className="text-blue-100 text-xs mt-0.5">
                        Price: {vehiclePrice}/day
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Options Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {contactOptions.map((option) => (
                    <motion.button
                      key={option.name}
                      onClick={() => handleContactClick(option)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${option.color} text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg`}
                    >
                      <option.icon className="w-8 h-8" />
                      <span className="text-sm font-semibold">{option.name}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-center text-xs text-gray-500">
                    Available 7 days a week • Response within 2 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
