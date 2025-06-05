

// Global variables
let isRSVPSubmitted = false;
let userName = '';
let attendeesCount = '';
let isMusicPlaying = false;
let countdownInterval;

// Rundown data
const rundownData = [
    { 
        waktu: "16.00 – 16.15", 
        deskripsi: "ABSEN: Panitia, MC, dan Guru", 
        area: "📍 Lapangan " 
    },
    { 
        waktu: "16.20 – 16.25", 
        deskripsi: "Pembukaan acara oleh MC", 
        area: "📍 Lapangan " 
    },
    { 
        waktu: "16.30 – 16.35", 
        deskripsi: "Doa bersama", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "16.40 – 16.50", 
        deskripsi: "Pembukaan dan sambutan Kepala Sekolah", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "17.00 – 17.15", 
        deskripsi: "Sambutan ketua rohis", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "17.20 – 17.30", 
        deskripsi: "pembacaan ayat suci Al-Qur'an", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "17.35 – 17.45", 
        deskripsi: "Ceramah oleh Ustadz", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "17.50 – 17.55", 
        deskripsi: "Membaca doa berbuka puasa", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "18.00 – 18.05", 
        deskripsi: "Adzan Maghrib dan berbuka puasa", 
        area: "📍 Lapangan" 
    },
    { 
        waktu: "18.10 – 18.20", 
        deskripsi: "Sholat Maghrib berjamaah", 
        area: "📍 Mushola" 
    },
    { 
        waktu: "18.20 – 18.50", 
        deskripsi: "makan berat bersama lalu pulang kerumah masing-masing", 
        area: "📍 Lapangan" 
    }
];

// DOM elements
const rsvpPage = document.getElementById('rsvpPage');
const invitationPage = document.getElementById('invitationPage');
const rsvpForm = document.getElementById('rsvpForm');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const backgroundMusic = document.getElementById('backgroundMusic');
const mapBtn = document.getElementById('mapBtn');
const attendanceInfo = document.getElementById('attendanceInfo');
const rundownContainer = document.getElementById('rundownContainer');

// Event date for countdown
const eventDate = new Date("June 3, 2025 07:00:00").getTime();

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bukber Invitation app initialized');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Generate rundown
    generateRundown();
    
    // Start countdown timer
    startCountdown();
    
    // Set initial music button state
    updateMusicButton();
});

function setupEventListeners() {
    // RSVP form submission
    rsvpForm.addEventListener('submit', handleRSVPSubmit);
    
    // Music toggle
    musicBtn.addEventListener('click', toggleMusic);
    
    // Map button
    mapBtn.addEventListener('click', openMap);
}

function handleRSVPSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const attendeesInput = document.getElementById('attendees');
    
    userName = nameInput.value.trim();
    attendeesCount = attendeesInput.value.trim();
    
    if (!userName || !attendeesCount) {
        showToast('Form tidak lengkap', 'Mohon isi nama dan jumlah tamu yang hadir', 'error');
        return;
    }
    
    isRSVPSubmitted = true;
    
    // Update attendance info
    attendanceInfo.textContent = `${userName} (${attendeesCount} orang)`;
    
    // Show invitation page
    rsvpPage.classList.add('hidden');
    invitationPage.classList.remove('hidden');
    
    // Show success toast
    showToast('Selamat Datang!', `Terima kasih ${userName}, kami menantikan kehadiran Anda`, 'success');
    
    // Re-initialize animations for new content
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

function toggleMusic() {
    console.log('Toggle music clicked, current state:', isMusicPlaying);
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        showToast('Musik Dijeda', 'Musik dijeda', 'info');
    } else {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            showToast('Musik Dimulai', 'Musik sedang diputar', 'success');
        }).catch((error) => {
            console.error('Audio play failed:', error);
            showToast('Audio Error', 'Tidak dapat memutar musik. Pastikan file rmdn.mp3 ada di folder yang sama.', 'error');
        });
    }
    
    updateMusicButton();
}

function updateMusicButton() {
    if (isMusicPlaying) {
        // Change icon to pause
        musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
    } else {
        // Change icon to play
        musicIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a3 3 0 003-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l4-2v4l-4-2z"></path>`;
    }
}

function openMap() {
    window.open("https://maps.google.com/?q=Jl. Siaga No.9, RT.9/RW.6, Kb. Kosong, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10630", "_blank");
}

function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Show toast
    toast.classList.remove('translate-x-full');
    toast.classList.add('translate-x-0');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
    }, 3000);
}

function startCountdown() {
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }
    }, 1000);
}

function generateRundown() {
    rundownData.forEach((item, index) => {
        const rundownItem = document.createElement('div');
        rundownItem.className = 'bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#fff8f8]/20';
        
        rundownItem.innerHTML = `
            <div class="flex flex-col space-y-2">
                <div class="font-bold text-[#fff8f8] text-lg">${item.waktu}</div>
                <div class="text-gray-800 font-medium">${item.deskripsi}</div>
                <div class="text-gray-600 text-sm">${item.area}</div>
            </div>
        `;
        
        rundownContainer.appendChild(rundownItem);
    });
}

function initializeAnimations() {
    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements after a short delay
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }, 100);
}

// Handle music ended event
backgroundMusic.addEventListener('ended', function() {
    isMusicPlaying = false;
    updateMusicButton();
});

// Handle music pause event
backgroundMusic.addEventListener('pause', function() {
    isMusicPlaying = false;
    updateMusicButton();
});

// Handle music play event
backgroundMusic.addEventListener('play', function() {
    isMusicPlaying = true;
    updateMusicButton();
});
// Handle window unload to stop music
window.addEventListener('beforeunload', function() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
    }
});