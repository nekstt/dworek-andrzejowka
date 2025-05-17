/**
 * Main JavaScript file for Dworek Andrzejówka
 * Organized in modules for better maintainability
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    navbarModule.init();
    tabModule.init();
    galleryModule.init();
    animationModule.init();
    formModule.init();
});

/**
 * Navbar Module - Handles all navbar functionality
 */
const navbarModule = {
    // Initialize navbar functionality
    init: function() {
        // References to DOM elements
        this.navbar = document.querySelector('.navbar');
        this.navbarToggle = document.getElementById('navbarToggle');
        this.navbarMenu = document.getElementById('navbarMenu');
        
        // Setup event listeners
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.navbarToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        // const logo = document.querySelector('.navbar-logo');
        // if (logo) {
        //     logo.addEventListener('click', function(e) {
        //         e.preventDefault();
        //         // Hide all tabs
        //         document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        //         // Show home tab
        //         const homeTab = document.getElementById('glowna');
        //         if (homeTab) {
        //             homeTab.classList.add('active');
        //         }
        //         // Update URL (remove hash or set to #glowna)
        //         window.history.pushState(null, null, '#glowna');
        //         // Scroll to top
        //         window.scrollTo({
        //             top: 0,
        //             behavior: 'smooth'
        //         });
        //     });
        // }
        const logo = document.querySelector('.navbar-logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Przekieruj na stronę główną bez hashu
                window.location.href = window.location.origin;
            });
        }
    },
    
    // Handle navbar appearance on scroll
    handleScroll: function() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    // Toggle mobile menu visibility
    toggleMobileMenu: function() {
        this.navbarMenu.classList.toggle('active');
    }
};

/**
 * Tab Navigation Module - Handles tab switching and content display
 */
const tabModule = {
    init: function() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Setup event listeners for tab navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleTabClick.bind(this));
        });
        
        // Setup event listeners for footer links
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', this.handleTabClick.bind(this));
        });
        
        // Check hash on page load
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const section = document.getElementById(hash);
            const link = document.querySelector(`.nav-link[data-tab="${hash}"]`);
            
            if (section && link) {
                this.setActiveTab(link, hash);
            } else {
                this.setDefaultActiveTab();
            }
        } else {
            this.setDefaultActiveTab();
        }
        
        // Setup scroll spy for active tab highlighting
        window.addEventListener('scroll', this.highlightActiveTab.bind(this));
    },
    
    // Handle tab click events
    handleTabClick: function(e) {
        // Nie używaj e.preventDefault(), aby pozwolić na zmianę URL
        
        // Get clicked tab details
        const clickedLink = e.currentTarget;
        const tabId = clickedLink.getAttribute('data-tab');
        
        // Update active tab
        this.setActiveTab(clickedLink, tabId);
        
        // Close mobile menu if open
        document.getElementById('navbarMenu').classList.remove('active');
    },
    
    // Set active tab and show corresponding content
    setActiveTab: function(activeLink, tabId) {
        // Remove active class from all links and tabs
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked link and corresponding tab
        activeLink.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    },
    
    // Set default active tab (główna)
    setDefaultActiveTab: function() {
        // Automatycznie aktywuj zakładkę "glowna" po wczytaniu strony
        const homeTab = document.getElementById('glowna');
        if (homeTab) {
            // Ukryj wszystkie zakładki
            this.tabContents.forEach(tab => tab.classList.remove('active'));
            // Pokaż stronę główną
            homeTab.classList.add('active');
        }
    },
    
    // Scroll to section smoothly
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    },
    
    // Highlight the active tab based on scroll position
    highlightActiveTab: function() {
        const scrollPosition = window.scrollY + document.querySelector('.navbar').offsetHeight + 50;
        
        // Check which section is in view
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                
                // Remove active class from all links
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[data-tab="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    },
    handleUrlHash: function() {
        // Get the current hash (without the # symbol)
        let hash = window.location.hash.substring(1);
        
        // If hash exists and corresponds to a tab
        if (hash && document.getElementById(hash)) {
            // Find the corresponding navigation link
            const link = document.querySelector(`.nav-link[data-tab="${hash}"]`) || 
                        document.querySelector(`.footer-link[data-tab="${hash}"]`);
            
            if (link) {
                // Activate the tab without scrolling (we're already there because of the hash)
                this.setActiveTab(link, hash);
            }
        } else {
            // If no hash or invalid hash, set default active tab
            this.setDefaultActiveTab();
        }
    }
};

/**
 * Gallery Module - Handles gallery functionality
 */
const galleryModule = {
    // Gallery images array
    images: [
        'img/gallery/1.jpg',
        'img/gallery/2.jpg',
        'img/gallery/3.jpg',
        'img/gallery/5.jpg',
        'img/gallery/6.jpg',
        'img/gallery/7.jpg',
        'img/gallery/8.jpg',
        'img/gallery/9.jpg',
        'img/gallery/10.jpg',
        'img/gallery/11.jpg',
        'img/gallery/12.jpg',
        'img/gallery/13.jpg'
    ],
    
    // Current image index
    currentIndex: 0,
    
    // Initialize gallery functionality
    init: function() {
        this.galleryContainer = document.getElementById('galleryContainer');
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        
        // Generate gallery items
        this.generateGallery();
        
        // Setup modal closing
        if (this.modal) {
            // Close modal when clicking outside the image
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Setup key press events for modal
            document.addEventListener('keydown', (e) => {
                if (this.modal.style.display === 'flex') {
                    if (e.key === 'Escape') {
                        this.closeModal();
                    } else if (e.key === 'ArrowLeft') {
                        this.prevImage();
                    } else if (e.key === 'ArrowRight') {
                        this.nextImage();
                    }
                }
            });
        }
    },
    
    // Generate gallery items
    generateGallery: function() {
        if (!this.galleryContainer) return;
        
        // Clear container
        this.galleryContainer.innerHTML = '';
        
        // Generate gallery items
        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.backgroundImage = `url('${image}')`;
            galleryItem.setAttribute('data-index', index);
            galleryItem.addEventListener('click', () => this.openModal(index));
            
            this.galleryContainer.appendChild(galleryItem);
        });
    },
    
    // Open modal with selected image
    openModal: function(index) {
        if (!this.modal || !this.modalImg) return;
        
        this.currentIndex = index;
        this.modalImg.src = this.images[index];
        this.modal.style.display = 'flex';
    },
    
    // Close modal
    closeModal: function() {
        if (!this.modal) return;
        this.modal.style.display = 'none';
    },
    
    // Show previous image
    prevImage: function() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.images.length - 1;
        }
        
        if (this.modalImg) {
            this.modalImg.src = this.images[this.currentIndex];
        }
    },
    
    // Show next image
    nextImage: function() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        
        if (this.modalImg) {
            this.modalImg.src = this.images[this.currentIndex];
        }
    }
};

/**
 * Animation Module - Handles scroll animations
 */
const animationModule = {
    // Initialize animations
    init: function() {
        this.elements = [
            ...document.querySelectorAll('.feature-card'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.price-card')
        ];
        
        // Setup scroll event
        window.addEventListener('scroll', this.handleScrollAnimation.bind(this));
        
        // Trigger once on load
        this.handleScrollAnimation();
    },
    
    // Check if element is in viewport
    isElementInView: function(el, offset = 150) {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= window.innerHeight - offset;
    },
    
    // Add animation class to elements in view
    handleScrollAnimation: function() {
        this.elements.forEach(el => {
            if (this.isElementInView(el, 150)) {
                el.classList.add('scrolled');
            } else {
                el.classList.remove('scrolled');
            }
        });
    }
};

/**
 * Form Module - Handles form validation and submission
 */
const formModule = {
    // Initialize form functionality
    init: function() {
        this.contactForm = document.getElementById('contactForm');
        
        // Setup form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },
    
    // Handle form submission
    handleSubmit: function(e) {
        e.preventDefault();
        
        // Basic form validation
        if (this.validateForm()) {
            // Simulate form submission (replace with actual form submission)
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            this.contactForm.reset();
        }
    },
    
    // Validate form fields
    validateForm: function() {
        let isValid = true;
        const requiredFields = this.contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Proszę wypełnić wszystkie wymagane pola formularza.');
        }
        
        return isValid;
    }
};

/**
 * Helper Functions
 */
function scrollToSection(sectionId) {
    // Find the link for this section and simulate a click
    const link = document.querySelector(`.nav-link[data-tab="${sectionId}"]`);
    if (link) {
        link.click();
    } else {
        // Fallback if link not found
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }
}