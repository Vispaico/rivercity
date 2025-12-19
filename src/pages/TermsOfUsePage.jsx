import React from "react";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const LAST_UPDATED = "2025-12-19";

const TermsOfUsePage = () => {
  return (
    <div>
      <PageHeader
        title="Terms of Use"
        subtitle="Please read these terms carefully before using our services."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Terms of Use" }]}
      />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
            <p className="text-sm text-gray-500">Last Updated: {LAST_UPDATED}</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By using our services, you agree to be bound by these Terms of Use. If you do not agree to these Terms, do not use the services. We may revise the Terms from time to time. The changes will not be retroactive, and the most current version of the Terms, which will always be on this page, will govern our relationship with you.
            </p>

            <h2>2. Use of Services</h2>
            <p>
              You must be at least 18 years old to use our services. If you rent a vehicle, you agree to use it responsibly and in accordance with applicable laws and regulations in Vietnam.
            </p>

            <h2>3. Bookings, confirmations &amp; communication</h2>
            <p>
              Submitting a booking on our website creates a booking request. A rental is only confirmed once Rivercity has reviewed the request and confirmed availability and details.
            </p>
            <p>
              We may contact you by email, phone, or messaging apps (e.g., WhatsApp/Zalo/Messenger) to confirm details, coordinate pickup/return, or respond to questions.
            </p>
            
            <h2>4. Account Registration</h2>
            <p>
              You may need to register for an account to access some of our services. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, not current, or incomplete.
            </p>

            <h2>5. Rental terms (renters)</h2>
            <p>
              Specific terms related to vehicle rental, including rental periods, pricing, insurance, and responsibilities, will be outlined in your rental agreement. This rental agreement is a legally binding contract and forms part of these Terms of Use.
            </p>
            <ul>
              <li><strong>Vehicle Condition:</strong> You are expected to return the vehicle in the same condition it was rented, excluding normal wear and tear.</li>
              <li><strong>Prohibited Uses:</strong> Vehicles may not be used for illegal activities, racing, off-roading (unless specified for adventure bikes), or by unauthorized drivers.</li>
              <li><strong>Fees and Charges:</strong> You are responsible for rental fees, fuel charges, tolls, traffic fines/violations, and damages/losses incurred during the rental period.</li>
            </ul>

            <h2>6. Deposits</h2>
            <p>
              Deposits may apply depending on vehicle type. Current policy:
            </p>
            <ul>
              <li><strong>Motorbikes:</strong> no deposit at this time.</li>
              <li><strong>Cars:</strong> 13,000,000 VND security deposit (unless explicitly waived in writing).</li>
            </ul>
            <p>
              Deposits may be used for unpaid fines, damage not covered by insurance, towing/recovery due to misuse, late return charges (if applicable), or missing keys/items.
            </p>

            <h2>7. Partner listings (owners)</h2>
            <p>
              If you list a vehicle for rent through the Partner Portal, you represent that you are authorized to list the vehicle and that it is safe, roadworthy, legally registered, and appropriately insured.
            </p>
            <p>
              All partner listings are subject to review and may be approved or rejected at Rivercity’s discretion (for safety, quality, or compliance reasons).
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of Rivercity Bike Rentals and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Rivercity Rentals.
            </p>
            
            <h2>9. Disclaimers</h2>
            <p>
              Our services are provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, express or implied, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the services will be uninterrupted, secure, or error-free.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall Rivercity Bike Rentals, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Vietnam, without regard to its conflict of law provisions.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at info@rivercitybikerentals.com.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsOfUsePage;