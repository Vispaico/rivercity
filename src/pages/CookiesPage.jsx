import React from "react";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";

const CookiesPage = () => {
  return (
    <div>
      <PageHeader
        title="Cookie Policy"
        subtitle="Understanding how we use cookies to enhance your browsing experience."
        breadcrumbs={[{ name: "Home", link: "/" }, { name: "Cookie Policy" }]}
      />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
            <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies help us to improve our site and to deliver a better and more personalized service.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
            <p>We may use cookies to:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</li>
              <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</li>
              <li><strong>Targeting/Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
            </ul>
            
            <h2>3. Types of Cookies We Use</h2>
            <ul>
                <li><strong>Session Cookies:</strong> These are temporary cookies that remain in the cookie file of your browser until you leave the site.</li>
                <li><strong>Persistent Cookies:</strong> These remain in the cookie file of your browser for much longer (though how long will depend on the lifetime of the specific cookie).</li>
            </ul>

            <h2>4. Your Choices Regarding Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
            </p>
            
            <h2>5. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at info@rivercitybikerentals.com.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CookiesPage;