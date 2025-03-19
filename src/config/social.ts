export interface SocialLink {
  name: string
  url: string
  icon: string
  ariaLabel: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'twitter',
    url: 'https://twitter.com/weeknab',
    icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
    ariaLabel: 'Twitter'
  },
  {
    name: 'facebook',
    url: 'https://facebook.com/weeknab',
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    ariaLabel: 'Facebook'
  },
  {
    name: 'instagram',
    url: 'https://instagram.com/weeknab',
    icon: `
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    `,
    ariaLabel: 'Instagram'
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/company/weeknab',
    icon: `
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    `,
    ariaLabel: 'LinkedIn'
  }
]

export const companyLinks = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'Privacy Policy',
    url: '/privacy'
  }
]

export const companyInfo = {
  name: 'WeekNab',
  slogan: 'Take control of your budget, one week at a time.',
  developer: {
    name: 'Corey Boelkens',
    company: 'Cobobots.com',
    url: 'https://cobobots.com'
  },
  disclaimer: 'WeekNab is not affiliated with YNAB (You Need A Budget).',
  tagline: 'WeekNab is one of many innovative products from Cobobots.com'
} 