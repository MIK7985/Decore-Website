document.addEventListener('DOMContentLoaded', () => {
    
    /* ===== NAVBAR SCROLL EFFECT ===== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ===== MOBILE MENU TOGGLE ===== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent scrolling on body when menu is open
            if(navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    /* ===== ACTIVE LINK ON SCROLL ===== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for fixed header
            const sectionId = current.getAttribute('id');
            const navTarget = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if(navTarget) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navTarget.classList.add('active');
                } else {
                    navTarget.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);


    /* ===== INTERSECTION OBSERVER ANIMATIONS ===== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ===== DARK MODE TOGGLE (SLIDER) ===== */
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('decore-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let targetTheme = 'dark';
            
            if (currentTheme === 'dark') {
                targetTheme = 'light';
            }

            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('decore-theme', targetTheme);
        });
    }

    /* ===== CONTACT FORM DUAL INTEGRATION ===== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Run WhatsApp logic right when they click submit
        contactForm.addEventListener('submit', function() {
            
            // Get form values safely
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const serviceElement = document.getElementById('service');
            const service = serviceElement.options[serviceElement.selectedIndex].text;
            const message = document.getElementById('message').value;
            
            // 1. Construct WhatsApp Formatting String
            const whatsappNumber = "919645869686";
            const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
            const whatsappText = `🚀 *New Client Inquiry Alert*\n\nA new potential client has submitted a request through your website.\n\n👤 *Client Information*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n📌 *Service Requested*\n${service}\n\n💬 *Client Message*\n"${message}"\n\n📅 *Received At*\n${currentDateTime}\n\n---\n📞 Action Required: Contact the client promptly to follow up.`;
            
            // 2. Open WhatsApp immediately in a NEW background tab
            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`, '_blank');
            
            // Allow the browser to naturally continue POSTing the data directly to FormSubmit!
            // Do NOT use e.preventDefault() here!
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending via Email... <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';
        });
    }

});
