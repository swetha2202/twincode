/* ===================== TWINCODE PREMIUM JS ===================== */

// ── Navbar scroll effect
const header = document.getElementById('siteHeader');
const onScroll = () => {
    if (window.scrollY > 40) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── Active nav link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// ── Hero entrance animation (content fades in on load)
window.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(36px)';
        heroContent.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 120);
    }
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(36px)';
        heroVisual.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1) 0.25s, transform 0.9s cubic-bezier(0.4,0,0.2,1) 0.25s';
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 160);
    }
});

// ── Typing effect on hero title words
function runTypingEffect() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    // We target the three span words: .highlight-blue, .highlight-orange, and "Marketing"
    // Wrap "Marketing" plain text node in a span so we can animate it too
    titleEl.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'Marketing') {
            const span = document.createElement('span');
            span.className = 'highlight-marketing';
            span.textContent = node.textContent;
            node.replaceWith(span);
        }
    });

    const words = [
        titleEl.querySelector('.highlight-blue'),
        titleEl.querySelector('.highlight-orange'),
        titleEl.querySelector('.highlight-marketing'),
    ].filter(Boolean);

    // Store originals and blank them out
    const originals = words.map(el => el.textContent);
    words.forEach(el => { el.textContent = ''; });

    let wordIdx = 0;

    function typeWord(el, text, done) {
        let i = 0;
        // Blinking cursor
        el.style.borderRight = '2px solid currentColor';
        el.style.paddingRight = '2px';

        const interval = setInterval(() => {
            el.textContent = text.slice(0, ++i);
            if (i >= text.length) {
                clearInterval(interval);
                // Remove cursor after a short pause
                setTimeout(() => {
                    el.style.borderRight = '';
                    el.style.paddingRight = '';
                    done();
                }, 320);
            }
        }, 68);
    }

    function next() {
        if (wordIdx >= words.length) return;
        const el = words[wordIdx];
        const text = originals[wordIdx];
        wordIdx++;
        // Stagger: wait a moment before typing the next word
        setTimeout(() => typeWord(el, text, next), wordIdx === 1 ? 0 : 180);
    }

    // Kick off after hero has faded in
    setTimeout(next, 700);
}

runTypingEffect();

// ── Enhanced scroll reveal — covers more elements with staggered entrance
const revealSelectors = [
    // Hero (already handled above, but float cards still benefit)
    '.float-card', '.hero-main-card',

    // About strip
    '.about-strip-text', '.stat-box',

    // Services
    '.services-section .section-label',
    '.services-section h2',
    '.service-card',

    // Unique section
    '.unique-item',

    // Testimonials
    '.testimonials-section h2',
    '.testimonial-card',

    // CTA banner
    '.cta-percent', '.cta-text',

    // About / services / contact pages
    '.milestone-card', '.blog-card', '.service-detail-card',
    '.about-highlight-box', '.values-quote',
    '.contact-item', '.contact-form-wrap',

    // Section headings across all pages
    '.page-hero-content', '.about-story-text', '.values-text',
];

// Collect unique elements
const revealSet = new Set();
revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => revealSet.add(el));
});
const revealEls = [...revealSet];

// Group siblings so they get staggered delays relative to each other
function getSiblingIndex(el, group) {
    return group.filter(e => e.parentElement === el.parentElement).indexOf(el);
}

const groups = {};
revealEls.forEach(el => {
    const key = el.parentElement ? el.parentElement.className : 'root';
    if (!groups[key]) groups[key] = [];
    groups[key].push(el);
});

revealEls.forEach(el => {
    el.classList.add('reveal');
    const key = el.parentElement ? el.parentElement.className : 'root';
    const group = groups[key] || [];
    const idx = group.indexOf(el);
    // Max 4 delay tiers (matching existing CSS classes)
    const tier = Math.min(idx % 4, 3);
    if (tier > 0) el.classList.add(`reveal-delay-${tier}`);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once revealed so it stays visible on scroll-back
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── Section headings fade-up (h2 tags inside sections, not already covered)
document.querySelectorAll(
    '.about-strip h2, .services-section h2, .testimonials-section h2, .milestones-section h2, .unique-section h2, .cta-text h2'
).forEach(h => {
    if (!h.classList.contains('reveal')) {
        h.classList.add('reveal');
        revealObserver.observe(h);
    }
});

// ── Animated counter
function animateCounter(el) {
    const raw = el.textContent.trim();
    const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const suffix = raw.replace(/[0-9.]/g, '');
    const duration = 1800;
    const steps = 60;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(0);
        el.textContent = display + suffix;
        if (step >= steps) {
            el.textContent = raw; // restore exact original
            clearInterval(timer);
        }
    }, duration / steps);
}

const counterEls = document.querySelectorAll('.stat-num, .big-percent, .cta-percent, .dash-stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = '1';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ── Chart bars animate in when hero card is visible
const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach((bar, i) => {
    const natural = bar.style.height || getComputedStyle(bar).height;
    bar.dataset.targetHeight = natural;
    bar.style.height = '0%';
    bar.style.transition = `height 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`;
});

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.chartDone) {
            entry.target.dataset.chartDone = '1';
            chartBars.forEach((bar, i) => {
                // Heights are set via CSS class names; just trigger transition by reading className
                const classes = ['cb1', 'cb2', 'cb3', 'cb4', 'cb5', 'cb6', 'cb7'];
                const heights = ['45%', '70%', '55%', '90%', '75%', '85%', '60%'];
                setTimeout(() => { bar.style.height = heights[i] || '50%'; }, 60);
            });
        }
    });
}, { threshold: 0.3 });

const dashCard = document.querySelector('.hero-main-card');
if (dashCard) chartObserver.observe(dashCard);

// ── Hero floating card parallax (subtle)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.float-card');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    cards.forEach((card, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * 6;
        card.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
});