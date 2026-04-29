import React from 'react';

const LegalLayout: React.FC<{ title: string; lastUpdated?: string; children: React.ReactNode }> = ({ title, lastUpdated, children }) => (
  <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-300">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 dark:text-white mb-4">{title}</h1>
      {lastUpdated && <p className="text-slate-500 dark:text-slate-400 mb-8 italic">Last Updated: {lastUpdated}</p>}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed space-y-8 transition-colors duration-300">
        {children}
      </div>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

export const Terms: React.FC = () => {
  return (
    <LegalLayout title="Terms & Conditions">
      <Section title="1. Acceptance of Terms">
        <p>By accessing and using the Tejas Mobile website, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.</p>
      </Section>
      
      <Section title="2. Services Offered">
        <p>Tejas Mobile provides mobile repair services, sales of genuine mobile parts, accessories, and wholesale components. All services are subject to availability and technical feasibility.</p>
      </Section>

      <Section title="3. Pricing & Payment">
        <p>All prices are listed in INR and are subject to change without notice. Payment must be made in full before repair or dispatch of products. We accept credit/debit cards, UPI, and net banking.</p>
      </Section>

      <Section title="4. Warranty & Liability">
        <p>Repair services come with a 90-day warranty on replaced parts. We are not liable for any data loss during repair. Warranty is void if the device is tampered with by a third party.</p>
      </Section>

      <Section title="5. User Conduct">
        <p>You agree not to misuse the website, upload malicious content, or attempt unauthorized access to our systems.</p>
      </Section>

      <Section title="6. Modifications">
        <p>Tejas Mobile reserves the right to modify these terms at any time. Continued use constitutes acceptance of changes.</p>
      </Section>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="font-semibold">Contact: <a href="mailto:support@tejasmobile.com" className="text-brand-accent">support@tejasmobile.com</a></p>
      </div>
    </LegalLayout>
  );
};

export const Privacy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="December 16, 2025">
      <Section title="1. Information We Collect">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Information:</strong> Name, email, phone, address when you place an order or book a repair.</li>
          <li><strong>Device Information:</strong> IP address, browser type, operating system.</li>
          <li><strong>Payment Information:</strong> Processed securely via third-party gateways (we do not store card details).</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>To process orders and repairs.</li>
          <li>To send service updates and promotional emails (if subscribed).</li>
          <li>To improve website functionality.</li>
        </ul>
      </Section>

      <Section title="3. Data Security">
        <p>We implement SSL encryption and secure servers to protect your data. However, no online transmission is 100% secure.</p>
      </Section>

      <Section title="4. Third-Party Sharing">
        <p>We do not sell your data. We may share information only with trusted partners (e.g., delivery services) to fulfill orders.</p>
      </Section>

      <Section title="5. Cookies">
        <p>We use cookies to enhance user experience. You can disable cookies via browser settings.</p>
      </Section>

      <Section title="6. Your Rights">
        <p>You may request to access, update, or delete your personal data by contacting us.</p>
      </Section>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="font-semibold">Contact: <a href="mailto:privacy@tejasmobile.com" className="text-brand-accent">privacy@tejasmobile.com</a></p>
      </div>
    </LegalLayout>
  );
};

export const Refund: React.FC = () => {
  return (
    <LegalLayout title="Refund & Return Policy" lastUpdated="December 16, 2025">
      <Section title="1. Eligibility for Returns">
        <ul className="list-disc pl-5 space-y-1">
          <li>Products must be unused, in original packaging, and returned within 7 days of delivery.</li>
          <li>Defective parts may be returned within 14 days for replacement or refund.</li>
        </ul>
      </Section>

      <Section title="2. Non-Returnable Items">
        <ul className="list-disc pl-5 space-y-1">
          <li>Opened software, consumables (screen guards, adhesives).</li>
          <li>Customized or wholesale orders.</li>
          <li>Repair services (covered under warranty instead).</li>
        </ul>
      </Section>

      <Section title="3. Refund Process">
        <p>Initiate return via email/website. Once received and inspected, refund will be processed within 7–10 business days to original payment method.</p>
      </Section>

      <Section title="4. Repair Service Refunds">
        <p>If repair is unsuccessful, a full or partial refund may be issued at our discretion.</p>
      </Section>

      <Section title="5. Return Shipping">
        <p>Customer bears return shipping costs unless the product is defective or incorrect.</p>
      </Section>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="font-semibold">Contact: <a href="mailto:returns@tejasmobile.com" className="text-brand-accent">returns@tejasmobile.com</a></p>
      </div>
    </LegalLayout>
  );
};

export const Shipping: React.FC = () => {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="December 16, 2025">
      <Section title="1. Shipping Areas">
        <p>We currently ship across India. International shipping is available on request.</p>
      </Section>

      <Section title="2. Delivery Time">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Standard:</strong> 5–7 business days</li>
          <li><strong>Express:</strong> 2–3 business days (extra charges apply)</li>
          <li><strong>Repairs:</strong> Pickup and delivery available in JP Nagar, Lauriya West Champaran (same-day service possible)</li>
        </ul>
      </Section>

      <Section title="3. Shipping Charges">
        <p>Calculated at checkout based on weight and destination. Free shipping on orders above ₹2000.</p>
      </Section>

      <Section title="4. Order Tracking">
        <p>Tracking details will be emailed/SMS once the order is dispatched.</p>
      </Section>

      <Section title="5. Damaged/Missing Items">
        <p>Report within 48 hours of delivery with photos. We will replace or refund accordingly.</p>
      </Section>

      <Section title="6. Undeliverable Orders">
        <p>If the address is incorrect or unattended, the order will be returned and a reshipping fee may apply.</p>
      </Section>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="font-semibold">Contact: <a href="mailto:tejasmobilehubhelp@gmail.com" className="text-brand-accent">tejasmobilehubhelp@gmail.com</a></p>
      </div>
    </LegalLayout>
  );
};