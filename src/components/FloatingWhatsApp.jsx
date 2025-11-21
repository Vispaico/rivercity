import React from "react";
import { MessageCircle, MessageSquare } from "lucide-react";

const contacts = [
  {
    href: "https://wa.me/84902197160?text=Hi%20Rivercity!%20I%20have%20a%20question%20about%20rentals.",
    label: "WhatsApp Us",
    aria: "Chat on WhatsApp",
    bg: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    Icon: MessageCircle,
  },
  {
    href: "https://zalo.me/0902197160",
    label: "Zalo Us",
    aria: "Chat on Zalo",
    bg: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
    Icon: MessageSquare,
  },
];

const FloatingContacts = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {contacts.map(({ href, label, aria, bg, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={aria}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-white shadow-lg shadow-black/20 transition focus:outline-none focus:ring-2 ${bg}`}
        >
          <Icon className="h-5 w-5" />
          <span className="font-semibold">{label}</span>
        </a>
      ))}
    </div>
  );
};

export default FloatingContacts;
