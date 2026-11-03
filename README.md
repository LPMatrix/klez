# 👑 The Royal Wedding E-Invite & Guest Registration System

A luxury, interactive e-invitation and guest registration web application created for the wedding celebration on **Saturday, November 14, 2026** in Victoria Island, Lagos.

Designed with a regal palette of **Emerald Green, Champagne Gold, Mustard Sun, and Ivory Silk**, celebrating the rich heritage, cultural elegance, and modern haute couture of the couple.

---

## 🌟 Highlights & Features

1. **Ethereal Hero & Dynamic Countdown**:
   - Live countdown timer down to the second for **November 14, 2026**.
   - Romantic typography (*Playfair Display*, *Cormorant Garamond*, and *Alex Brush*).
   - Monogram crest and celebratory blessings.

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
   - **Part I: Holy Matrimony & Church Blessing** (Morning, Landmark Centre)
   - **Part II: The Royal Banquet & Grand Reception** (Evening, Eko Hotel & Suites)
   - Direct Google Maps links and venue details.
   - One-click **Save to Google Calendar** and **Download Apple / Outlook (.ics)** file.

5. **Colors of the Day & Dress Code (Aso Ebi)**:
   - Interactive color swatches:
     - **Emerald Green** (`#0A3324`)
     - **Champagne Gold** (`#D4AF37`)
     - **Mustard Sun** (`#C99700`)
     - **Alabaster Ivory** (`#FAF7F2`)
   - Style guidance for traditional Agbada, Gele, and formal tuxedos.

6. **Comprehensive RSVP & Guest Registration**:
   - Collects: Full Name, Email, WhatsApp / Phone, Attendance status, Number of Attendees (Plus-Ones), Names of Accompanying Guests.
   - Banquet Meal selection:
     - Royal Jollof & Fried Rice with Crispy Chicken & Asun
     - Traditional Pounded Yam & Egusi with Assorted Meat
     - Grilled Croaker Fish with Dodo & Yam Chips
     - Seafood Pasta & Lobster Special
     - Chef's Vegan / Vegetarian Platter
   - Dietary restrictions & DJ Song Request.
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
    - Real-time RSVP metrics: Total Registrations, Attending Headcount, Declines, Meal preferences.
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
node server.js
```
Then visit: **http://localhost:3000** in your browser.

---

## 📁 File Structure
```
├── index.html           # Main semantic HTML5 application
├── style.css            # Luxury theme styling, gold effects & animations
├── app.js               # Application logic, audio synth, RSVP, QR pass & admin
├── server.js            # Zero-dependency local Node server
├── package.json         # Project metadata and start scripts
├── README.md            # Documentation and instructions
└── assets/
    └── images/
        ├── couple-dance.jpg     # Joyful traditional green & gold dance
        ├── couple-embrace.jpg   # Intimate couple embrace portrait
        ├── couple-modern.jpg    # Modern mustard suit & white lace veil
        └── couple-regal.jpg     # Traditional seated & standing regality
```

---

## 💍 Customization Notes
- **Admin Passcode**: `2026`
- **Default Names**: *Emmanuel & Faith* (Can be changed in the Admin Portal or in `app.js` under `DEFAULT_CONFIG`)
- **Date**: Saturday, November 14, 2026
