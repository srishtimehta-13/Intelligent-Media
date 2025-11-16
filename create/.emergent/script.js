// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.getAttribute('data-section');
        
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    });
});

// File upload functionality
const browseBtn = document.querySelector('.browse-btn');
const fileInput = document.getElementById('fileInput');
const uploadArea = document.querySelector('.upload-area');

// Browse button click
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

// Handle file uploads
function handleFiles(files) {
    const fileArray = Array.from(files);
    const fileNames = fileArray.map(file => file.name).join(', ');
    
    alert(`📤 ${files.length} file(s) selected for upload:\n${fileNames}\n\nFiles are being processed by DataFlow AI...`);
    
    // Here you would typically:
    // 1. Upload files to your server
    // 2. Process them with AI
    // 3. Update the UI with results
    
    console.log('Files to upload:', fileArray);
}

// File type button functionality
const fileTypeBtns = document.querySelectorAll('.file-type-btn');

fileTypeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const fileType = btn.textContent.trim();
        
        // Set file input accept attribute based on button clicked
        if (fileType.includes('Images')) {
            fileInput.setAttribute('accept', 'image/*');
        } else if (fileType.includes('Videos')) {
            fileInput.setAttribute('accept', 'video/*');
        } else if (fileType.includes('JSON')) {
            fileInput.setAttribute('accept', '.json');
        }
        
        fileInput.click();
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length > 0) {
        console.log('Searching for:', searchTerm);
        
        // Filter folders based on search term
        const folderCards = document.querySelectorAll('.folder-card');
        
        folderCards.forEach(card => {
            const folderName = card.querySelector('h3').textContent.toLowerCase();
            
            if (folderName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    } else {
        // Show all folders when search is empty
        const folderCards = document.querySelectorAll('.folder-card');
        folderCards.forEach(card => {
            card.style.display = 'block';
        });
    }
});

// Folder card click handlers
const folderCards = document.querySelectorAll('.folder-card');

folderCards.forEach(card => {
    card.addEventListener('click', () => {
        const folderName = card.querySelector('h3').textContent;
        const itemCount = card.querySelector('p').textContent;
        
        alert(`📁 Opening folder: ${folderName}\n${itemCount}`);
        
        // Here you would typically:
        // 1. Navigate to folder view
        // 2. Load and display folder contents
        
        console.log('Opening folder:', folderName);
    });
});

// Database view details buttons
const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const dbCard = btn.closest('.db-card');
        const dbName = dbCard.querySelector('h3').textContent;
        const dbType = dbCard.querySelector('.db-type').textContent;
        const fields = dbCard.querySelector('.stat-value').textContent;
        
        alert(`📊 Database Details\n\nName: ${dbName}\nType: ${dbType}\nFields: ${fields}\n\nOpening detailed schema view...`);
        
        // Here you would typically:
        // 1. Open a modal or new page
        // 2. Show full database schema
        // 3. Allow schema editing
        
        console.log('Viewing details for:', dbName);
    });
});

// Animate progress bars on load
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach((fill, index) => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 300 + (index * 100));
    });
}

// Animate storage bar
function animateStorageBar() {
    const storageFill = document.querySelector('.storage-fill');
    
    if (storageFill) {
        storageFill.style.width = '0%';
        
        setTimeout(() => {
            storageFill.style.width = '10.8%';
        }, 300);
    }
}

// Run animations when analytics section is shown
const analyticsBtn = document.querySelector('[data-section="analytics"]');

if (analyticsBtn) {
    analyticsBtn.addEventListener('click', () => {
        setTimeout(() => {
            animateProgressBars();
            animateStorageBar();
        }, 100);
    });
}

// Simulate real-time updates for "Last Processed" time
function updateLastProcessedTime() {
    const lastProcessedElement = document.querySelector('.metric-value:last-child');
    
    if (lastProcessedElement && lastProcessedElement.textContent.includes('minutes ago')) {
        let minutes = 2;
        
        setInterval(() => {
            minutes++;
            lastProcessedElement.textContent = `⏱️ ${minutes} minutes ago`;
        }, 60000); // Update every minute
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DataFlow AI initialized');
    
    // Animate initial view if on analytics
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection && analyticsSection.classList.contains('active')) {
        animateProgressBars();
        animateStorageBar();
    }
    
    updateLastProcessedTime();
});

// Add hover effects to cards
const allCards = document.querySelectorAll('.feature-card, .stat-card, .info-card, .db-card');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Console easter egg
console.log('%c🚀 DataFlow AI', 'font-size: 24px; font-weight: bold; color: #5B7FED;');
console.log('%cIntelligent Storage & Auto-Organization', 'font-size: 14px; color: #757575;');
console.log('%c\nBuilt with ❤️ for smart data management', 'font-size: 12px; color: #9E9E9E;');

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleFiles,
        animateProgressBars,
        animateStorageBar
    };
}