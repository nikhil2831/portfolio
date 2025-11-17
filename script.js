
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach(section => {
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector(`header nav a[href*='${id}']`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });

 
  if (top > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// Skills Animation on Scroll
const skillsSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress-line');

// Set dynamic width based on percentage
progressBars.forEach(bar => {
  const skillBar = bar.closest('.skill-bar');
  const percentageText = skillBar.querySelector('.percentage').textContent;
  const percentageValue = percentageText.replace('%', '');
  bar.style.setProperty('--skill-width', percentageValue + '%');
});

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressBars.forEach(bar => {
        const width = bar.style.getPropertyValue('--skill-width');
        bar.style.width = width;
        bar.style.animation = 'fillBar 2s ease-out forwards';
      });
    }
  });
}, {
  threshold: 0.3
});

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Smooth scroll reveal animations
const revealElements = document.querySelectorAll('.edu-content, .project-card, .skills-box, .about-img, .about-text');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease';
  revealObserver.observe(element);
});
