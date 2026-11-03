/**
 * Wedding E-Invite & Registration Application
 * Date: November 14, 2026
 */

// Default Configuration State
const DEFAULT_CONFIG = {
  groom: "Emmanuel",
  bride: "Haliyah",
  weddingDate: "2026-11-14T10:00:00",
  hashtag: "#EmmanuelAndHaliyah2026",
  tagline: "Two Souls, One Divine Covenant in Christ",
  bank: {
    accountName: "Emmanuel & Haliyah Wedding Fund",
    bankName: "Guaranty Trust Bank (GTBank)",
    accountNumber: "0789456123",
    sortCode: "058"
  },
  venues: {
    engagement: {
      title: "Traditional Engagement Ceremony",
      time: "10:00 AM",
      dateFormatted: "Saturday, November 14, 2026",
      location: "Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos",
      mapsQuery: "Eko Club, Bode Thomas Street, Surulere, Lagos",
      dressCode: "Emerald Green & Champagne Gold (Traditional Glamour)"
    },
    whiteWedding: {
      title: "White Wedding & Holy Matrimony",
      time: "12:00 PM",
      dateFormatted: "Saturday, November 14, 2026",
      location: "Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos",
      mapsQuery: "Eko Club, Bode Thomas Street, Surulere, Lagos",
      dressCode: "Formal Elegance / Black Tie & Champagne Gold Accents"
    }
  }
};

// Initial Sample Wishes
const DEFAULT_WISHES = [
  {
    id: "wish-1",
    name: "Pastor & Mrs. Adebayo",
    message: "May your marriage be anchored on the Rock of Ages, blessed with enduring peace, fruitfulness, and divine joy. Congratulations to Emmanuel & Haliyah!",
    date: "Nov 3, 2026",
    likes: 18
  },
  {
    id: "wish-2",
    name: "Folashade Balogun",
    message: "Watching God unfold your love story has been pure joy! Haliyah, you are an angelic bride, and Emmanuel, you found your good thing. Can't wait to dance till morning!",
    date: "Nov 3, 2026",
    likes: 24
  },
  {
    id: "wish-3",
    name: "Tunde & Amanda Johnson",
    message: "Wishing you a lifetime of laughter, deep companionship, and unending grace. Beautiful portraits! See you on the dance floor!",
    date: "Nov 2, 2026",
    likes: 12
  }
];

// App State
class WeddingApp {
  constructor() {
    this.config = this.loadConfig();
    this.guests = this.loadGuests();
    this.wishes = this.loadWishes();
    this.audioContext = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentLightboxIndex = 0;
    this.galleryImages = [
      {
        src: 'assets/images/couple-modern.jpg',
        title: 'The Promise of Forever',
        desc: 'Wrapped in light and timeless grace, we pledge our tomorrows together.'
      },
      {
        src: 'assets/images/couple-dance.jpg',
        title: 'The Dance of Pure Joy',
        desc: 'Stepping into marital bliss with vibrant rhythm, song, and celebration.'
      },
      {
        src: 'assets/images/couple-regal.jpg',
        title: 'Regal Heritage & Culture',
        desc: 'Honoring our ancestry and traditions draped in emerald green and woven gold.'
      },
      {
        src: 'assets/images/couple-embrace.jpg',
        title: 'Two Hearts, One Sanctuary',
        desc: 'An embrace that speaks deeper than words — finding our home in one another.'
      }
    ];

    this.init();
  }

  loadConfig() {
    const saved = localStorage.getItem('wedding_config');
    if (!saved) return DEFAULT_CONFIG;
    try {
      const parsed = JSON.parse(saved);
      // Migrate from old placeholder if present
      if (parsed.bride !== "Haliyah" || parsed.groom !== "Emmanuel") {
        localStorage.setItem('wedding_config', JSON.stringify(DEFAULT_CONFIG));
        return DEFAULT_CONFIG;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  saveConfig() {
    localStorage.setItem('wedding_config', JSON.stringify(this.config));
  }

  loadGuests() {
    const saved = localStorage.getItem('wedding_registered_guests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Seed with initial demo registration so admin dashboard displays nicely
    const initialDemo = [
      {
        id: "TKT-8942",
        name: "Chief Babatunde Alabi",
        email: "tunde.alabi@example.com",
        phone: "+234 803 123 4567",
        attending: "yes",
        guestsCount: 2,
        plusOneNames: "Mrs. Funmilayo Alabi",
        meal: "Traditional Pounded Yam & Egusi with Assorted Meat",
        dietary: "No shellfish",
        songRequest: "Buga by Kizz Daniel",
        message: "We will be there in our finest emerald green! Huge congratulations!",
        registeredAt: "2026-11-03T18:24:00Z"
      },
      {
        id: "TKT-7619",
        name: "Grace Adeyemi",
        email: "grace.adeyemi@example.com",
        phone: "+234 812 987 6543",
        attending: "yes",
        guestsCount: 1,
        plusOneNames: "",
        meal: "Jollof & Fried Rice Platter with Crispy Chicken",
        dietary: "None",
        songRequest: "Olorun Agbaye by Nathaniel Bassey",
        message: "So thrilled for you both! May God bless your marriage with divine joy and fruitfulness.",
        registeredAt: "2026-11-03T19:10:00Z"
      }
    ];
    localStorage.setItem('wedding_registered_guests', JSON.stringify(initialDemo));
    return initialDemo;
  }

  saveGuests() {
    localStorage.setItem('wedding_registered_guests', JSON.stringify(this.guests));
  }

  loadWishes() {
    const saved = localStorage.getItem('wedding_wishes');
    if (!saved) return DEFAULT_WISHES;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.some(w => (w.message && (w.message.includes("Mubaraq") || w.message.includes("Faith") || w.message.includes("Zainab") || w.message.includes("Allah"))))) {
        localStorage.setItem('wedding_wishes', JSON.stringify(DEFAULT_WISHES));
        return DEFAULT_WISHES;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_WISHES;
    }
  }

  saveWishes() {
    localStorage.setItem('wedding_wishes', JSON.stringify(this.wishes));
  }

  init() {
    this.applyConfigToDOM();
    this.initCountdown();
    this.initGallery();
    this.initRSVPForm();
    this.initWishesWall();
    this.initAudioPlayer();
    this.initAdminDashboard();
    this.initCalendarButtons();
    this.initCopyButtons();
    this.initNavScroll();
  }

  applyConfigToDOM() {
    const { groom, bride, hashtag, tagline, bank, weddingDate } = this.config;
    
    // Couple names
    document.querySelectorAll('.couple-names').forEach(el => {
      el.textContent = `${groom} & ${bride}`;
    });

    document.querySelectorAll('.groom-name').forEach(el => {
      el.textContent = groom;
    });

    document.querySelectorAll('.bride-name').forEach(el => {
      el.textContent = bride;
    });

    // Monogram
    const monogram = `${groom.charAt(0)} & ${bride.charAt(0)}`;
    document.querySelectorAll('.couple-monogram').forEach(el => {
      el.textContent = monogram;
    });

    // Tagline & Hashtag
    document.querySelectorAll('.couple-tagline').forEach(el => {
      el.textContent = tagline;
    });
    document.querySelectorAll('.wedding-hashtag').forEach(el => {
      el.textContent = hashtag;
    });

    // Bank Details
    const accEl = document.getElementById('bankAccountNumber');
    if (accEl) accEl.textContent = bank.accountNumber;
    const bankNameEl = document.getElementById('bankName');
    if (bankNameEl) bankNameEl.textContent = bank.bankName;
    const accNameEl = document.getElementById('bankAccountName');
    if (accNameEl) accNameEl.textContent = bank.accountName;
  }

  initCountdown() {
    const targetDate = new Date(this.config.weddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        document.getElementById('countdownDays').textContent = '00';
        document.getElementById('countdownHours').textContent = '00';
        document.getElementById('countdownMinutes').textContent = '00';
        document.getElementById('countdownSeconds').textContent = '00';
        const banner = document.getElementById('countdownBanner');
        if (banner) banner.textContent = "Today is our Wedding Day! Let the celebration begin!";
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dEl = document.getElementById('countdownDays');
      const hEl = document.getElementById('countdownHours');
      const mEl = document.getElementById('countdownMinutes');
      const sEl = document.getElementById('countdownSeconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // Romantic Web Audio Synthesizer: Ethereal harp & strings chords
  initAudioPlayer() {
    const toggleBtn = document.getElementById('audioToggleBtn');
    const audioStatusText = document.getElementById('audioStatusText');
    const audioWaves = document.getElementById('audioWaves');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      if (!this.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
      }

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      if (this.isPlayingMusic) {
        this.stopMusic();
        toggleBtn.classList.remove('bg-amber-400', 'text-emerald-950');
        toggleBtn.classList.add('bg-emerald-900/80', 'text-amber-300');
        if (audioStatusText) audioStatusText.textContent = "Music Paused";
        if (audioWaves) audioWaves.classList.add('opacity-40');
      } else {
        this.startMusic();
        toggleBtn.classList.remove('bg-emerald-900/80', 'text-amber-300');
        toggleBtn.classList.add('bg-amber-400', 'text-emerald-950');
        if (audioStatusText) audioStatusText.textContent = "Playing Melody";
        if (audioWaves) audioWaves.classList.remove('opacity-40');
      }
    });
  }

  startMusic() {
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Harmonic Wedding Chord Progression (Dmaj9 - F#m7 - Gmaj7 - A6/9 - Bm7)
    const chords = [
      [293.66, 369.99, 440.00, 554.37, 659.25], // D - F# - A - C# - E
      [369.99, 440.00, 554.37, 739.99],         // F# - A - C# - F#
      [392.00, 493.88, 587.33, 739.99],         // G - B - D - F#
      [440.00, 554.37, 659.25, 830.61],         // A - C# - E - G#
      [246.94, 293.66, 369.99, 440.00, 554.37]  // B - D - F# - A - C#
    ];

    let chordIndex = 0;

    const playChordArpeggio = () => {
      if (!this.isPlayingMusic || !this.audioContext) return;

      const now = this.audioContext.currentTime;
      const notes = chords[chordIndex];

      // Play soft arpeggiated harp notes
      notes.forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        // Warm mellow harp tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.22);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(2, now);

        gain.gain.setValueAtTime(0.001, now + i * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.22 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.22 + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now + i * 0.22);
        osc.stop(now + i * 0.22 + 3.0);
      });

      chordIndex = (chordIndex + 1) % chords.length;
      this.musicTimer = setTimeout(playChordArpeggio, 3600);
    };

    playChordArpeggio();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playCelebrationSound() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    }
    const ctx = this.audioContext;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumphant chime

    chimeNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.12 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.3);
    });
  }

  // Photo Gallery Lightbox
  initGallery() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    const updateLightbox = (idx) => {
      this.currentLightboxIndex = (idx + this.galleryImages.length) % this.galleryImages.length;
      const item = this.galleryImages[this.currentLightboxIndex];
      if (lightboxImg) lightboxImg.src = item.src;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxDesc) lightboxDesc.textContent = item.desc;
    };

    document.querySelectorAll('.gallery-item-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-gallery-index'), 10) || 0;
        updateLightbox(idx);
        if (lightboxModal) {
          lightboxModal.classList.remove('hidden');
          lightboxModal.classList.add('flex');
        }
      });
    });

    const closeLightbox = () => {
      if (lightboxModal) {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => updateLightbox(this.currentLightboxIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateLightbox(this.currentLightboxIndex + 1));

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }

    // Keyboard support for lightbox
    window.addEventListener('keydown', (e) => {
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightbox(this.currentLightboxIndex - 1);
        if (e.key === 'ArrowRight') updateLightbox(this.currentLightboxIndex + 1);
      }
    });
  }

  // RSVP Form & VIP Pass Generation
  initRSVPForm() {
    const rsvpForm = document.getElementById('weddingRSVPForm');
    const attendanceRadios = document.querySelectorAll('input[name="attending"]');
    const attendingFields = document.getElementById('attendingDetailsFields');
    const guestCountSelect = document.getElementById('guestCount');
    const plusOneNamesContainer = document.getElementById('plusOneNamesContainer');

    if (!rsvpForm) return;

    // Toggle conditional fields based on attendance
    attendanceRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'yes') {
          attendingFields.classList.remove('hidden');
        } else {
          attendingFields.classList.add('hidden');
        }
      });
    });

    // Dynamic plus-one name fields
    if (guestCountSelect) {
      guestCountSelect.addEventListener('change', (e) => {
        const count = parseInt(e.target.value, 10);
        if (count > 1) {
          plusOneNamesContainer.classList.remove('hidden');
        } else {
          plusOneNamesContainer.classList.add('hidden');
        }
      });
    }

    // Form Submission
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('guestFullName').value.trim();
      const email = document.getElementById('guestEmail').value.trim();
      const phone = document.getElementById('guestPhone').value.trim();
      const attending = document.querySelector('input[name="attending"]:checked')?.value || 'yes';
      const guestCount = attending === 'yes' ? parseInt(document.getElementById('guestCount')?.value || '1', 10) : 0;
      const plusOneNames = document.getElementById('plusOneNames')?.value.trim() || '';
      const meal = attending === 'yes' ? document.getElementById('mealPreference')?.value : 'N/A';
      const dietary = document.getElementById('dietaryNotes')?.value.trim() || 'None';
      const songRequest = document.getElementById('songRequest')?.value.trim() || '';
      const message = document.getElementById('weddingWishes')?.value.trim() || '';

      if (!fullName || !email) {
        this.showToast("Please provide your full name and email address.", "error");
        return;
      }

      // Generate Ticket ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `MZ-2026-${randomCode}`;

      const newGuest = {
        id: ticketId,
        name: fullName,
        email,
        phone,
        attending,
        guestsCount: guestCount,
        plusOneNames,
        meal,
        dietary,
        songRequest,
        message,
        registeredAt: new Date().toISOString()
      };

      this.guests.unshift(newGuest);
      this.saveGuests();

      // If a message was written, also add to guest wishes
      if (message.length > 5) {
        const newWish = {
          id: `wish-${Date.now()}`,
          name: fullName,
          message,
          date: 'Just now',
          likes: 1
        };
        this.wishes.unshift(newWish);
        this.saveWishes();
        this.renderWishes();
      }

      // Play Sound & Confetti
      this.playCelebrationSound();
      this.triggerConfetti();

      // If attending, display VIP Pass Modal
      if (attending === 'yes') {
        this.displayTicketModal(newGuest);
      } else {
        this.showToast("Thank you for letting us know. Your warm thoughts are deeply appreciated!", "success");
      }

      // Reset form
      rsvpForm.reset();
      document.querySelector('input[name="attending"][value="yes"]').checked = true;
      attendingFields.classList.remove('hidden');
      plusOneNamesContainer.classList.add('hidden');

      // Update admin if open
      this.refreshAdminStats();
    });
  }

  displayTicketModal(guest) {
    const modal = document.getElementById('ticketModal');
    if (!modal) return;

    // Fill pass details
    document.getElementById('ticketGuestName').textContent = guest.name;
    document.getElementById('ticketNumber').textContent = `#${guest.id}`;
    document.getElementById('ticketGuestCount').textContent = `${guest.guestsCount} ${guest.guestsCount > 1 ? 'Admissions' : 'Admission'}`;
    document.getElementById('ticketMeal').textContent = guest.meal;
    document.getElementById('ticketDate').textContent = "Saturday, November 14, 2026";
    document.getElementById('ticketVenue').textContent = "Blessing Hall, Eko Club, Surulere";

    // Generate QR Code
    const qrContainer = document.getElementById('ticketQRCode');
    qrContainer.innerHTML = '';

    const verificationPayload = JSON.stringify({
      ticketId: guest.id,
      guest: guest.name,
      partySize: guest.guestsCount,
      event: `${this.config.groom} & ${this.config.bride} Royal Wedding`,
      date: "2026-11-14",
      status: "VERIFIED_VIP"
    });

    if (window.QRCode) {
      new window.QRCode(qrContainer, {
        text: verificationPayload,
        width: 140,
        height: 140,
        colorDark: "#072218",
        colorLight: "#faf7f2",
        correctLevel: window.QRCode.CorrectLevel.H
      });
    } else {
      // Fallback SVG representation
      qrContainer.innerHTML = `
        <div class="w-32 h-32 border-2 border-emerald-900 rounded p-2 flex flex-col items-center justify-center bg-amber-50">
          <svg class="w-12 h-12 text-emerald-900 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
          <span class="text-[10px] font-mono text-emerald-900 font-bold tracking-wider">${guest.id}</span>
        </div>
      `;
    }

    // Download Pass button
    const downloadBtn = document.getElementById('downloadPassBtn');
    if (downloadBtn) {
      downloadBtn.onclick = () => this.generatePassImage(guest);
    }

    // WhatsApp share button
    const whatsappBtn = document.getElementById('shareWhatsAppBtn');
    if (whatsappBtn) {
      const text = encodeURIComponent(`🎉 I just RSVP'd for the Royal Wedding of ${this.config.groom} & ${this.config.bride} on November 14, 2026! Can't wait to celebrate! ${this.config.hashtag}`);
      whatsappBtn.href = `https://api.whatsapp.com/send?text=${text}`;
    }

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const closeBtn = document.getElementById('ticketModalClose');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }
  }

  // Draw high-resolution luxury pass on Canvas and download as PNG
  generatePassImage(guest) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background Gradient: Rich Emerald Green
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 700);
    bgGradient.addColorStop(0, '#041c13');
    bgGradient.addColorStop(0.5, '#0a3324');
    bgGradient.addColorStop(1, '#051f16');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 700);

    // Gold Outer Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 640);

    // Inner Dashed Luxury Border
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(45, 45, 1110, 610);
    ctx.setLineDash([]); // reset

    // Decorative Gold Corner Ornaments
    const drawCorner = (x, y, flipX, flipY) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(flipX, flipY);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.lineTo(40, 10);
      ctx.lineTo(10, 10);
      ctx.lineTo(10, 40);
      ctx.lineTo(0, 40);
      ctx.closePath();
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.restore();
    };
    drawCorner(55, 55, 1, 1);
    drawCorner(1145, 55, -1, 1);
    drawCorner(55, 645, 1, -1);
    drawCorner(1145, 645, -1, -1);

    // Left Column: Details
    ctx.fillStyle = '#d4af37';
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText("OFFICIAL ROYAL WEDDING PASS", 90, 110);

    // Monogram / Names
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Playfair Display", serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(`${this.config.groom} & ${this.config.bride}`, 90, 185);

    ctx.fillStyle = '#f3df8a';
    ctx.font = 'italic 24px "Alex Brush", cursive';
    ctx.fillText(this.config.tagline, 90, 230);

    // Divider Line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(90, 260);
    ctx.lineTo(760, 260);
    ctx.stroke();

    // Guest Info Block
    ctx.fillStyle = '#d4af37';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("HONORED GUEST", 90, 310);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Playfair Display", serif';
    ctx.fillText(guest.name, 90, 355);

    // Grid details
    const renderField = (label, val, x, y) => {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(label.toUpperCase(), x, y);
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(val, x, y + 28);
    };

    renderField("DATE", "Saturday, Nov 14, 2026", 90, 420);
    renderField("ADMISSIONS", `${guest.guestsCount} Guest(s)`, 380, 420);
    renderField("VENUE", "Blessing Hall, Eko Club, Surulere", 90, 510);
    renderField("SCHEDULE", "10:00 AM (Eng.) • 12:00 PM (White)", 380, 510);

    // Right Column: Perforated Tear-off Ticket Stub
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(820, 45);
    ctx.lineTo(820, 655);
    ctx.stroke();
    ctx.setLineDash([]);

    // Right Stub content
    ctx.fillStyle = '#d4af37';
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("VIP ACCESS PASS", 860, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Plus Jakarta Sans", monospace';
    ctx.fillText(`#${guest.id}`, 860, 150);

    // Draw White Box for QR Code
    ctx.fillStyle = '#faf7f2';
    ctx.fillRect(860, 185, 230, 230);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(860, 185, 230, 230);

    // Draw QR placeholder or real QR if canvas available
    const qrCanvas = document.querySelector('#ticketQRCode canvas');
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, 875, 200, 200, 200);
    } else {
      ctx.fillStyle = '#072218';
      ctx.font = 'bold 16px monospace';
      ctx.fillText("QR VERIFIED", 910, 305);
    }

    ctx.fillStyle = '#d4af37';
    ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("Present at Reception Gate", 865, 460);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(this.config.hashtag, 865, 490);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Wedding_Pass_${guest.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast("VIP Invitation Pass downloaded successfully!", "success");
  }

  // Wishes Wall / Guestbook
  initWishesWall() {
    this.renderWishes();

    const postWishForm = document.getElementById('newWishForm');
    if (postWishForm) {
      postWishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('wishAuthorName').value.trim();
        const message = document.getElementById('wishMessageText').value.trim();

        if (!name || !message) {
          this.showToast("Please enter your name and message.", "error");
          return;
        }

        const newWish = {
          id: `wish-${Date.now()}`,
          name,
          message,
          date: 'Just now',
          likes: 1
        };

        this.wishes.unshift(newWish);
        this.saveWishes();
        this.renderWishes();
        postWishForm.reset();
        this.triggerConfetti();
        this.showToast("Thank you for your heartfelt blessing!", "success");
      });
    }
  }

  renderWishes() {
    const container = document.getElementById('wishesContainer');
    if (!container) return;

    if (this.wishes.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-amber-200/60 font-serif-luxury">
          Be the first to leave a wedding prayer & blessing for the couple!
        </div>
      `;
      return;
    }

    container.innerHTML = this.wishes.map((wish, idx) => `
      <div class="glass-card p-6 rounded-2xl relative flex flex-col justify-between border border-amber-500/20">
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold text-sm shadow-md">
                ${wish.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 class="font-bold text-white text-base leading-tight">${wish.name}</h4>
                <span class="text-xs text-amber-300/60">${wish.date}</span>
              </div>
            </div>
            <button onclick="window.weddingApp.likeWish('${wish.id}')" class="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 text-xs transition border border-amber-500/30">
              <svg class="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>${wish.likes}</span>
            </button>
          </div>
          <p class="text-amber-100/90 text-sm italic font-cormorant text-lg leading-relaxed pt-2">
            "${wish.message}"
          </p>
        </div>
        <div class="mt-4 pt-3 border-t border-amber-500/10 flex justify-end">
          <span class="text-[11px] uppercase tracking-wider text-amber-400/50 font-mono">Verified Blessing</span>
        </div>
      </div>
    `).join('');
  }

  likeWish(id) {
    const wish = this.wishes.find(w => w.id === id);
    if (wish) {
      wish.likes += 1;
      this.saveWishes();
      this.renderWishes();
    }
  }

  // Calendar Links (.ICS download & Google Calendar)
  initCalendarButtons() {
    const gCalBtn = document.getElementById('addToGoogleCalendar');
    const icsBtn = document.getElementById('downloadICSBtn');

    if (gCalBtn) {
      gCalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const start = "20261114T090000Z";
        const end = "20261114T200000Z";
        const title = encodeURIComponent(`The Wedding of ${this.config.groom} & ${this.config.bride}`);
        const details = encodeURIComponent(`Join us in celebrating the wedding of ${this.config.groom} & ${this.config.bride}.\nSchedule: Traditional Engagement at 10:00 AM, White Wedding at 12:00 PM, Reception to follow.\nVenue: Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos.\nDress Code: Emerald Green & Champagne Gold.\nHashtag: ${this.config.hashtag}`);
        const location = encodeURIComponent("Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos");
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
        window.open(url, '_blank');
      });
    }

    if (icsBtn) {
      icsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const icsData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Emmanuel and Haliyah Wedding//EN',
          'CALSCALE:GREGORIAN',
          'METHOD:PUBLISH',
          'BEGIN:VEVENT',
          'SUMMARY:The Wedding of ' + this.config.groom + ' & ' + this.config.bride,
          'DESCRIPTION:Join us for the union of ' + this.config.groom + ' & ' + this.config.bride + '. Engagement: 10:00 AM | White Wedding: 12:00 PM. Venue: Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos.',
          'LOCATION:Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos',
          'DTSTART:20261114T090000Z',
          'DTEND:20261114T200000Z',
          'STATUS:CONFIRMED',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `Wedding_${this.config.groom}_${this.config.bride}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast("Calendar event file (.ics) downloaded!", "success");
      });
    }
  }

  // Copy to clipboard with toast notification
  initCopyButtons() {
    document.querySelectorAll('.copy-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy-text') || '';
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            this.showToast(`Copied: ${textToCopy}`, "success");
          }).catch(() => {
            this.showToast("Copied to clipboard!", "success");
          });
        }
      });
    });
  }

  // Smooth Navigation
  initNavScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Admin / Planner Dashboard Logic
  initAdminDashboard() {
    const adminToggleBtn = document.getElementById('openAdminModalBtn');
    const adminModal = document.getElementById('adminModal');
    const adminCloseBtn = document.getElementById('adminCloseBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const adminPassInput = document.getElementById('adminPassInput');
    const adminUnlockBtn = document.getElementById('adminUnlockBtn');
    const adminLoginView = document.getElementById('adminLoginView');
    const adminContentView = document.getElementById('adminContentView');
    const guestSearchInput = document.getElementById('guestSearchInput');
    const guestFilterStatus = document.getElementById('guestFilterStatus');

    if (!adminToggleBtn || !adminModal) return;

    adminToggleBtn.addEventListener('click', () => {
      adminModal.classList.remove('hidden');
      adminModal.classList.add('flex');
    });

    const closeAdmin = () => {
      adminModal.classList.add('hidden');
      adminModal.classList.remove('flex');
    };

    if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdmin);

    // Passcode Unlock
    const unlockDashboard = () => {
      const pass = adminPassInput.value.trim();
      if (pass === '2026' || pass === 'admin') {
        adminLoginView.classList.add('hidden');
        adminContentView.classList.remove('hidden');
        this.refreshAdminStats();
        this.renderGuestTable();
      } else {
        this.showToast("Incorrect passcode. Access denied.", "error");
      }
    };

    if (adminUnlockBtn) adminUnlockBtn.addEventListener('click', unlockDashboard);
    if (adminPassInput) {
      adminPassInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') unlockDashboard();
      });
    }

    // Search and filter
    if (guestSearchInput) {
      guestSearchInput.addEventListener('input', () => this.renderGuestTable());
    }
    if (guestFilterStatus) {
      guestFilterStatus.addEventListener('change', () => this.renderGuestTable());
    }

    // Export CSV
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.exportGuestsToCSV());
    }

    // Settings Form in Admin
    const settingsForm = document.getElementById('weddingSettingsForm');
    if (settingsForm) {
      // Preload current config
      document.getElementById('editGroom').value = this.config.groom;
      document.getElementById('editBride').value = this.config.bride;
      document.getElementById('editHashtag').value = this.config.hashtag;
      document.getElementById('editTagline').value = this.config.tagline;
      document.getElementById('editAccountNo').value = this.config.bank.accountNumber;
      document.getElementById('editBankName').value = this.config.bank.bankName;

      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.config.groom = document.getElementById('editGroom').value.trim();
        this.config.bride = document.getElementById('editBride').value.trim();
        this.config.hashtag = document.getElementById('editHashtag').value.trim();
        this.config.tagline = document.getElementById('editTagline').value.trim();
        this.config.bank.accountNumber = document.getElementById('editAccountNo').value.trim();
        this.config.bank.bankName = document.getElementById('editBankName').value.trim();
        this.saveConfig();
        this.applyConfigToDOM();
        this.showToast("Wedding settings updated successfully!", "success");
      });
    }
  }

  refreshAdminStats() {
    const totalReg = this.guests.length;
    const attendingGuests = this.guests.filter(g => g.attending === 'yes');
    const totalHeadcount = attendingGuests.reduce((acc, cur) => acc + (cur.guestsCount || 1), 0);
    const declinedCount = this.guests.filter(g => g.attending === 'no').length;

    const regEl = document.getElementById('statTotalRegistrations');
    const headEl = document.getElementById('statTotalHeadcount');
    const decEl = document.getElementById('statDeclined');

    if (regEl) regEl.textContent = totalReg;
    if (headEl) headEl.textContent = totalHeadcount;
    if (decEl) decEl.textContent = declinedCount;
  }

  renderGuestTable() {
    const tableBody = document.getElementById('adminGuestsTableBody');
    const searchVal = (document.getElementById('guestSearchInput')?.value || '').toLowerCase();
    const filterVal = document.getElementById('guestFilterStatus')?.value || 'all';

    if (!tableBody) return;

    let filtered = this.guests.filter(guest => {
      const matchSearch = guest.name.toLowerCase().includes(searchVal) ||
                          guest.email.toLowerCase().includes(searchVal) ||
                          guest.id.toLowerCase().includes(searchVal);
      const matchStatus = filterVal === 'all' || guest.attending === filterVal;
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-400">
            No guest registrations found matching your query.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(g => `
      <tr class="border-b border-emerald-950/20 hover:bg-emerald-900/10 transition">
        <td class="px-4 py-3 font-mono text-xs text-amber-400 font-bold">${g.id}</td>
        <td class="px-4 py-3">
          <div class="font-bold text-gray-900">${g.name}</div>
          <div class="text-xs text-gray-500">${g.email} | ${g.phone}</div>
          ${g.plusOneNames ? `<div class="text-xs text-emerald-700 italic">+ ${g.plusOneNames}</div>` : ''}
        </td>
        <td class="px-4 py-3">
          ${g.attending === 'yes'
            ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Attending (${g.guestsCount})</span>`
            : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">Declined</span>`
          }
        </td>
        <td class="px-4 py-3 text-xs text-gray-600 max-w-xs truncate" title="${g.meal}">
          ${g.meal}
        </td>
        <td class="px-4 py-3 text-xs text-gray-500 max-w-xs truncate" title="${g.message}">
          ${g.message || '—'}
        </td>
        <td class="px-4 py-3 text-right">
          <button onclick="window.weddingApp.deleteGuest('${g.id}')" class="text-rose-600 hover:text-rose-900 text-xs font-semibold">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  deleteGuest(id) {
    if (confirm("Are you sure you want to remove this guest registration?")) {
      this.guests = this.guests.filter(g => g.id !== id);
      this.saveGuests();
      this.refreshAdminStats();
      this.renderGuestTable();
      this.showToast("Guest removed from list.", "info");
    }
  }

  exportGuestsToCSV() {
    if (this.guests.length === 0) {
      this.showToast("No guests to export yet.", "info");
      return;
    }

    const headers = ["Ticket ID", "Full Name", "Email", "Phone", "Status", "Total Guests", "Plus One Names", "Meal Choice", "Dietary", "Song Request", "Message", "Registered At"];
    const rows = this.guests.map(g => [
      `"${g.id}"`,
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.email}"`,
      `"${g.phone}"`,
      `"${g.attending}"`,
      g.guestsCount,
      `"${(g.plusOneNames || '').replace(/"/g, '""')}"`,
      `"${(g.meal || '').replace(/"/g, '""')}"`,
      `"${(g.dietary || '').replace(/"/g, '""')}"`,
      `"${(g.songRequest || '').replace(/"/g, '""')}"`,
      `"${(g.message || '').replace(/"/g, '""')}"`,
      `"${g.registeredAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Wedding_Guests_Export_${this.config.groom}_${this.config.bride}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Guest list exported to CSV!", "success");
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#104b36', '#f3df8a', '#ffffff', '#e5c158']
      });

      setTimeout(() => {
        window.confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#104b36', '#e5c158']
        });
        window.confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#d4af37', '#104b36', '#e5c158']
        });
      }, 300);
    }
  }

  showToast(message, type = "info") {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-rose-900 border-rose-500 text-rose-100' :
                    type === 'success' ? 'bg-emerald-900 border-amber-400 text-amber-100' :
                    'bg-gray-900 border-amber-500/50 text-white';

    toast.className = `${bgColor} border px-5 py-3.5 rounded-xl shadow-2xl text-sm flex items-center space-x-3 pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `
      <span class="text-base">${type === 'success' ? '✨' : type === 'error' ? '⚠️' : '🔔'}</span>
      <span class="font-medium">${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    // Auto remove
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.weddingApp = new WeddingApp();
});
