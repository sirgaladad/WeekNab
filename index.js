// Simple script to handle basic routing on GitHub Pages
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any interactive elements
  const ctaButtons = document.querySelectorAll('.cta-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('primary')) {
        // The "Try Demo" button - would normally navigate to the app
        // For demo purposes, we'll just scroll to features for now
        if (button.getAttribute('href') === 'app/') {
          e.preventDefault();
          document.querySelector('#features').scrollIntoView({ 
            behavior: 'smooth' 
          });
        }
      }
    });
  });

  // Add animation classes to elements when they come into view
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
    
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight * 0.9) {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 100); // Staggered animation
      }
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (itemTop < windowHeight * 0.9) {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 150); // Staggered animation
      }
    });
  };
  
  // Run once immediately for items already in view
  animateOnScroll();
  
  // Add scroll event listener for animation
  window.addEventListener('scroll', animateOnScroll);
}); 