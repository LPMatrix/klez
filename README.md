# 👑 The Royal Wedding E-Invite & Guest Registration System

A luxury, interactive e-invitation and guest registration web application created for the wedding celebration of **Haliyah & Emmanuel** on **Saturday, November 14, 2026** at **Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos**.

Designed with a regal palette of **Emerald Green, Champagne Gold, Mustard Sun, and Ivory Silk**, celebrating the rich heritage, cultural elegance, and modern haute couture of the couple.

---

## 🌟 Highlights & Features

1. **Ethereal Hero & Dynamic Countdown**:
   - Live countdown timer down to the second for **November 14, 2026**.
   - Romantic typography (*Playfair Display*, *Cormorant Garamond*, and *Alex Brush*).
   - Monogram crest (**H & E**) and celebratory blessings.

2. **Ambient Wedding Melody**:
   - Built-in Web Audio API romantic harp & string arpeggio synthesizer with play/pause and animated audio wave indicators.
   - Zero external audio files required; plays instantly on user tap.

3. **Curated Pre-Wedding Photo Gallery**:
   - Showcases the couple's 4 photos:
     - Modern Couture (Mustard suit & white bridal veil)
     - The Joyful Dance (Emerald green & gold traditional attire)
     - Regal Heritage (Groom seated in Agbada with Fila, Bride with Gele)
     - Intimate Embrace portrait
   - Full-screen interactive lightbox modal with keyboard navigation.

4. **Event Details & Itinerary**:
   - **Part I: Traditional Engagement Ceremony** (10:00 AM, Blessing Hall, Eko Club, Surulere)
   - **Part II: White Wedding & Grand Reception** (12:00 PM, Blessing Hall, Eko Club, Surulere)
   - Direct Google Maps links and venue details.
   - One-click **Save to Google Calendar** and **Download Apple / Outlook (.ics)** file.

5. **Colors of the Day & Dress Code (Aso Ebi)**:
   - Interactive color swatches:
     - **Emerald Green** (`#0A3324`)
     - **Champagne Gold** (`#D4AF37`)
     - **Mustard Sun** (`#C99700`)
     - **Alabaster Ivory** (`#FAF7F2`)
   - Style guidance for traditional Agbada, Gele, and formal tuxedos.

6. **Streamlined RSVP & Guest Registration**:
   - Collects: Full Name, Email, WhatsApp / Phone, Attendance status, Number of Attendees (Plus-Ones), and Names of Accompanying Guests.
   - Heartfelt prayer / message for the couple.

7. **Bespoke VIP Digital Access Pass (With Scannable QR Code)**:
   - Upon submitting RSVP, guests receive:
     - Celebratory golden confetti shower!
     - Individual VIP ticket code (e.g. `#MZ-2026-8942`).
     - Scannable QR code verified for admission.
     - **Download Pass (PNG)**: Renders a high-resolution, luxury 1200x700 digital pass canvas directly to their phone or computer!
     - **Share on WhatsApp** button.

8. **Live Guestbook & Wishes Wall**:
   - Guests can post their heartfelt prayers and wedding advice.
   - Interactive heart/like reactions on each blessing.

9. **Wedding Registry & Cash Gift Wishing Well**:
   - Bank transfer information (GTBank, Account Number, Sort Code).
   - One-click "Copy Account Number" button with instant toast confirmation.

10. **Organizer / Couple Admin Portal**:
    - Accessible via "Organizer Portal" in the footer.
    - Protected by passcode (`2026`).
    - Real-time RSVP metrics: Total Registrations, Attending Headcount, Declines.
    - Searchable and filterable guest list.
    - **Export to CSV**: 1-click download of all attendee records for caterers, event security, and planners.
    - **Live Settings Editor**: Change Groom/Bride names, Hashtag, Tagline, and Bank accounts directly on the site!

---

## 🚀 How to Run & Preview

### Option 1: Double-Click (Zero Setup)
Simply open `index.html` in any modern web browser (Google Chrome, Safari, Microsoft Edge, Firefox).

### Option 2: Using the Built-In Node Server
```bash
# In the project directory:
npm start
# or
node dev-server.js
```
Then visit: **http://localhost:3000** in your browser.

---

## ☁️ Cloudflare R2 Cloud Storage (Option B: Vercel Edge Proxy)
- **Architecture**: The frontend calls `/api/*` endpoints relative to your wedding domain.
- **Vercel Rewrites**: Handled via `vercel.json`, requests are securely proxied directly to:
  `https://wedding-r2-api.mubaraqsanusi908.workers.dev/api/:path*`
- **Data Stored in R2**:
  - `rsvps/<guest-id>.json`: Complete RSVP registration details.
  - `wishes/<wish-id>.json`: Prayers and wishes posted to the live Wishes Wall.
  - Likes sync in real time.
- **Admin Access**: Protected via `Authorization: Bearer 2026`.

---

## 📁 File Structure
```
├── index.html           # Main semantic HTML5 application
├── style.css            # Luxury theme styling, gold effects & animations
├── app.js               # Application logic, audio synth, RSVP, QR pass & admin
├── dev-server.js        # Local development server with built-in R2 proxy
├── vercel.json          # Vercel static routing & /api/* edge proxy to Cloudflare R2
├── package.json         # Project metadata and start scripts
├── README.md            # Documentation and instructions
├── cloudflare-worker/   # Cloudflare Worker connecting to R2 storage
│   ├── worker.js        # Worker script handling /api/rsvp, /api/wishes, /api/rsvps
│   └── wrangler.toml    # Cloudflare Wrangler deployment configuration
└── assets/
    ├── audio/           # Johnny Drille - Count on You (MP3 & M4A)
    └── images/          # Couple pre-wedding portraits
```

---

## 💍 Customization Notes
- **Admin Passcode**: `2026`
- **Default Names**: *Haliyah & Emmanuel*
- **Venue**: Blessing Hall, Eko Club, Bode Thomas, Surulere, Lagos
- **Schedule**: Engagement: 10:00 AM | White Wedding: 12:00 PM | Reception to follow
- **Date**: Saturday, November 14, 2026
