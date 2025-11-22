import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";

const CustomQuoteCard = () => {
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    return (
        <>
            <ContactModal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
                context={{
                    messageType: "custom",
                }}
            />
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto text-center"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Need Airport Pickup, Chauffeur or Monthly Corporate Rates?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            We create custom packages for long-term rentals, expat relocations and film crews.
                            Share your dates and vehicle requirements and we'll send a tailored quote within 2 hours.
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => setIsCustomModalOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Request Custom Quote
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default CustomQuoteCard;
