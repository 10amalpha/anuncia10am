// stats.js — ÚNICA fuente de números del media kit (media.10am.pro).
// Actualizado semanalmente por la tarea programada de Claude ("Media kit · update semanal").
// Fuente: https://growth.10am.pro/api/media-kit-stats (snapshot Supabase + YouTube/IG en vivo + conteo de episodios).
// Regla: solo editar valores, nunca la forma del objeto. El JSX importa STATS y formatea.

export const STATS = {
  updatedAt: "2026-11-20",          // YYYY-MM-DD — fecha del último refresh de datos
  episodes: 232,                    // episodios largos publicados (uploads ≥ 20 min, sin Shorts)
  avgWatchTime: "23:23",            // YouTube Studio · avg view duration episodios

  // Seguidores por plataforma de podcast (enteros). YouTube se sobreescribe en vivo en el cliente.
  podcast: {
    youtube: 26700,
    spotify: 38919,
    apple: 6000,
    x: 7589,
    substack: 6725,
  },

  // Cortos — totales calculados desde la hoja "Gordo clips 10ampro" (YT/IG/X en vivo; TikTok = dashboard jun-2026)
  shorts: {
    totalViews: "3.2M",
    clips: 366,
    avgPerClip: "8.8K",
    engagementRate: "3.8%",
    totalLikes: "102.4K",
    // orden = orden visual (descendente por views)
    platforms: [
      { platform: "Instagram", followers: 20779, views: "1.67M",  pct: 52.0, color: "#e1306c" },
      { platform: "X",         followers: 7589,  views: "776.1K", pct: 24.1, color: "#1da1f2" },
      { platform: "TikTok",    followers: 50700, views: "407.7K", pct: 12.7, color: "#ff4466" },
      { platform: "YouTube",   followers: 26700, views: "359.7K", pct: 11.2, color: "#ff0000" },
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
