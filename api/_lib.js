/* =====================================================================
   Shared helpers for the serverless API (Vercel /api functions).
   Storage is a Redis-compatible KV accessed over its REST API, so the
   functions need NO npm dependencies — just two environment variables.

   Works with either:
     • Vercel KV  → sets  KV_REST_API_URL  +  KV_REST_API_TOKEN
     • Upstash    → sets  UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

   If neither is set, redis() throws and the API returns 503, which tells
   the front-end to fall back to per-browser localStorage.
   ===================================================================== */

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  if (!REST_URL || !REST_TOKEN) throw new Error("KV store not configured");
  const r = await fetch(REST_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command)
  });
  if (!r.ok) throw new Error("KV request failed: " + r.status);
  const data = await r.json();
  return data.result;
}

// Upstash HGETALL returns a flat array [field, value, field, value, ...]
function hashToObj(arr, mapVal) {
  const o = {};
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i += 2) {
      try { o[arr[i]] = mapVal ? mapVal(arr[i + 1]) : arr[i + 1]; }
      catch (e) { o[arr[i]] = arr[i + 1]; }
    }
  }
  return o;
}

function getBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return {};
}

module.exports = { redis, hashToObj, getBody };
