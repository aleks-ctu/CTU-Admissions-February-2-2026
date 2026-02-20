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
        'conclusion': 'conclusion-section'
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
    const programDetailsBoxBSN = document.getElementById('programDetailsBoxBSN');
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
        },
        'ASBA': {
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
                examCount: '12',
                civCredits: '42.5 credits',
                civTuition: '$14,450 tuition',
                milCredits: '42.5 credits',
                milTuition: '$8,925 tuition'
            }
        },
        'BSACC': {
            programLength: {
                fullTime: '30 mos.',
                fullTimeLong: '(2 yr. 6 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '57 mos.',
                partTimeLong: '(4 yr. 9 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,670 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '15',
                civCredits: '120 credits',
                civTuition: '$40,800 tuition',
                milCredits: '120 credits',
                milTuition: '$25,200 tuition'
            }
        },
        'BSBA': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Business Development': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Data Analytics': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Digital Marketing': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Finance': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Healthcare Management': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Human Resource Management': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Information Technology': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '17',
                civCredits: '107 credits',
                civTuition: '$36,380 tuition',
                milCredits: '107 credits',
                milTuition: '$22,470 tuition'
            }
        },
        'BSBA - Logistics/Supply Chain Management': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Management': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSBA - Marketing': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSCE': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: 'N/A',
                partTimeLong: ''
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$67,570 total program cost',
                milPch: '$210 PCH',
                milTotal: '$40,160 total program cost'
            },
            fastTrack: {
                examCount: '2',
                civCredits: '177 credits',
                civTuition: '$60,180 tuition',
                milCredits: '177 credits',
                milTuition: '$37,170 tuition'
            }
        },
        'BSCS': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '59 mos.',
                partTimeLong: '(4 yr. 11 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,450 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '3',
                civCredits: '170 credits',
                civTuition: '$57,800 tuition',
                milCredits: '170 credits',
                milTuition: '$35,700 tuition'
            }
        },
        'BSCS - Cybersecurity Engineering': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '59 mos.',
                partTimeLong: '(4 yr. 11 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,450 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '2',
                civCredits: '174 credits',
                civTuition: '$59,160 tuition',
                milCredits: '174 credits',
                milTuition: '$36,540 tuition'
            }
        },
        'BSCS - Data Science': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '59 mos.',
                partTimeLong: '(4 yr. 11 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,450 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '3',
                civCredits: '170 credits',
                civTuition: '$57,800 tuition',
                milCredits: '170 credits',
                milTuition: '$35,700 tuition'
            }
        },
        'BSCS - Software Engineering': {
            programLength: {
                fullTime: '31 mos.',
                fullTimeLong: '(2 yr. 7 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '59 mos.',
                partTimeLong: '(4 yr. 11 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,450 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '3',
                civCredits: '170 credits',
                civTuition: '$57,800 tuition',
                milCredits: '170 credits',
                milTuition: '$35,700 tuition'
            }
        },
        'BSCJ': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '57 mos.',
                partTimeLong: '(4 yr. 9 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,330 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,220 total program cost'
            },
            fastTrack: {
                examCount: '4',
                civCredits: '164.5 credits',
                civTuition: '$55,930 tuition',
                milCredits: '164.5 credits',
                milTuition: '$34,545 tuition'
            }
        },
        'BSCJ - Forensic Investigation': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '40 mos.',
                standardLong: '(3 yr. 4 mos.)',
                partTime: 'N/A',
                partTimeLong: ''
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,405 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,220 total program cost'
            },
            fastTrack: {
                examCount: '7',
                civCredits: '152.5 credits',
                civTuition: '$51,850 tuition',
                milCredits: '152.5 credits',
                milTuition: '$32,025 tuition'
            }
        },
        'BSCJ - Human Services': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '55 mos.',
                partTimeLong: '(4 yr. 7 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,450 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,430 total program cost'
            },
            fastTrack: {
                examCount: '4',
                civCredits: '165.5 credits',
                civTuition: '$56,270 tuition',
                milCredits: '165.5 credits',
                milTuition: '$34,756 tuition'
            }
        },
        'BSEE': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: 'N/A',
                partTimeLong: ''
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$67,640 total program cost',
                milPch: '$210 PCH',
                milTotal: '$40,160 total program cost'
            },
            fastTrack: {
                examCount: '2',
                civCredits: '177 credits',
                civTuition: '$60,180 tuition',
                milCredits: '177 credits',
                milTuition: '$37,170 tuition'
            }
        },
        'BSHCM': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '57 mos.',
                partTimeLong: '(4 yr. 9 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,650 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '10',
                civCredits: '138 credits',
                civTuition: '$46,920 tuition',
                milCredits: '138 credits',
                milTuition: '$28,980 tuition'
            }
        },
        'BSHCM - Health Informatics': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '57 mos.',
                partTimeLong: '(4 yr. 9 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,650 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '10',
                civCredits: '138 credits',
                civTuition: '$46,920 tuition',
                milCredits: '138 credits',
                milTuition: '$28,980 tuition'
            }
        },
        'BSIT': {
            programLength: {
                fullTime: '30 mos.',
                fullTimeLong: '(2 yr. 6 mos.)',
                standard: '39 mos.',
                standardLong: '(3 yr. 3 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$66,010 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,640 total program cost'
            },
            fastTrack: {
                examCount: '5',
                civCredits: '160.5 credits',
                civTuition: '$54,570 tuition',
                milCredits: '160.5 credits',
                milTuition: '$33,705 tuition'
            }
        },
        'BSM': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '14',
                civCredits: '119.5 credits',
                civTuition: '$40,630 tuition',
                milCredits: '119.5 credits',
                milTuition: '$25,095 tuition'
            }
        },
        'BSM - Food Service Management': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '13',
                civCredits: '123.5 credits',
                civTuition: '$41,990 tuition',
                milCredits: '123.5 credits',
                milTuition: '$25,935 tuition'
            }
        },
        'BSPM': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$64,430 total program cost',
                milPch: '$210 PCH',
                milTotal: '$37,800 total program cost'
            },
            fastTrack: {
                examCount: '16',
                civCredits: '111 credits',
                civTuition: '$37,740 tuition',
                milCredits: '111 credits',
                milTuition: '$23,310 tuition'
            }
        },
        'BSPSYCH': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,110 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,220 total program cost'
            },
            fastTrack: {
                examCount: '3',
                civCredits: '168.5 credits',
                civTuition: '$57,290 tuition',
                milCredits: '168.5 credits',
                milTuition: '$35,385 tuition'
            }
        },
        'BSPSYCH - Organizational Behavior': {
            programLength: {
                fullTime: '29 mos.',
                fullTimeLong: '(2 yr. 5 mos.)',
                standard: '37 mos.',
                standardLong: '(3 yr. 1 mos.)',
                partTime: '56 mos.',
                partTimeLong: '(4 yr. 8 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$65,110 total program cost',
                milPch: '$210 PCH',
                milTotal: '$38,220 total program cost'
            },
            fastTrack: {
                examCount: '3',
                civCredits: '168.5 credits',
                civTuition: '$57,290 tuition',
                milCredits: '168.5 credits',
                milTuition: '$35,385 tuition'
            }
        },
        'MBA': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Accounting': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Data Analytics': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Entrepreneurship': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Finance': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Healthcare Management': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Human Resource Management': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Marketing': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Operations/Supply Chain Management': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MBA - Project Management': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSCS': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSCS - Cybersecurity Engineering': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSCS - Software Engineering': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSCJ': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSCJ - Homeland Security': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSHCM': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: '1',
                civCredits: '44 credits',
                civTuition: '$26,840 tuition',
                milCredits: '44 credits',
                milTuition: '$20,240 tuition'
            }
        },
        'MSHCM - Informatics': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: '1',
                civCredits: '44 credits',
                civTuition: '$26,840 tuition',
                milCredits: '44 credits',
                milTuition: '$20,240 tuition'
            }
        },
        'MSIT': {
            foundationRequirements: true,
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSM': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSM - Organizational Leadership & Change': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: '10 mos.',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$610 PCH',
                civTotal: '$30,800 total program cost',
                milPch: '$460 PCH',
                milTotal: '$22,080 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSN - Family Nurse Practitioner': {
            programLength: {
                fullTime: 'n/a',
                fullTimeLong: '',
                standard: '22 mos.',
                standardLong: '(1 yr. 10 mos.) *Refer to as FT.',
                partTime: '24 mos.',
                partTimeLong: '(2 yr.) *Refer to as standard.'
            },
            tuition: {
                civPch: '$540 PCH',
                civTotal: '$38,850 total program cost',
                milPch: '$440 PCH',
                milTotal: '$29,920 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSN - Nursing Administration': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$370 PCH',
                civTotal: '$19,280 total program cost',
                milPch: '$370 PCH',
                milTotal: '$17,760 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'MSN - Nursing Education': {
            programLength: {
                fullTime: 'N/A',
                fullTimeLong: '',
                standard: 'N/A',
                standardLong: '',
                partTime: '16 mos.',
                partTimeLong: '(1 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$370 PCH',
                civTotal: '$19,280 total program cost',
                milPch: '$370 PCH',
                milTotal: '$17,760 total program cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'PGC - Family Nurse Practitioner': {
            programLength: {
                fullTime: 'n/a',
                fullTimeLong: '',
                standard: 'n/a',
                standardLong: '',
                partTime: '19 mos.',
                partTimeLong: '(1 yr. 7 mos.)'
            },
            tuition: {
                civPch: '$540 PCH',
                civTotal: '$14,900 to $29,820 total program cost',
                milPch: '$440 PCH',
                milTotal: '$11,440 to $22,880 total tuition cost'
            },
            fastTrack: {
                examCount: 'N/A',
                civCredits: 'N/A',
                civTuition: 'N/A',
                milCredits: 'N/A',
                milTuition: 'N/A'
            }
        },
        'ASHAS': {
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
                civTotal: '$32,800 total program cost',
                milPch: '$210 PCH',
                milTotal: '$19,215 total program cost'
            },
            fastTrack: {
                examCount: '4',
                civCredits: '74 credits',
                civTuition: '$25,160 tuition',
                milCredits: '74 credits',
                milTuition: '$15,540 tuition'
            }
        },
        'ASM': {
            programLength: {
                fullTime: '15 mos.',
                fullTimeLong: '(1 yr. 3 mos.)',
                standard: '20 mos.',
                standardLong: '(1 yr. 8 mos.)',
                partTime: '28 mos.',
                partTimeLong: '(2 yr. 4 mos.)'
            },
            tuition: {
                civPch: '$340 PCH',
                civTotal: '$33,530 total program cost',
                milPch: '$210 PCH',
                milTotal: '$19,530 total program cost'
            },
            fastTrack: {
                examCount: '10',
                civCredits: '51.5 credits',
                civTuition: '$17,510 tuition',
                milCredits: '51.5 credits',
                milTuition: '$10,815 tuition'
            }
        }
    };

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text || '';
    }

    const programFoundationSection = document.getElementById('programFoundationSection');

    function showProgramDetails(value, label) {
        if (!programDetailsBox || !programDetailsTitle) return;
        if (programDetailsBoxBSN) {
            programDetailsBoxBSN.classList.remove('visible');
            programDetailsBoxBSN.setAttribute('aria-hidden', 'true');
        }
        if (!value) {
            programDetailsBox.classList.remove('visible');
            programDetailsBox.setAttribute('aria-hidden', 'true');
            if (programFoundationSection) programFoundationSection.style.display = 'none';
            return;
        }
        if (value === 'BSN') {
            programDetailsBox.classList.remove('visible');
            programDetailsBox.setAttribute('aria-hidden', 'true');
            if (programDetailsBoxBSN) {
                programDetailsBoxBSN.classList.add('visible');
                programDetailsBoxBSN.setAttribute('aria-hidden', 'false');
            }
            return;
        }
        const data = programData[value];
        programDetailsTitle.textContent = label;
        if (programFoundationSection) {
            programFoundationSection.style.display = (data && data.foundationRequirements) ? 'block' : 'none';
        }
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

    // Commitment Grant button: toggle active state and show/hide content box
    const commitmentGrantBtn = document.getElementById('commitment-grant-btn');
    const commitmentGrantBox = document.getElementById('commitment-grant-box');
    if (commitmentGrantBtn && commitmentGrantBox) {
        commitmentGrantBtn.addEventListener('click', function() {
            this.classList.toggle('financial-aid-option-active');
            commitmentGrantBox.style.display = commitmentGrantBox.style.display === 'none' ? 'block' : 'none';
        });
    }

    // COS Tuition toggle: show/hide COS instruction box
    setupToggle('cos-tuition-toggle', 'cos-tuition-box');

    // Tuition option buttons: Fast Track vs Master's Advantage (mutually exclusive; show one content box)
    const fastTrackBtn = document.getElementById('fast-track-btn');
    const mastersAdvantageBtn = document.getElementById('masters-advantage-btn');
    const fastTrackBox = document.getElementById('fast-track-box');
    const mastersAdvantageBox = document.getElementById('masters-advantage-box');
    if (fastTrackBtn && mastersAdvantageBtn && fastTrackBox && mastersAdvantageBox) {
        function setTuitionOption(activeBtn, activeBox, inactiveBtn, inactiveBox) {
            activeBtn.classList.add('tuition-option-active');
            activeBox.style.display = 'block';
            inactiveBtn.classList.remove('tuition-option-active');
            inactiveBox.style.display = 'none';
        }
        fastTrackBtn.addEventListener('click', function() {
            setTuitionOption(fastTrackBtn, fastTrackBox, mastersAdvantageBtn, mastersAdvantageBox);
        });
        mastersAdvantageBtn.addEventListener('click', function() {
            setTuitionOption(mastersAdvantageBtn, mastersAdvantageBox, fastTrackBtn, fastTrackBox);
        });
    }

    // Program Length: Associate / Bachelor's / Master's (mutually exclusive toggles)
    const plAssociate = document.getElementById('program-length-associate');
    const plBachelors = document.getElementById('program-length-bachelors');
    const plMasters = document.getElementById('program-length-masters');
    const plAssociateBox = document.getElementById('program-length-associate-box');
    const plBachelorsBtns = document.getElementById('program-length-bachelors-buttons');
    const plMastersBtns = document.getElementById('program-length-masters-buttons');
    const plContentBoxes = document.querySelectorAll('.program-length-content');
    const plOptionBtns = document.querySelectorAll('.program-length-option-btn');

    function hideAllProgramLengthContent() {
        plContentBoxes.forEach(function(box) { box.style.display = 'none'; });
        plOptionBtns.forEach(function(btn) { btn.classList.remove('program-length-option-active'); });
    }

    if (plAssociate && plBachelors && plMasters) {
        [plAssociate, plBachelors, plMasters].forEach(function(toggle) {
            toggle.addEventListener('change', function() {
                if (!this.checked) return;
                document.querySelectorAll('input[name="program-length-level"]').forEach(function(t) {
                    if (t !== toggle) t.checked = false;
                });
                hideAllProgramLengthContent();
                if (plBachelorsBtns) plBachelorsBtns.style.display = 'none';
                if (plMastersBtns) plMastersBtns.style.display = 'none';
                if (toggle === plAssociate && plAssociateBox) {
                    plAssociateBox.style.display = 'block';
                } else if (toggle === plBachelors && plBachelorsBtns) {
                    plBachelorsBtns.style.display = 'flex';
                } else if (toggle === plMasters && plMastersBtns) {
                    plMastersBtns.style.display = 'flex';
                }
            });
        });
    }

    plOptionBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const program = this.getAttribute('data-program');
            if (!program) return;
            const boxId = 'program-length-' + program + '-box';
            const box = document.getElementById(boxId);
            plOptionBtns.forEach(function(b) {
                b.classList.toggle('program-length-option-active', b === btn);
            });
            plContentBoxes.forEach(function(b) {
                b.style.display = b === box ? 'block' : 'none';
            });
            if (box) box.style.display = 'block';
        });
    });
});
