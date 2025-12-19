import React from "react";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const LAST_UPDATED = "2025-12-19";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This policy outlines how we collect, use, and protect your data."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Privacy Policy" }]}
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

            <h2>1. Introduction</h2>
            <p>
              Welcome to Rivercity Bike Rentals ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, please contact us at info@rivercitybikerentals.com.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
            </p>
            <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
            <ul>
              <li>
                <strong>Account data:</strong> name, email address, and password (stored and managed by our authentication provider).
              </li>
              <li>
                <strong>Booking / inquiry data:</strong> name, email address, phone number, rental dates, vehicle preference, and your message.
              </li>
              <li>
                <strong>Identification details (when required for rentals):</strong> passport number and/or a passport copy may be collected to help verify the renter and support traffic-fine responsibility during the rental period.
              </li>
              <li>
                <strong>Partner (owner) data:</strong> if you list a vehicle for rent, we may collect vehicle details (category, description, images) and payout details such as bank account name/number and bank name.
              </li>
              <li>
                <strong>Newsletter signups:</strong> email address.
              </li>
            </ul>

            <p>
              <strong>Payments:</strong> At this time, we do not collect or store credit/debit card details on our website. If we introduce online payments in the future, this policy will be updated.
            </p>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.</p>
            <p>We use the information we collect or receive:</p>
            <ul>
              <li>To create and manage user accounts and authentication.</li>
              <li>To receive and manage booking requests and respond to inquiries.</li>
              <li>To operate the partner portal (vehicle listings, availability management, and payouts).</li>
              <li>To send service emails (e.g., booking received confirmations, admin notifications) and respond to support requests.</li>
              <li>To send newsletter emails if you subscribe (you can unsubscribe at any time).</li>
              <li>To enforce our terms and policies, prevent fraud/abuse, and comply with legal requirements in Vietnam.</li>
            </ul>

            <h2>4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            <p>Specifically, we may need to process your data or share your personal information in the following situations:</p>
            <ul>
              <li>
                <strong>Service providers:</strong> we use third-party infrastructure providers to run the website and core features. This may include hosting, email delivery, authentication, database, and image hosting.
              </li>
              <li>
                <strong>Legal &amp; safety:</strong> we may share information if required to comply with applicable laws, lawful requests, or to protect safety and prevent fraud.
              </li>
            </ul>

            <p>
              Examples of service providers may include website hosting and deployment providers, authentication/database providers, email (SMTP) providers, and image hosting providers.
            </p>

            <h2>5. How Long Do We Keep Your Information?</h2>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>

            <h2>6. How Do We Keep Your Information Safe?</h2>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.</p>
            
            <h2>7. What Are Your Privacy Rights?</h2>
            <p>In some regions (like the European Economic Area and the United Kingdom), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.</p>

            <h2>8. Updates To This Notice</h2>
            <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
            
            <h2>9. How Can You Contact Us About This Notice?</h2>
            <p>If you have questions or comments about this notice, you may email us at info@rivercitybikerentals.com or by post to:</p>
          <p>
            Rivercity Bike Rentals<br />
            23/32 To 2 Xom Trung, Ngo Quyen District<br />
            Haiphong, Vietnam
          </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PrivacyPolicyPage;