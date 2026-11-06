# ☁️ Cloudflare Worker + R2 Storage Setup

This Cloudflare Worker provides a secure, zero-egress-cost REST API backed by **Cloudflare R2** for:
1. **RSVPs**: Storing and retrieving guest registrations (`rsvps/{ticketId}.json`).
2. **Wishes Wall**: Storing live guest prayers, wishes, and real-time like counts (`wishes/{wishId}.json`).

---

## ⚡ Quick 2-Minute Deployment

### Step 1: Login to Cloudflare via CLI
In your terminal, run:
```bash
npx wrangler login
```
*(A browser window will open — click **Allow**).*

---

### Step 2: Create your R2 Bucket
Run:
```bash
npx wrangler r2 bucket create wedding-storage
```

---

### Step 3: Deploy the Worker
From inside the `cloudflare-worker` directory:
```bash
cd cloudflare-worker
npx wrangler deploy
```

Once deployed, Wrangler will output your live URL, for example:
```
Published wedding-r2-api (1.2 sec)
  https://wedding-r2-api.YOUR-SUBDOMAIN.workers.dev
```

---

### Step 4: Connect to your Wedding Website
1. Open your live wedding site on Vercel.
2. Scroll to the footer and click **"Organizer Portal"** (passcode: `2026`).
3. In the **"Cloudflare Worker API URL"** box, paste your URL:
   `https://wedding-r2-api.YOUR-SUBDOMAIN.workers.dev`
4. Click **Save API Connection**.

All new RSVPs and Wishes will now instantly write to and read from your Cloudflare R2 bucket in real time!
