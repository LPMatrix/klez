/**
 * Cloudflare Worker for Haliyah & Emmanuel's Wedding
 * Connects directly to Cloudflare R2 for RSVPs and Wishes Wall storage
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Standard CORS Headers for Vercel & Web Clients
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. Submit RSVP (POST /api/rsvp)
      if (request.method === "POST" && url.pathname === "/api/rsvp") {
        const data = await request.json();
        if (!data || !data.id || !data.name) {
          return new Response(JSON.stringify({ error: "Invalid guest data" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const r2Key = `rsvps/${data.id}.json`;
        await env.WEDDING_BUCKET.put(r2Key, JSON.stringify(data), {
          customMetadata: {
            guestName: data.name,
            attending: data.attending || "yes",
            registeredAt: data.registeredAt || new Date().toISOString()
          }
        });

        // If the guest also left a prayer/message, automatically store as a wish
        if (data.message && data.message.trim().length > 3) {
          const wishId = `wish-${data.id}`;
          const wishData = {
            id: wishId,
            name: data.name,
            message: data.message.trim(),
            date: "Nov 14, 2026",
            likes: 1,
            timestamp: Date.now()
          };
          await env.WEDDING_BUCKET.put(`wishes/${wishId}.json`, JSON.stringify(wishData));
        }

        return new Response(JSON.stringify({ success: true, id: data.id }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 2. Fetch All RSVPs for Organizer Portal (GET /api/rsvps)
      if (request.method === "GET" && url.pathname === "/api/rsvps") {
        const auth = request.headers.get("Authorization");
        // Verify Passcode: 2026
        if (auth !== "Bearer 2026") {
          return new Response(JSON.stringify({ error: "Unauthorized access" }), {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const list = await env.WEDDING_BUCKET.list({ prefix: "rsvps/" });
        const guests = await Promise.all(
          list.objects.map(async (obj) => {
            const item = await env.WEDDING_BUCKET.get(obj.key);
            return item ? await item.json() : null;
          })
        );

        // Sort by registration date descending
        const sortedGuests = guests
          .filter(Boolean)
          .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));

        return new Response(JSON.stringify(sortedGuests), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 3. Post a Wish (POST /api/wishes)
      if (request.method === "POST" && url.pathname === "/api/wishes") {
        const wish = await request.json();
        if (!wish || !wish.name || !wish.message) {
          return new Response(JSON.stringify({ error: "Name and message required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        const wishId = wish.id || `wish-${Date.now()}`;
        const record = {
          id: wishId,
          name: wish.name.trim(),
          message: wish.message.trim(),
          date: wish.date || "Just now",
          likes: wish.likes || 1,
          timestamp: Date.now()
        };

        await env.WEDDING_BUCKET.put(`wishes/${wishId}.json`, JSON.stringify(record));

        return new Response(JSON.stringify({ success: true, wish: record }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 4. Fetch All Wishes (GET /api/wishes) - Public
      if (request.method === "GET" && url.pathname === "/api/wishes") {
        const list = await env.WEDDING_BUCKET.list({ prefix: "wishes/" });
        const wishes = await Promise.all(
          list.objects.map(async (obj) => {
            const item = await env.WEDDING_BUCKET.get(obj.key);
            return item ? await item.json() : null;
          })
        );

        // Sort newest first
        const sortedWishes = wishes
          .filter(Boolean)
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        return new Response(JSON.stringify(sortedWishes), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 5. Like a Wish (POST /api/wishes/like)
      if (request.method === "POST" && url.pathname === "/api/wishes/like") {
        const body = await request.json();
        const wishKey = `wishes/${body.id}.json`;

        const existing = await env.WEDDING_BUCKET.get(wishKey);
        if (existing) {
          const wishData = await existing.json();
          wishData.likes = (wishData.likes || 0) + 1;
          await env.WEDDING_BUCKET.put(wishKey, JSON.stringify(wishData));
          return new Response(JSON.stringify({ success: true, likes: wishData.likes }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        }

        return new Response(JSON.stringify({ error: "Wish not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // 6. Health Check / Status
      if (url.pathname === "/api/status" || url.pathname === "/") {
        return new Response(JSON.stringify({
          status: "online",
          wedding: "Haliyah & Emmanuel 2026",
          r2_binding: !!env.WEDDING_BUCKET
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};
