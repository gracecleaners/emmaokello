/* ============================================
   EMMA OKELLO — FILMMAKER WEBSITE
   JavaScript Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --------- Custom Cursor ---------
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .film-card, .social-card, .award-card, .detail-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // --------- Hero Particles ---------
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (1 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5;
            heroParticles.appendChild(particle);
        }
    }

    // --------- Hero Text Reveal Animation ---------
    function revealHeroText() {
        const lineTexts = document.querySelectorAll('.hero .line-text');
        lineTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('revealed');
            }, 300 + index * 200);
        });
    }

    // Start hero animation after a short delay
    setTimeout(revealHeroText, 500);

    // --------- Glitch Effect on Hero Title ---------
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            word.style.animation = 'glitch 0.3s ease forwards';
            setTimeout(() => {
                word.style.animation = '';
            }, 300);
        });
    });

    // Add glitch keyframes dynamically
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
            40% { transform: translate(2px, -2px); filter: hue-rotate(180deg); }
            60% { transform: translate(-1px, -1px); filter: hue-rotate(270deg); }
            80% { transform: translate(1px, 1px); filter: hue-rotate(360deg); }
            100% { transform: translate(0); filter: hue-rotate(0deg); }
        }
        @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px rgba(232, 197, 71, 0); }
            50% { text-shadow: 0 0 20px rgba(232, 197, 71, 0.3), 0 0 40px rgba(232, 197, 71, 0.1); }
        }
        @keyframes slideInFromLeft {
            from { transform: translateX(-60px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
            from { transform: translateX(60px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInScale {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(glitchStyle);

    // --------- Navigation Scroll Effect ---------
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --------- Mobile Menu Toggle ---------
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --------- Smooth Scroll for Nav Links ---------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------- Intersection Observer for Scroll Animations ---------
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                // Special handling for section lines
                if (entry.target.classList.contains('section-line')) {
                    entry.target.classList.add('animated');
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animate items
    const animateItems = document.querySelectorAll('.animate-item');
    animateItems.forEach((item, index) => {
        // Add staggered delays for items within the same section
        const section = item.closest('.section, .awards-section');
        if (section) {
            const siblings = section.querySelectorAll('.animate-item');
            const siblingIndex = Array.from(siblings).indexOf(item);
            item.dataset.delay = siblingIndex * 80;
        }
        observer.observe(item);
    });

    // Also observe section lines
    document.querySelectorAll('.section-line').forEach(line => {
        observer.observe(line);
    });

    // --------- Counter Animation ---------
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 30);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = current;
                }, 50);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // --------- Parallax Effects ---------
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            const heroParticlesBg = hero.querySelector('.hero-particles');

            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }

            if (heroParticlesBg && scrolled < window.innerHeight) {
                heroParticlesBg.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }

        // Parallax for film posters
        document.querySelectorAll('.film-poster').forEach(poster => {
            const rect = poster.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (visible) {
                const distance = rect.top - window.innerHeight / 2;
                const img = poster.querySelector('img');
                if (img) {
                    img.style.transform = `translateY(${distance * 0.05}px) scale(1)`;
                }
            }
        });
    });

    // --------- Film Card Tilt Effect ---------
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.film-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(() => {
                    card.style.transition = '';
                }, 500);
            });
        });
    }

    // --------- Magnetic Button Effect ---------
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // --------- Social Card Hover Glow ---------
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232, 197, 71, 0.06), transparent 60%), var(--bg-card)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-card)';
        });
    });

    // --------- Award Cards Hover Glow ---------
    document.querySelectorAll('.award-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232, 197, 71, 0.04), transparent 50%), var(--bg-card)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-card)';
        });
    });

    // --------- Typing Effect for Hero Subtitle ---------
    const heroSubtitle = document.querySelector('.hero-subtitle .line-text');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const roles = ['FILMMAKER & DIRECTOR', 'SCREENWRITER', 'STORYTELLER', 'FILMMAKER & DIRECTOR'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function typeRole() {
            // Wait for initial reveal animation
            if (!heroSubtitle.classList.contains('revealed')) {
                setTimeout(typeRole, 500);
                return;
            }

            const currentRole = roles[roleIndex];

            if (isPaused) {
                isPaused = false;
                isDeleting = true;
                setTimeout(typeRole, 2500);
                return;
            }

            if (!isDeleting) {
                heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isPaused = true;
                    setTimeout(typeRole, 100);
                    return;
                }
            } else {
                heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            const speed = isDeleting ? 40 : 80;
            setTimeout(typeRole, speed);
        }

        // Start typing effect after initial reveal
        setTimeout(typeRole, 3000);
    }

    // --------- Scroll Progress Indicator ---------
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--accent), #e8c547, #c0392b);
        z-index: 10001;
        transition: width 0.1s linear;
        border-radius: 0 1px 1px 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // --------- Active Nav Link Highlight ---------
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--accent)';
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // --------- Image Lazy Load with Fade ---------
    document.querySelectorAll('.film-poster img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });

            img.addEventListener('error', () => {
                // Create a beautiful placeholder for missing images
                const poster = img.closest('.film-poster');
                if (poster) {
                    const filmCard = poster.closest('.film-card');
                    const filmTitle = filmCard ? filmCard.querySelector('.film-title') : null;
                    const title = filmTitle ? filmTitle.textContent : 'Film';

                    poster.style.background = `
                        linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
                    `;
                    poster.style.display = 'flex';
                    poster.style.alignItems = 'center';
                    poster.style.justifyContent = 'center';
                    poster.style.flexDirection = 'column';
                    poster.style.gap = '12px';

                    img.style.display = 'none';

                    const placeholder = document.createElement('div');
                    placeholder.style.cssText = `
                        text-align: center;
                        padding: 20px;
                    `;
                    placeholder.innerHTML = `
                        <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.6;">🎬</div>
                        <div style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: rgba(255,255,255,0.8); letter-spacing: 0.05em;">${title}</div>
                        <div style="font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 8px;">Phanuel ActM</div>
                    `;
                    poster.appendChild(placeholder);
                }
            });
        }
    });

    // --------- Cinematic Letterbox Effect on Scroll ---------
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const windowH = window.innerHeight;
                const hero = document.querySelector('.hero');

                if (hero && scrolled < windowH) {
                    const progress = scrolled / windowH;
                    hero.style.filter = `brightness(${1 - progress * 0.5})`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('%c🎬 Emma Okello — Filmmaker & Director', 'color: #e8c547; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with passion for African Cinema.', 'color: #a0a0a0; font-size: 12px;');
});
