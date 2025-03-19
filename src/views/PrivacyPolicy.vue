<template>
  <div class="privacy-policy">
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last Updated: March 2024</p>

    <section>
      <h2>1. Introduction</h2>
      <p>WeekNab ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application, which integrates with YNAB (You Need A Budget).</p>
    </section>

    <section>
      <h2>2. Information We Collect</h2>
      <h3>2.1 YNAB Integration</h3>
      <p>When you connect your YNAB account to WeekNab, we collect:</p>
      <ul>
        <li>Your YNAB API token (encrypted and securely stored)</li>
        <li>Basic account information from YNAB</li>
        <li>Budget data that you choose to share</li>
      </ul>

      <h3>2.2 Usage Data</h3>
      <p>We collect information about how you use WeekNab, including:</p>
      <ul>
        <li>Feature usage patterns</li>
        <li>Error logs (for improving our service)</li>
        <li>Performance metrics</li>
      </ul>
    </section>

    <section>
      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain our service</li>
        <li>Process your YNAB data for weekly budget analysis</li>
        <li>Improve our application</li>
        <li>Communicate with you about our service</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Storage and Security</h2>
      <p>We use Supabase for data storage and implement industry-standard security measures:</p>
      <ul>
        <li>All sensitive data is encrypted at rest</li>
        <li>API tokens are encrypted using AES-GCM</li>
        <li>Secure HTTPS connections for all data transmission</li>
        <li>Regular security audits and updates</li>
      </ul>
    </section>

    <section>
      <h2>5. YNAB API Compliance</h2>
      <p>WeekNab complies with YNAB's API Terms of Service and Developer Guidelines:</p>
      <ul>
        <li>We only access data necessary for providing our service</li>
        <li>We implement proper rate limiting and caching</li>
        <li>We maintain secure storage of API tokens</li>
        <li>We respect YNAB's data usage policies</li>
      </ul>
      <p>For more information about YNAB's API terms, please visit <a href="https://api.ynab.com/" target="_blank" rel="noopener noreferrer">YNAB's API Documentation</a>.</p>
    </section>

    <section>
      <h2>6. Data Sharing and Third Parties</h2>
      <p>We do not sell or share your personal information with third parties except:</p>
      <ul>
        <li>When required by law</li>
        <li>With your explicit consent</li>
        <li>To YNAB (as part of the API integration)</li>
      </ul>
    </section>

    <section>
      <h2>7. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Export your data</li>
        <li>Revoke YNAB API access at any time</li>
      </ul>
    </section>

    <section>
      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p>Email: privacy@weeknab.com</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--color-text);
}

h1 {
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.last-updated {
  color: var(--color-text-light);
  font-style: italic;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

h3 {
  color: var(--color-heading);
  margin: 1.5rem 0 0.5rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 1rem;
  }
}
</style> 