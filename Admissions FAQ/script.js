// FAQ Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sub-dropdown functionality (e.g., Q53 nested dropdowns)
    document.querySelectorAll('.sub-dropdown').forEach(subDropdown => {
        const header = subDropdown.querySelector('.sub-dropdown-header');
        if (header) {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                subDropdown.classList.toggle('active');
            });
        }
    });

    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add IDs to FAQ items if they don't have them
    faqItems.forEach((item, index) => {
        if (!item.id) {
            const questionText = item.querySelector('.question-text');
            if (questionText) {
                const match = questionText.textContent.match(/Q(\d+)/);
                if (match) {
                    item.id = 'q' + match[1];
                } else {
                    item.id = 'q' + (index + 1);
                }
            }
        }
    });
    
    // Add click event to each FAQ question
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the FAQ item
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items (optional - remove if you want multiple open)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Scroll to Top Button Functionality
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Smooth scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Search Modal Functionality
    const searchLink = document.getElementById('searchLink');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    // Open modal when Search link is clicked
    searchLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchModal.classList.add('show');
        searchInput.focus();
    });

    // Close modal when X button is clicked
    closeSearchModal.addEventListener('click', function() {
        searchModal.classList.remove('show');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    // Close modal when clicking outside of it
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('show');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('show')) {
            searchModal.classList.remove('show');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            searchResults.innerHTML = '';
            return;
        }

        const results = [];
        
        faqItems.forEach(item => {
            const questionText = item.querySelector('.question-text');
            if (questionText) {
                const questionContent = questionText.textContent.toLowerCase();
                if (questionContent.includes(searchTerm)) {
                    results.push({
                        id: item.id,
                        text: questionText.textContent.trim()
                    });
                }
            }
        });

        // Display results
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No questions found matching your search.</div>';
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                const link = document.createElement('a');
                link.href = '#' + result.id;
                link.textContent = result.text;
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetElement = document.getElementById(result.id);
                    if (targetElement) {
                        // Close modal
                        searchModal.classList.remove('show');
                        searchInput.value = '';
                        searchResults.innerHTML = '';
                        
                        // Scroll to question
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            // Expand the question
                            targetElement.classList.add('active');
                        }, 100);
                    }
                });
                resultItem.appendChild(link);
                searchResults.appendChild(resultItem);
            });
        }
    }

    // Search when button is clicked
    searchButton.addEventListener('click', performSearch);

    // Search when Enter key is pressed in input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Dynamic Navigation Sizing - responds to screen size and zoom
    function adjustNavigationSize() {
        const navContent = document.querySelector('.nav-content');
        const navLinks = document.querySelectorAll('.nav-link');
        const navSeparators = document.querySelectorAll('.nav-separator');
        if (!navContent) return;
        
        const viewportWidth = window.innerWidth;
        
        // Font size: scales with viewport (smaller when zoomed in, bigger when zoomed out)
        const baseFontSize = Math.max(9, Math.min(14, viewportWidth * 0.014));
        
        // Padding: ensures text stays visible with margins
        const basePadding = Math.max(25, Math.min(60, viewportWidth / 20));
        
        navLinks.forEach(link => {
            link.style.fontSize = baseFontSize + 'px';
        });
        navSeparators.forEach(separator => {
            separator.style.fontSize = baseFontSize + 'px';
        });
        navContent.style.paddingLeft = basePadding + 'px';
        navContent.style.paddingRight = basePadding + 'px';
    }
    
    adjustNavigationSize();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustNavigationSize, 50);
    });
    
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', adjustNavigationSize);
    }
});
