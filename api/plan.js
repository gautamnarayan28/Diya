/* Vercel serverless function: shared dinner plan.
   GET  /api/plan            -> { plan: [7 ids], overrides: {date: id}, updatedAt }
   POST /api/plan  {pin, plan?, overrides?}  -> same, after saving. 401 if PIN wrong.

   Storage: Upstash Redis via REST (created from the Vercel dashboard: Project -> Storage ->
   Create Database -> Upstash Redis). Vercel injects the env vars automatically; we accept
   both naming schemes. PLAN_PIN is a plain env var you set yourself (e.g. "2468").
   No npm dependencies — plain fetch to the Upstash REST API. */

const KEY = "dinner:state";

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(cmd) {
  const cfg = redisConfig();
  const r = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  });
  if (!r.ok) throw new Error(`redis ${r.status}: ${await r.text()}`);
  return (await r.json()).result;
}

async function readState() {
  const raw = await redis(["GET", KEY]);
  if (!raw) return { plan: null, overrides: {}, updatedAt: null };
  try { return JSON.parse(raw); } catch (e) { return { plan: null, overrides: {}, updatedAt: null }; }
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise(resolve => {
    let s = ""; req.on("data", c => (s += c)); req.on("end", () => { try { resolve(JSON.parse(s || "{}")); } catch (e) { resolve({}); } });
  });
}

const isId = v => typeof v === "string" && /^[a-z0-9-]{1,40}$/.test(v);
const isDate = v => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!redisConfig()) {
    return res.status(503).json({ error: "Storage not configured. In Vercel: Project -> Storage -> Create Database -> Upstash Redis, then redeploy." });
  }
  try {
    if (req.method === "GET") return res.status(200).json(await readState());

    if (req.method === "POST") {
      const body = await readBody(req);
      const pin = process.env.PLAN_PIN;
      if (pin && String(body.pin || "") !== String(pin)) return res.status(401).json({ error: "wrong pin" });

      const state = await readState();
      if (Array.isArray(body.plan)) {
        if (body.plan.length !== 7 || !body.plan.every(isId)) return res.status(400).json({ error: "plan must be 7 recipe ids" });
        state.plan = body.plan;
      }
      if (body.overrides && typeof body.overrides === "object") {
        const clean = {};
        for (const [d, id] of Object.entries(body.overrides)) if (isDate(d) && isId(id)) clean[d] = id;
        state.overrides = clean;
      }
      state.updatedAt = new Date().toISOString();
      await redis(["SET", KEY, JSON.stringify(state)]);
      return res.status(200).json(state);
    }
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
