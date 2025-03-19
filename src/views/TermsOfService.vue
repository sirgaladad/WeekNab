<template>
  <div class="terms-of-service">
    <h1>Terms of Service</h1>
    <p class="last-updated">Last Updated: March 2024</p>

    <section>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using WeekNab, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this application.</p>
    </section>

    <section>
      <h2>2. YNAB Integration</h2>
      <p>WeekNab integrates with YNAB (You Need A Budget) through their official API. By using WeekNab with YNAB, you agree to:</p>
      <ul>
        <li>Comply with YNAB's Terms of Service and API Guidelines</li>
        <li>Maintain the security of your YNAB API token</li>
        <li>Use the integration in accordance with YNAB's rate limits and usage policies</li>
        <li>Not attempt to reverse engineer or modify the YNAB API integration</li>
      </ul>
      <p>For more information about YNAB's terms, please visit <a href="https://api.ynab.com/" target="_blank" rel="noopener noreferrer">YNAB's API Documentation</a>.</p>
    </section>

    <section>
      <h2>3. User Responsibilities</h2>
      <p>As a user of WeekNab, you are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Ensuring your use complies with all applicable laws and regulations</li>
        <li>Notifying us immediately of any unauthorized use of your account</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Usage and Privacy</h2>
      <p>WeekNab collects and processes data in accordance with our Privacy Policy. By using our service, you consent to:</p>
      <ul>
        <li>The collection and processing of your YNAB data</li>
        <li>The storage of encrypted API tokens</li>
        <li>The use of your data to provide and improve our service</li>
        <li>Our data retention and deletion policies</li>
      </ul>
    </section>

    <section>
      <h2>5. Service Modifications</h2>
      <p>We reserve the right to:</p>
      <ul>
        <li>Modify or discontinue any part of our service</li>
        <li>Update these terms at any time</li>
        <li>Change our pricing structure with notice</li>
        <li>Limit or restrict access to our service</li>
      </ul>
    </section>

    <section>
      <h2>6. Limitation of Liability</h2>
      <p>WeekNab is provided "as is" without any warranties. We are not liable for:</p>
      <ul>
        <li>Any loss or damage to your data</li>
        <li>Service interruptions or errors</li>
        <li>Third-party actions or content</li>
        <li>Any indirect or consequential damages</li>
      </ul>
    </section>

    <section>
      <h2>7. Termination</h2>
      <p>We may terminate or suspend your access to WeekNab:</p>
      <ul>
        <li>For violations of these terms</li>
        <li>For suspicious or fraudulent activity</li>
        <li>At our discretion with notice</li>
      </ul>
      <p>Upon termination, we will:</p>
      <ul>
        <li>Delete your account data</li>
        <li>Revoke your YNAB API access</li>
        <li>Remove your stored preferences</li>
      </ul>
    </section>

    <section>
      <h2>8. Contact Information</h2>
      <p>For questions about these terms, please contact us at:</p>
      <p>Email: legal@weeknab.com</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style scoped>
.terms-of-service {
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
  .terms-of-service {
    padding: 1rem;
  }
}
</style> 