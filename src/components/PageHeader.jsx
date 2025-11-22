import React from "react";
import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, breadcrumbs }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 pt-28 pb-16 md:pt-32 md:pb-24 text-white">
      <div className="container mx-auto px-4 text-center">
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-blue-200 mb-2"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.link ? (
                  <a href={crumb.link} className="hover:underline">
                    {crumb.name}
                  </a>
                ) : (
                  <span>{crumb.name}</span>
                )}
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;