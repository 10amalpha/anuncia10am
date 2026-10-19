// stats.js — ÚNICA fuente de números del media kit (media.10am.pro).
// Actualizado semanalmente por la tarea programada de Claude ("Media kit · update semanal").
// Fuente: https://growth.10am.pro/api/media-kit-stats (snapshot Supabase + YouTube/IG en vivo + conteo de episodios).
// Regla: solo editar valores, nunca la forma del objeto. El JSX importa STATS y formatea.

export const STATS = {
  updatedAt: "2026-10-19",          // YYYY-MM-DD — fecha del último refresh de datos
  episodes: 229,                    // episodios largos publicados (uploads ≥ 20 min, sin Shorts)
  avgWatchTime: "23:23",            // YouTube Studio · avg view duration episodios

  // Seguidores por plataforma de podcast (enteros). YouTube se sobreescribe en vivo en el cliente.
  podcast: {
    youtube: 26500,
    spotify: 38919,
    apple: 6000,
    x: 7103,
    substack: 6725,
  },

  // Cortos — totales del dashboard https://10ampro-shorts-analytics.vercel.app/
  shorts: {
    totalViews: "2.0M",
    clips: 263,
    avgPerClip: "11.3K",
    engagementRate: "3.5%",
    totalLikes: "59.0K",
    // orden = orden visual (descendente por views)
    platforms: [
      { platform: "Instagram", followers: 20401, views: "1.09M",  pct: 53.3, color: "#e1306c" },
      { platform: "TikTok",    followers: 50100, views: "407.7K", pct: 19.9, color: "#ff4466" },
      { platform: "X",         followers: 7103,  views: "289.2K", pct: 14.1, color: "#1da1f2" },
      { platform: "YouTube",   followers: 26500, views: "258.6K", pct: 12.6, color: "#ff0000" },
    ],
  },
};

// 26500 → "26,500+"
export const fmtFollowers = (n) => Number(n).toLocaleString("en-US") + "+";

// Suma de audiencia de podcast; permite sobreescribir YouTube con el valor en vivo.
export const totalAudience = (ytLive) => {
  const p = STATS.podcast;
  return (ytLive || p.youtube) + p.spotify + p.apple + p.x + p.substack;
};

// "2026-10-19" → "19 oct 2026" / "Oct 19, 2026"
export const fmtUpdated = (lang) => {
  const [y, m, d] = STATS.updatedAt.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};
