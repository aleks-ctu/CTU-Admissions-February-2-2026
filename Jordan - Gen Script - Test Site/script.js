// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    const scriptContent = document.getElementById('scriptContent');
    
    // Section mapping for scrolling
    const sectionMap = {
        'introduction': 'introduction-section',
        'interview': 'interview-section',
        'information': 'information-section',
        'program-length': 'information-section', // Program Length is part of Information
        'financial-aid': 'information-section', // Financial Aid is part of Information
        'conclusion': 'information-section' // Conclusion will be added later
    };
    
    // Function to scroll to a section smoothly
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add click event listeners to navigation tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab data attribute
            const tabName = this.getAttribute('data-tab');
            
            // Scroll to the appropriate section
            const sectionId = sectionMap[tabName];
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });
    
    // Sidebar Navigation Functionality - each button toggles its own icon independently (no "selected" state)
    const generalIcon = document.querySelector('.sidebar-item[data-section="general"] .sidebar-icon img');
    const nursingIcon = document.querySelector('.sidebar-item[data-section="nursing"] .sidebar-icon img');
    const militaryIcon = document.querySelector('.sidebar-item[data-section="military"] .sidebar-icon img');
    const chatIcon = document.querySelector('.sidebar-item[data-section="chat"] .sidebar-icon img');
    
    function toggleSidebarIcon(icon, onSrc, offSrc) {
        if (!icon) return;
        const isOn = icon.src.indexOf(onSrc.split('/').pop()) !== -1;
        icon.src = isOn ? offSrc : onSrc;
    }
    
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section === 'general') {
                const generalIsOn = generalIcon && generalIcon.src.indexOf('generalOn') !== -1;
                if (generalIcon) generalIcon.src = generalIsOn ? 'images/generalOff.png' : 'images/generalOn.png';
                if (nursingIcon) nursingIcon.src = 'images/nursingOff.png';
            } else if (section === 'nursing') {
                const nursingIsOn = nursingIcon && nursingIcon.src.indexOf('nursingOn') !== -1;
                if (nursingIcon) nursingIcon.src = nursingIsOn ? 'images/nursingOff.png' : 'images/nursingOn.png';
                if (generalIcon) generalIcon.src = 'images/generalOff.png';
            } else if (section === 'military') {
                toggleSidebarIcon(militaryIcon, 'images/militaryOn.png', 'images/militaryOff.png');
            } else if (section === 'chat') {
                toggleSidebarIcon(chatIcon, 'images/chatOnButton.png', 'images/chatOffButton.png');
            }
            console.log('Sidebar toggled:', section);
        });
    });
    
    // Program details box: show and populate when a program is selected
    const programSelect = document.getElementById('programSelect');
    const programDetailsBox = document.getElementById('programDetailsBox');
    const programDetailsTitle = document.getElementById('programDetailsTitle');

    // Program data: add or edit entries to match each program. Use ASACC as the template.
    const programData = {
        'ASACC': {
            programLength: {
                fullTime: '15 mos.',
                fullTimeLong: '(1 yr. 3 mos.)',
                standard: '19 mos.',
                standardLong: '(1 yr. 7 mos.)',
                partTime: '28 mos.',
                partTimeLong: '(2 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$33,310 total program cost',
                milPch: '$210 PCH',
                milTotal: '$19,530 total program cost'
            },
            fastTrack: {
                examCount: '11',
                civCredits: '46.5 credits',
                civTuition: '$15,810 tuition',
                milCredits: '46.5 credits',
                milTuition: '$9,765 tuition'
            }
        }
        // Add more programs here using the same structure, e.g.:
        // 'ASBA': { programLength: {...}, tuition: {...}, fastTrack: {...} },
    };

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text || '';
    }

    function showProgramDetails(value, label) {
        if (!programDetailsBox || !programDetailsTitle) return;
        if (!value) {
            programDetailsBox.classList.remove('visible');
            programDetailsBox.setAttribute('aria-hidden', 'true');
            return;
        }
        const data = programData[value];
        programDetailsTitle.textContent = label;
        if (data) {
            setText('programLengthFullTime', data.programLength?.fullTime);
            setText('programLengthFullTimeLong', data.programLength?.fullTimeLong);
            setText('programLengthStandard', data.programLength?.standard);
            setText('programLengthStandardLong', data.programLength?.standardLong);
            setText('programLengthPartTime', data.programLength?.partTime);
            setText('programLengthPartTimeLong', data.programLength?.partTimeLong);
            setText('programTuitionCivPch', data.tuition?.civPch);
            setText('programTuitionCivTotal', data.tuition?.civTotal);
            setText('programTuitionMilPch', data.tuition?.milPch);
            setText('programTuitionMilTotal', data.tuition?.milTotal);
            setText('programFastTrackExams', data.fastTrack?.examCount);
            setText('programFastTrackCivCredits', data.fastTrack?.civCredits);
            setText('programFastTrackCivTuition', data.fastTrack?.civTuition);
            setText('programFastTrackMilCredits', data.fastTrack?.milCredits);
            setText('programFastTrackMilTuition', data.fastTrack?.milTuition);
        } else {
            setText('programLengthFullTime', '');
            setText('programLengthFullTimeLong', '');
            setText('programLengthStandard', '');
            setText('programLengthStandardLong', '');
            setText('programLengthPartTime', '');
            setText('programLengthPartTimeLong', '');
            setText('programTuitionCivPch', '');
            setText('programTuitionCivTotal', '');
            setText('programTuitionMilPch', '');
            setText('programTuitionMilTotal', '');
            setText('programFastTrackExams', '');
            setText('programFastTrackCivCredits', '');
            setText('programFastTrackCivTuition', '');
            setText('programFastTrackMilCredits', '');
            setText('programFastTrackMilTuition', '');
        }
        programDetailsBox.classList.add('visible');
        programDetailsBox.setAttribute('aria-hidden', 'false');
    }

    if (programSelect) {
        programSelect.addEventListener('change', function() {
            const value = this.value;
            const label = this.options[this.selectedIndex]?.textContent || value;
            showProgramDetails(value, label);
        });
    }
    
    // Action Button Functionality (DNC and State & Country Restrictions)
    const dncBtn = document.getElementById('dncBtn');
    const dncContent = document.getElementById('dncContent');
    const stateCountryBtn = document.getElementById('stateCountryBtn');
    const stateCountryContent = document.getElementById('stateCountryContent');
    const adaBtn = document.getElementById('adaBtn');
    const adaContent = document.getElementById('adaContent');
    const contentBox = dncContent && dncContent.closest('.content-box');

    function closeOtherPanels(exceptPanelId) {
        if (dncContent && exceptPanelId !== 'dncContent') {
            dncContent.style.display = 'none';
            if (dncBtn) dncBtn.classList.remove('dnc-active');
        }
        if (stateCountryContent && exceptPanelId !== 'stateCountryContent') {
            stateCountryContent.style.display = 'none';
            if (stateCountryBtn) stateCountryBtn.classList.remove('state-country-active');
        }
        if (adaContent && exceptPanelId !== 'adaContent') {
            adaContent.style.display = 'none';
            if (adaBtn) adaBtn.classList.remove('ada-active');
        }
    }

    function updateContentBoxPanelOpen() {
        if (contentBox) {
            const anyOpen = (dncContent && dncContent.style.display === 'block') || (stateCountryContent && stateCountryContent.style.display === 'block') || (adaContent && adaContent.style.display === 'block');
            contentBox.classList.toggle('dnc-panel-open', !!anyOpen);
        }
    }

    if (dncBtn && dncContent) {
        dncBtn.addEventListener('click', function() {
            const isOpen = dncContent.style.display === 'block';
            closeOtherPanels(isOpen ? null : 'dncContent');
            dncContent.style.display = isOpen ? 'none' : 'block';
            dncBtn.classList.toggle('dnc-active', !isOpen);
            updateContentBoxPanelOpen();
        });
    }

    if (stateCountryBtn && stateCountryContent) {
        stateCountryBtn.addEventListener('click', function() {
            const isOpen = stateCountryContent.style.display === 'block';
            closeOtherPanels(isOpen ? null : 'stateCountryContent');
            stateCountryContent.style.display = isOpen ? 'none' : 'block';
            stateCountryBtn.classList.toggle('state-country-active', !isOpen);
            updateContentBoxPanelOpen();
        });
    }

    if (adaBtn && adaContent) {
        adaBtn.addEventListener('click', function() {
            const isOpen = adaContent.style.display === 'block';
            closeOtherPanels(isOpen ? null : 'adaContent');
            adaContent.style.display = isOpen ? 'none' : 'block';
            adaBtn.classList.toggle('ada-active', !isOpen);
            updateContentBoxPanelOpen();
        });
    }

    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        if (button.id === 'dncBtn' || button.id === 'stateCountryBtn' || button.id === 'adaBtn') return;
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            console.log('Action button clicked:', buttonText);
        });
    });
    
    // Toggle Switch Functionality
    function setupToggle(toggleId, targetBoxId, exclusiveGroup = null) {
        const toggle = document.getElementById(toggleId);
        const targetBox = document.getElementById(targetBoxId);
        
        if (toggle && targetBox) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    targetBox.style.display = 'block';
                    
                    // Handle exclusive groups (only one can be active)
                    if (exclusiveGroup) {
                        exclusiveGroup.forEach(item => {
                            if (item.toggleId !== toggleId && item.toggle) {
                                item.toggle.checked = false;
                                if (item.targetBox) {
                                    item.targetBox.style.display = 'none';
                                }
                            }
                        });
                    }
                } else {
                    targetBox.style.display = 'none';
                }
            });
        }
    }
    
    // International Transcripts Toggle
    setupToggle('international-transcripts-toggle', 'international-transcripts-box');
    
    // Internet Access Toggles (mutually exclusive)
    const internetToggles = [
        { toggleId: 'internet-yes-toggle', targetBoxId: 'internet-yes-box' },
        { toggleId: 'internet-no-toggle', targetBoxId: 'internet-no-box' }
    ];
    
    internetToggles.forEach(item => {
        const toggle = document.getElementById(item.toggleId);
        const targetBox = document.getElementById(item.targetBoxId);
        if (toggle && targetBox) {
            item.toggle = toggle;
            item.targetBox = targetBox;
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    targetBox.style.display = 'block';
                    // Uncheck the other toggle
                    const otherItem = internetToggles.find(i => i.toggleId !== item.toggleId);
                    if (otherItem && otherItem.toggle) {
                        otherItem.toggle.checked = false;
                        if (otherItem.targetBox) {
                            otherItem.targetBox.style.display = 'none';
                        }
                    }
                } else {
                    targetBox.style.display = 'none';
                }
            });
        }
    });
    
    // No Plan Toggles (mutually exclusive group)
    const noPlanToggles = [
        { toggleId: 'cos-no-plan-toggle', targetBoxId: 'cos-no-plan-box' },
        { toggleId: 'onl-no-plan-toggle', targetBoxId: 'onl-no-plan-box' },
        { toggleId: 'cg-no-plan-toggle', targetBoxId: 'cg-no-plan-box' }
    ];
    
    noPlanToggles.forEach(item => {
        const toggle = document.getElementById(item.toggleId);
        const targetBox = document.getElementById(item.targetBoxId);
        if (toggle && targetBox) {
            item.toggle = toggle;
            item.targetBox = targetBox;
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    targetBox.style.display = 'block';
                    // Uncheck other toggles in the group
                    noPlanToggles.forEach(otherItem => {
                        if (otherItem.toggleId !== item.toggleId && otherItem.toggle) {
                            otherItem.toggle.checked = false;
                            if (otherItem.targetBox) {
                                otherItem.targetBox.style.display = 'none';
                            }
                        }
                    });
                } else {
                    targetBox.style.display = 'none';
                }
            });
        }
    });
    
    // COS Toggle (for Information section)
    setupToggle('cos-toggle', null);
    const cosToggle = document.getElementById('cos-toggle');
    const cosToggleText = document.querySelector('.cos-toggle-text');
    if (cosToggle && cosToggleText) {
        cosToggle.addEventListener('change', function() {
            if (this.checked) {
                cosToggleText.style.display = 'inline';
            } else {
                cosToggleText.style.display = 'none';
            }
        });
    }
});
