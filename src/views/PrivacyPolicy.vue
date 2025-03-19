<template>
  <div class="privacy-policy">
    <div class="container">
      <h1>Privacy Policy</h1>
      <div class="content">
        <section>
          <h2>1. Introduction</h2>
          <p>WeekNab ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we handle your data when you use our service.</p>
        </section>

        <section>
          <h2>2. YNAB Integration</h2>
          <p>WeekNab integrates with YNAB (You Need A Budget) using personal access tokens. We:</p>
          <ul>
            <li>Never store your YNAB access token on our servers</li>
            <li>Only process data locally in your browser</li>
            <li>Do not track or store your financial information</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Collection</h2>
          <p>We collect minimal data necessary for the functioning of WeekNab:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Usage statistics (anonymous)</li>
            <li>Preferences and settings</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Storage</h2>
          <p>All personal settings and preferences are stored locally in your browser. We use local storage and cookies only for essential functionality.</p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>WeekNab integrates with YNAB's API. Please refer to YNAB's privacy policy for information about how they handle your data.</p>
        </section>

        <section>
          <h2>6. Updates to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at privacy@weeknab.com</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-policy {
  background-color: #0A0E1A;
  color: #fff;
  padding: 4rem 0;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  background-color: #1A1F35;
  padding: 2rem;
  border-radius: 12px;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #2563EB;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p, li {
  color: #8892B0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 2rem 0;
  }

  h1 {
    font-size: 2rem;
  }

  .content {
    padding: 1.5rem;
  }
}
</style> 