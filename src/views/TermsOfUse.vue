<template>
  <div class="terms-of-use">
    <div class="container">
      <h1>Terms of Use</h1>
      <div class="content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using WeekNab, you accept and agree to be bound by these Terms of Use and our Privacy Policy.</p>
        </section>

        <section>
          <h2>2. YNAB Integration</h2>
          <p>WeekNab is not affiliated with YNAB (You Need A Budget). By using WeekNab:</p>
          <ul>
            <li>You agree to comply with YNAB's terms of service</li>
            <li>You understand that you are responsible for your YNAB access token security</li>
            <li>You acknowledge that WeekNab is an independent third-party tool</li>
          </ul>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <p>As a WeekNab user, you are responsible for:</p>
          <ul>
            <li>Maintaining the security of your YNAB access token</li>
            <li>Using the service in compliance with applicable laws</li>
            <li>Ensuring your usage doesn't disrupt the service</li>
          </ul>
        </section>

        <section>
          <h2>4. Service Limitations</h2>
          <p>WeekNab is provided "as is" and "as available". We do not guarantee:</p>
          <ul>
            <li>Uninterrupted service availability</li>
            <li>Accuracy of budget calculations</li>
            <li>Compatibility with all YNAB features</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>All content and functionality on WeekNab is protected by intellectual property rights. You may not copy, modify, or redistribute without permission.</p>
        </section>

        <section>
          <h2>6. Disclaimer of Warranties</h2>
          <p>WeekNab is not responsible for any financial decisions made based on the service. Use the tool at your own risk.</p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of WeekNab constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>For questions about these terms, please contact us at terms@weeknab.com</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terms-of-use {
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
  .terms-of-use {
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