// Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use the system preference
        const currentTheme = localStorage.getItem('theme') ||
                             (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Apply the current theme
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        themeToggle.addEventListener('click', () => {
            let theme = 'light';
            
            if (document.documentElement.getAttribute('data-theme') !== 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                theme = 'dark';
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            // Save the preference
            localStorage.setItem('theme', theme);
        });
        
        // Scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // If it's a grid container, stagger the children animations
                    if (entry.target.classList.contains('projects-grid')) {
                        const cards = entry.target.querySelectorAll('.project-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 100 * index);
                        });
                    }
                    
                    // If it's the social links container, stagger the links animations
                    if (entry.target.classList.contains('social-links')) {
                        const links = entry.target.querySelectorAll('.social-link');
                        links.forEach((link, index) => {
                            setTimeout(() => {
                                link.classList.add('visible');
                            }, 100 * index);
                        });
                    }
                    
                    // Stop observing after animation
                    if (!entry.target.classList.contains('projects-grid') &&
                        !entry.target.classList.contains('social-links')) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in, .projects-grid, .social-links').forEach(element => {
            observer.observe(element);
        });
        
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Typing Text
        var typed = new Typed(".typing-text", {
          strings: ["UI/UX", "Networking", "Server Management"],
          loop: true,
          typeSpeed: 50,
          backSpeed: 25,
          backDelay: 500,
        });
        
        // Add a subtle parallax effect to the blobs
        window.addEventListener('mousemove', e => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            document.querySelectorAll('.blob').forEach(blob => {
                blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        // Add a subtle hover effect to the project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const cardRect = this.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                
                document.addEventListener('mousemove', moveEffect);
                
                function moveEffect(e) {
                    const deltaX = ((e.clientX - centerX) / cardRect.width) * 10;
                    const deltaY = ((e.clientY - centerY) / cardRect.height) * 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateY(-10px)`;
                }
                
                card.addEventListener('mouseleave', function() {
                    document.removeEventListener('mousemove', moveEffect);
                    card.style.transform = '';
                });
            });
        });