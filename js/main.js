document.addEventListener('DOMContentLoaded', () => {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500); // Small delay for effect
        });
    }

    // Typing Effect for Hero
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ['Web Design', 'Python', 'Tally Prime', 'Data Science', 'Computer Skills'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(type, typeSpeed);
        };
        
        setTimeout(type, 1000); // Start typing after 1s
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Navbar & Back to Top
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Animated Statistics Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current) + (stat.getAttribute('data-plus') ? '+' : (stat.getAttribute('data-percent') ? '%' : ''));
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target + (stat.getAttribute('data-plus') ? '+' : (stat.getAttribute('data-percent') ? '%' : ''));
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const checkStats = () => {
            if (!hasCounted) {
                const rect = statsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateCounters();
                    hasCounted = true;
                    window.removeEventListener('scroll', checkStats);
                }
            }
        };
        window.addEventListener('scroll', checkStats);
        checkStats();
    }

    // Popup Modal Logic
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    
    if (popupOverlay) {
        // Show after 3 seconds if not already shown
        if (!localStorage.getItem('popupShown')) {
            setTimeout(() => {
                popupOverlay.classList.add('active');
            }, 3000);
        }
        
        const closePopup = () => {
            popupOverlay.classList.remove('active');
            localStorage.setItem('popupShown', 'true');
        };

        if (popupClose) popupClose.addEventListener('click', closePopup);
        
        const secondaryCloseBtn = document.querySelector('.popup-close-btn');
        if (secondaryCloseBtn) {
            secondaryCloseBtn.addEventListener('click', closePopup);
        }
        
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
        
        popupClose.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
        });
        
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
            }
        });
    }

    // Lightbox Logic for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Top Notification Banner Logic
    const topNotification = document.querySelector('.top-notification');
    const closeNotification = document.querySelector('.top-notification .close-btn');
    const navbarObj = document.querySelector('.navbar');

    const updateNavbarPosition = () => {
        if (topNotification && !topNotification.classList.contains('hidden') && navbarObj) {
            navbarObj.style.top = `${topNotification.offsetHeight}px`;
        } else if (navbarObj) {
            navbarObj.style.top = '0px';
        }
    };

    if (topNotification) {
        window.addEventListener('resize', updateNavbarPosition);
        // Initial call after a short delay to ensure rendering is complete
        setTimeout(updateNavbarPosition, 50); 
    }

    if (topNotification && closeNotification) {
        closeNotification.addEventListener('click', () => {
            topNotification.classList.add('hidden');
            updateNavbarPosition();
        });
    }

    // Form Validation & WhatsApp Integration Logic
    const contactForm = document.querySelector('.contact-form-js');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            let formData = {};
            
            const inputs = contactForm.querySelectorAll('.form-control');
            inputs.forEach(input => {
                // Remove existing errors
                input.classList.remove('error');
                const existingError = input.nextElementSibling;
                if (existingError && existingError.classList.contains('error-text')) {
                    existingError.remove();
                }

                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-text';
                    errorMsg.innerText = 'This field is required';
                    input.parentNode.appendChild(errorMsg);
                } else if (input.type === 'tel') {
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                        isValid = false;
                        input.classList.add('error');
                        const errorMsg = document.createElement('span');
                        errorMsg.className = 'error-text';
                        errorMsg.innerText = 'Please enter exactly 10 digits';
                        input.parentNode.appendChild(errorMsg);
                    }
                }
                
                // Store data
                if(input.name) {
                    formData[input.name] = input.value;
                }
            });

            if (isValid) {
                // Formatting message for WhatsApp
                const studentName = formData['name'] || '';
                const phone = formData['phone'] || '';
                const course = formData['course'] || '';
                const standard = formData['standard'] || '';
                const message = formData['message'] || '';
                
                const waMessage = `*New Admission Enquiry*%0A%0A*Name:* ${studentName}%0A*Phone:* ${phone}%0A*Course Interested:* ${course}%0A*Class/Standard:* ${standard}%0A*Message:* ${message}`;
                const waNumber = '910000000000'; // Placeholder, user will replace with +91XXXXXXXXXX
                
                alert('Thank you! Redirecting to WhatsApp to complete your enquiry.');
                
                contactForm.reset();
                window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
            }
        });
    }
});
