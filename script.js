document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. STATE MANAGERS & SELECTIONS
  // ==========================================
  const introOverlay = document.getElementById('intro-overlay');
  const navWrapper = document.getElementById('nav-wrapper');
  const typingTarget = document.getElementById('typing-target');
  const rotatingSubtitle = document.getElementById('rotating-subtitle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlayMenu = document.getElementById('mobile-overlay-menu');
  const timelineProgressBar = document.getElementById('timeline-progress-bar');
  const timelineContainer = document.querySelector('.timeline-container');
  
  // Rotating Subtitles Array
  const subtitlesList = [
    "Network & System Administrator",
    "Web Developer",
    "AI/ML/DS Learner",
    "Cyber Security Enthusiast"
  ];
  let subtitleIndex = 0;
  
  // Typewriter Config
  const nameToType = "Deependra Bist";
  let charIndex = 0;
  const typingSpeed = 100; // ms per char
  
  // Navbar State
  let lastScrollY = window.scrollY;

  // ==========================================
  // 2. CINEMATIC INTRO SEQUENCER
  // ==========================================
  // Simulating asset load and initiating sequence
  setTimeout(() => {
    // 1. Fade out the splash preloader overlay
    introOverlay.classList.add('loaded');
    
    // 2. Begin Hero animations after preloader slides away
    setTimeout(() => {
      // Reveal Nav Wrapper
      navWrapper.classList.remove('nav-hidden');
      
      // Animate Hero labels
      const heroLbl = document.getElementById('hero-lbl');
      const heroSubWrap = document.getElementById('hero-sub-wrap');
      const heroDesc = document.getElementById('hero-description');
      const heroBtns = document.getElementById('hero-btns');
      
      heroLbl.style.opacity = '1';
      heroLbl.style.transform = 'translateY(0)';
      heroLbl.style.transition = 'opacity 1s, transform 1s';
      
      // Start typing effect for title
      startTypewriter();
      
      // Stagger other hero elements
      setTimeout(() => {
        heroSubWrap.style.opacity = '1';
        heroSubWrap.style.transform = 'translateY(0)';
        heroSubWrap.style.transition = 'opacity 1.2s, transform 1.2s';
        
        // Start subtitle rotation cycle
        startSubtitleRotation();
      }, 1000);
      
      setTimeout(() => {
        heroDesc.style.opacity = '1';
        heroDesc.style.transform = 'translateY(0)';
        heroDesc.style.transition = 'opacity 1.2s, transform 1.2s';
      }, 1400);
      
      setTimeout(() => {
        heroBtns.style.opacity = '1';
        heroBtns.style.transform = 'translateY(0)';
        heroBtns.style.transition = 'opacity 1.2s, transform 1.2s';
      }, 1800);
      
    }, 800);
    
  }, 2200);

  // ==========================================
  // 3. TYPEWRITER ENGINE (HERO MAIN TITLE)
  // ==========================================
  function startTypewriter() {
    const mainTitle = document.getElementById('hero-main-title');
    mainTitle.style.opacity = '1';
    
    function type() {
      if (charIndex < nameToType.length) {
        typingTarget.textContent += nameToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Remove typing blinking cursor or keep it static
        setTimeout(() => {
          const cursor = mainTitle.querySelector('.cursor');
          if (cursor) cursor.style.display = 'inline-block';
        }, 500);
      }
    }
    
    type();
  }

  // ==========================================
  // 4. SUBTITLE ROTATING SLIDER
  // ==========================================
  function startSubtitleRotation() {
    setInterval(() => {
      // Fade out current text slightly
      rotatingSubtitle.style.opacity = '0';
      rotatingSubtitle.style.transform = 'translateY(-10px)';
      rotatingSubtitle.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        // Increment Index
        subtitleIndex = (subtitleIndex + 1) % subtitlesList.length;
        rotatingSubtitle.textContent = subtitlesList[subtitleIndex];
        
        // Push up from bottom and fade in
        rotatingSubtitle.style.transform = 'translateY(15px)';
        
        // Trigger reflow to apply instant transformation before transition
        rotatingSubtitle.offsetHeight;
        
        rotatingSubtitle.style.opacity = '1';
        rotatingSubtitle.style.transform = 'translateY(0)';
        rotatingSubtitle.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 500);
      
    }, 4000); // Transitions every 4 seconds
  }

  // ==========================================
  // 5. BATTERY-FRIENDLY CANVAS PARTICLES
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  let animationFrameId;
  let isPageVisible = true;
  
  // Track page visibility to pause particles on inactive tabs
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      loopParticles();
    } else {
      cancelAnimationFrame(animationFrameId);
    }
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
      this.speedX = (Math.random() - 0.5) * 0.15; // Slow drift
      this.speedY = -Math.random() * 0.35 - 0.05; // Upward direction
      this.baseOpacity = Math.random() * 0.15 + 0.05; // Soft opacity
      this.opacity = this.baseOpacity;
      this.fadeDir = Math.random() > 0.5 ? 0.002 : -0.002;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Loop particle when it leaves screen top
      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
      
      // Loop particle horizontally
      if (this.x < -10 || this.x > canvas.width + 10) {
        this.speedX = -this.speedX;
      }
      
      // Gentle shimmer effect on opacity
      this.opacity += this.fadeDir;
      if (this.opacity > this.baseOpacity * 1.5 || this.opacity < this.baseOpacity * 0.5) {
        this.fadeDir = -this.fadeDir;
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`; // Accent purple ambient glow
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    // Adjust density based on width
    const densityFactor = canvas.width < 768 ? 20 : 60;
    for (let i = 0; i < densityFactor; i++) {
      particlesArray.push(new Particle());
    }
  }

  function loopParticles() {
    if (!isPageVisible) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    animationFrameId = requestAnimationFrame(loopParticles);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  loopParticles();

  // ==========================================
  // 6. SMART FLOATING STICKY NAVIGATION
  // ==========================================
  // Init hidden class to let sequencer fade it in
  navWrapper.classList.add('nav-hidden');
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Hide nav on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      navWrapper.classList.add('nav-hidden');
    } else {
      navWrapper.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
    
    // Add solid state style back on active scrolling
    const navbar = document.getElementById('navbar-main');
    if (currentScrollY > 50) {
      navbar.style.background = 'rgba(8, 9, 15, 0.75)';
      navbar.style.borderColor = 'rgba(139, 92, 246, 0.12)';
    } else {
      navbar.style.background = 'var(--glass-bg)';
      navbar.style.borderColor = 'var(--glass-border)';
    }
    
    // 6b. DYNAMIC TIMELINE PROGRESS TRACKER
    if (timelineContainer && timelineProgressBar) {
      const rect = timelineContainer.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how far down the timeline container is scrolled relative to viewport center
      const startPoint = rect.top - viewHeight / 2;
      const totalRange = rect.height;
      
      if (rect.top < viewHeight / 2) {
        let percent = (-startPoint / totalRange) * 100;
        percent = Math.min(Math.max(percent, 0), 100);
        timelineProgressBar.style.height = `${percent}%`;
        
        // Highlight active nodes as timeline indicator passes them
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < viewHeight / 2 + 50) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      } else {
        timelineProgressBar.style.height = '0%';
      }
    }
  });

  // ==========================================
  // 7. RESPONSIVE MOBILE NAVIGATION MENU
  // ==========================================
  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('open');
    mobileOverlayMenu.classList.toggle('open');
    
    // Prevent body scroll when menu is active
    if (mobileOverlayMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close Mobile menu when clicking any overlay link
  const mobileLinks = mobileOverlayMenu.querySelectorAll('.nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu();
    });
  });

  // ==========================================
  // 8. INTERSECTION OBSERVER REVEAL ENGINES
  // ==========================================
  // 8a. Fade-In and Slide-Up sections
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger skill progress bar growth specifically on skills card entry
        const progressFills = entry.target.querySelectorAll('.skill-progress-fill');
        if (progressFills.length > 0) {
          progressFills.forEach(fill => {
            const targetVal = fill.getAttribute('data-progress');
            fill.style.width = targetVal;
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  const revealElements = document.querySelectorAll('.reveal-el');
  revealElements.forEach(el => sectionObserver.observe(el));
  
  // 8b. Active Section Navigation Indicator highlights
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-nav .nav-link');
  const sections = document.querySelectorAll('section');
  
  const activeNavObserverOptions = {
    threshold: 0.25,
    rootMargin: "-25% 0px -40% 0px"
  };
  
  const activeNavObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Loop and update active class
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, activeNavObserver);
  
  sections.forEach(section => activeNavObserver.observe(section));
  
  // Smooth scroll links execution override
  const allScrollLinks = document.querySelectorAll('a[href^="#"]');
  allScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const button = form.querySelector("button");

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    // loading state
    const originalText = button.innerHTML;
    button.innerHTML = "Sending...";

    setTimeout(() => {
      console.log("Form Data:", { name, email, message });

      alert("Message sent successfully!");

      form.reset();
      button.innerHTML = originalText;
    }, 1200);
  });
});

