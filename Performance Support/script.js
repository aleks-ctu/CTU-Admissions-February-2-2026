// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const allLinks = document.querySelectorAll('.box-link');

    // Create modal overlay structure
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'search-modal-overlay';
    modalOverlay.id = 'searchModalOverlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'search-modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'search-modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'search-modal-title';
    modalTitle.textContent = 'Search Results';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'search-modal-close';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close search');
    
    const resultsCount = document.createElement('span');
    resultsCount.className = 'search-results-count';
    resultsCount.id = 'searchResultsCount';
    
    const resultsList = document.createElement('div');
    resultsList.className = 'search-results-list';
    resultsList.id = 'searchResultsList';
    
    const noResults = document.createElement('div');
    noResults.className = 'search-no-results';
    noResults.id = 'searchNoResults';
    noResults.style.display = 'none';
    noResults.innerHTML = '<p>No results found. Try a different search term.</p>';
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(resultsCount);
    modalHeader.appendChild(closeButton);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(resultsList);
    modalContent.appendChild(noResults);
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Build search index with category information
    function buildSearchIndex() {
        const index = [];
        allLinks.forEach(link => {
            const box = link.closest('.content-box');
            const category = box ? box.querySelector('.box-title').textContent : 'Unknown';
            index.push({
                element: link,
                text: link.textContent.trim(),
                href: link.getAttribute('href'),
                category: category
            });
        });
        return index;
    }

    const searchIndex = buildSearchIndex();

    function showModal() {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function hideModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let results = [];
        
        if (searchTerm === '') {
            // Show all results when search is empty
            results = searchIndex;
        } else {
            // Filter results based on search term
            results = searchIndex.filter(item => 
                item.text.toLowerCase().includes(searchTerm)
            );
        }

        // Show modal
        showModal();

        // Display results
        if (results.length === 0) {
            // Show no results message
            resultsList.innerHTML = '';
            noResults.style.display = 'block';
            resultsCount.textContent = '0 results';
        } else {
            // Hide no results message
            noResults.style.display = 'none';
            
            // Update results count
            resultsCount.textContent = `${results.length} ${results.length === 1 ? 'result' : 'results'}`;

            // Build results list
            resultsList.innerHTML = '';
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                const resultLink = document.createElement('a');
                resultLink.className = 'search-result-link';
                resultLink.href = result.href || '#';
                resultLink.setAttribute('target', '_blank');
                resultLink.textContent = result.text;
                resultLink.addEventListener('click', function(e) {
                    if (result.href === '#') {
                        e.preventDefault();
                    } else {
                        hideModal();
                    }
                });
                
                const resultCategory = document.createElement('div');
                resultCategory.className = 'search-result-category';
                resultCategory.textContent = `in ${result.category}`;
                
                resultItem.appendChild(resultLink);
                resultItem.appendChild(resultCategory);
                resultsList.appendChild(resultItem);
            });
        }
    }

    // Search on button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Close modal on Escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideModal();
            }
        });
    }

    // Close modal when clicking close button
    closeButton.addEventListener('click', hideModal);

    // Close modal when clicking overlay (outside modal content)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Navigation button handlers
    const opsRequestButton = document.getElementById('ops-request');
    const knowledgeCenterButton = document.getElementById('knowledge-center');
    const newHireButton = document.getElementById('new-hire');

    if (opsRequestButton) {
        opsRequestButton.addEventListener('click', function() {
            window.open('https://apps.powerapps.com/play/e/default-144ec532-2c21-4430-bf7f-49f02b8a67d7/a/cb1509c5-a4ef-4f0f-a5a3-31f6c9e4d4af?tenantId=144ec532-2c21-4430-bf7f-49f02b8a67d7', '_blank');
        });
    }

    if (knowledgeCenterButton) {
        knowledgeCenterButton.addEventListener('click', function() {
            window.open('file:///S:/CTU%20Admissions/Live%20Sites/KC/index.html', '_blank');
        });
    }

    if (newHireButton) {
        newHireButton.addEventListener('click', function() {
            window.open('https://livecareered.sharepoint.com/sites/CTU/admissions/New%20Hire%20Homepage/New_Hire_Webpage_Advisor.aspx', '_blank');
        });
    }

    // Group links by prefix and add spacing
    function groupLinksByPrefix() {
        const prefixGroups = ['CTUO/CD', 'CTUO', 'CTU', 'CD', 'COS'];
        
        // Process each content box
        document.querySelectorAll('.box-content').forEach(boxContent => {
            const links = Array.from(boxContent.querySelectorAll('.box-link'));
            if (links.length === 0) return;
            
            let previousPrefix = null;
            
            links.forEach((link, index) => {
                const linkText = link.textContent.trim();
                let currentPrefix = null;
                
                // Check for prefix matches (order matters - check longer prefixes first)
                for (const prefix of prefixGroups) {
                    if (linkText.startsWith(prefix)) {
                        currentPrefix = prefix;
                        break;
                    }
                }
                
                // If no prefix matches, it's in the "other" group
                if (currentPrefix === null) {
                    currentPrefix = 'other';
                }
                
                // Add spacing if prefix changed (but not for the first link)
                if (index > 0 && previousPrefix !== null && currentPrefix !== previousPrefix) {
                    link.classList.add('link-group-separator');
                }
                
                previousPrefix = currentPrefix;
            });
        });
    }
    
    // Run link grouping on page load
    groupLinksByPrefix();

    // Add cd-link class to links whose text starts with "CD" (for blue hover color)
    document.querySelectorAll('.box-link').forEach(link => {
        if (link.textContent.trim().startsWith('CD')) {
            link.classList.add('cd-link');
        }
    });

    // CTU Prospective Student - audio items by category (replace titles and audio paths with your files)
    const ctuProspectiveStudentContent = {
        softSkills: [
            { title: 'Building Rapport 1', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Building%20Rapport.m4a' },
            { title: 'Building Rapport 2', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Building%20Rapport%202.m4a' },
            { title: 'PFAB', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/PFAB.m4a' },
            { title: 'Congratulating Student on Applying', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Congratulating%20Student%20on%20Applying.m4a' },
            { title: 'NEW Congratulations & Communication', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Congratulations%20and%20Communication.wav' },
            { title: 'Setting Welcome Call Agenda', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Welcome%20Call%20Agenda.m4a' }
        ],
        interviewSkills: [
            { title: 'Introduction', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Introduction.m4a' },
            { title: 'Education', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Education.m4a' },
            { title: 'Experience', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Experience.m4a' },
            { title: 'Using Admissions FAQ', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Prospective%20Student/Using%20Admissions%20FAQ.m4a' }
        ]
    };

    // CTU Student Prep Conversations - Soft Skills with one item
    const ctuStudentPrepContent = {
        softSkills: [
            { title: 'NEW CTU Features', audioSrc: 'https://livecareered.sharepoint.com/sites/CTU/admissions/Admissions%20Forms/Training%20Call%20Library/CTU%20Student%20Prep%20Conversations/Student%20Prep_CTU%20Features_Call%20Clip.m4a' }
        ]
    };

    function buildAudioCategorySection(headerText, items) {
        const section = document.createElement('div');
        section.className = 'training-audio-section';

        const header = document.createElement('h4');
        header.className = 'training-category-header';
        header.textContent = headerText;
        section.appendChild(header);

        items.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'training-audio-item';

            const itemTitle = document.createElement('button');
            itemTitle.type = 'button';
            itemTitle.className = 'training-audio-item-title';
            if (item.title.startsWith('NEW ')) {
                itemTitle.innerHTML = '<span class="training-audio-title-text"><span class="training-audio-new">NEW</span> ' + item.title.slice(4) + '</span>';
            } else {
                itemTitle.innerHTML = '<span class="training-audio-title-text">' + item.title + '</span>';
            }
            itemTitle.setAttribute('aria-expanded', 'false');
            itemTitle.setAttribute('aria-controls', 'audio-player-' + item.title.replace(/\s+/g, '-').toLowerCase());

            const playerWrap = document.createElement('div');
            playerWrap.className = 'training-audio-item-player';
            playerWrap.id = 'audio-player-' + item.title.replace(/\s+/g, '-').toLowerCase();
            playerWrap.setAttribute('hidden', '');

            const playerInner = document.createElement('div');
            playerInner.className = 'training-audio-player-wrap';

            const audio = document.createElement('audio');
            audio.controls = true;
            audio.preload = 'metadata';
            audio.src = item.audioSrc;
            audio.className = 'training-audio-player';
            playerInner.appendChild(audio);
            playerWrap.appendChild(playerInner);

            itemTitle.addEventListener('click', function() {
                const isExpanded = itemRow.classList.toggle('expanded');
                playerWrap.hidden = !isExpanded;
                itemTitle.setAttribute('aria-expanded', isExpanded);
            });

            itemRow.appendChild(itemTitle);
            itemRow.appendChild(playerWrap);
            section.appendChild(itemRow);
        });

        return section;
    }

    function buildComingSoonCategorySection(headerText) {
        const section = document.createElement('div');
        section.className = 'training-audio-section';

        const header = document.createElement('h4');
        header.className = 'training-category-header';
        header.textContent = headerText;
        section.appendChild(header);

        const comingSoon = document.createElement('p');
        comingSoon.className = 'training-coming-soon';
        comingSoon.textContent = 'Coming soon!';
        section.appendChild(comingSoon);

        return section;
    }

    // Training button dropdown functionality
    function initializeTrainingButtons() {
        const trainingButtons = document.querySelectorAll('.training-button');

        trainingButtons.forEach(button => {
            // Create dropdown container for content
            const dropdown = document.createElement('div');
            dropdown.className = 'training-dropdown';

            // Get the button text to determine content
            const buttonText = button.textContent.trim();
            const parentBox = button.closest('.training-library-box');
            const boxTitle = parentBox ? parentBox.querySelector('.box-title').textContent : '';

            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'training-dropdown-content';

            // CTU Training Call Library - Prospective Student: show audio categories
            if (buttonText === 'Prospective Student' && boxTitle.includes('CTU')) {
                contentWrapper.appendChild(buildAudioCategorySection('Soft Skills', ctuProspectiveStudentContent.softSkills));
                contentWrapper.appendChild(buildAudioCategorySection('Interview Skills', ctuProspectiveStudentContent.interviewSkills));
            } else if (buttonText === 'Student Prep Conversations' && boxTitle.includes('CTU')) {
                contentWrapper.appendChild(buildAudioCategorySection('Soft Skills', ctuStudentPrepContent.softSkills));
            } else if (boxTitle.includes('Coding Dojo')) {
                contentWrapper.appendChild(buildComingSoonCategorySection('Soft Skills'));
                contentWrapper.appendChild(buildComingSoonCategorySection('Interview Skills'));
            } else {
                // Placeholder for other buttons
                const placeholder = document.createElement('div');
                placeholder.className = 'training-dropdown-item';
                placeholder.textContent = `Content for ${buttonText} in ${boxTitle}`;
                placeholder.style.fontStyle = 'italic';
                placeholder.style.color = '#666';
                contentWrapper.appendChild(placeholder);
            }

            dropdown.appendChild(contentWrapper);
            
            // Insert dropdown after the training-content container
            const trainingContent = button.closest('.training-content');
            if (trainingContent) {
                trainingContent.parentNode.insertBefore(dropdown, trainingContent.nextSibling);
            }
            
            // Toggle dropdown on button click
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns in the same box
                const parentBox = button.closest('.training-library-box');
                const otherButtons = parentBox.querySelectorAll('.training-button');
                const otherDropdowns = parentBox.querySelectorAll('.training-dropdown');
                
                otherButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.classList.remove('active');
                    }
                });
                
                otherDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown and button state
                const isActive = button.classList.contains('active');
                if (isActive) {
                    button.classList.remove('active');
                    dropdown.classList.remove('active');
                } else {
                    button.classList.add('active');
                    dropdown.classList.add('active');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.training-library-box')) {
                document.querySelectorAll('.training-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.training-dropdown').forEach(dd => {
                    dd.classList.remove('active');
                });
            }
        });
    }
    
    // Initialize training buttons
    initializeTrainingButtons();
});
