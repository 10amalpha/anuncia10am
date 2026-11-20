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

  // Entrega por episodio — YouTube Data API, episodios numerados/especiales (≥ 20 min, sin versiones 📱).
  // Mediana de los últimos 20 episodios con ≥ 30 días publicados. Recalcular mensualmente (ver README).
  episodeStats: {
    asOf: "2026-11-20",
    sampleWindow: "E212–E229 · jun–oct 2026",
    medianViews: 4600,            // views YouTube por episodio (mediana, 20 eps maduros)
    avgViews: 6622,
    medianLikes: 168,
    medianComments: 38,
    engagementRate: "4.1%",       // (likes + comentarios) / views · mediana por episodio
    attentionHours: 1800,         // medianViews × avg watch time 23:23 ≈ 1,793 h
    last12m: { episodes: 57, views: 365149, hoursPublished: 79, attentionHours: 142305, engagementRate: "4.3%" },
    // últimos 24 episodios (orden cronológico): [fecha, etiqueta, views YouTube]
    recent: [
      ["2026-06-11", "E212", 3427], ["2026-06-12", "ESP", 13257], ["2026-06-18", "E213", 3042], ["2026-06-25", "E214", 4468],
      ["2026-07-02", "E215", 4643], ["2026-07-09", "E216", 3709], ["2026-07-13", "ESP", 5126], ["2026-07-16", "E217", 4294],
      ["2026-07-23", "E218", 4556], ["2026-07-30", "E219", 3494], ["2026-08-13", "E220", 3881], ["2026-08-20", "E221", 3586],
      ["2026-08-27", "E222", 21065], ["2026-09-03", "E223", 2637], ["2026-09-10", "E224", 4927], ["2026-09-17", "E225", 8534],
      ["2026-09-24", "E226", 12113], ["2026-10-01", "E227", 7546], ["2026-10-08", "E228", 10622], ["2026-10-15", "E229", 7505],
      ["2026-11-05", "E230", 2874], ["2026-11-12", "E231", 2748], ["2026-11-14", "ESP", 8042], ["2026-11-19", "E232", 2150],
    ],
    // top episodios históricos por views YouTube
    topEpisodes: [
      { ep: "E64",  guest: "Santiago Botero",          views: 64208, id: "oYLcI_ZeFvQ" },
      { ep: "E177", guest: "Abelardo De La Espriella", views: 62880, id: "y7fzSK5M5g0" },
      { ep: "E126", guest: "Santiago Botero",          views: 45985, id: "RjozFTf6Sqk" },
      { ep: "E99",  guest: "Andrés Felipe Arias",      views: 44382, id: "9Xy3xPoapyw" },
      { ep: "E59",  guest: "Wilder Zapata",            views: 31737, id: "YF8YzaYunGs" },
    ],
    // mejor corto por plataforma (views en esa plataforma)
    topClips: [
      { platform: "TikTok",    views: 106200, title: "El espejismo del salario mínimo",            url: "https://www.tiktok.com/@10ampro/video/7593741679954332939" },
      { platform: "Instagram", views: 62290,  title: "\"Los contrataderos\", el gran problema de Colombia", url: "https://www.instagram.com/reel/DeKITgkNMUf/" },
      { platform: "X",         views: 18093,  title: "Repartir pobreza: el modelo económico de izquierda", url: "https://x.com/10ampro/status/2066677147335324110" },
      { platform: "YouTube",   views: 10408,  title: "El espejismo del salario mínimo",            url: "https://youtube.com/shorts/NrBQdZNldGE" },
    ],
  },

  // Cortos — totales calculados desde la hoja "Gordo clips 10ampro" (YT/IG/X/TikTok en vivo, solo cuentas @10ampro)
  shorts: {
    totalViews: "3.4M",
    clips: 366,
    avgPerClip: "9.4K",
    engagementRate: "4.0%",
    totalLikes: "114.8K",
    // orden = orden visual (descendente por views)
    platforms: [
      { platform: "Instagram", followers: 20779, views: "1.67M",  pct: 48.8, color: "#e1306c" },
      { platform: "TikTok",    followers: 50700, views: "813.6K", pct: 23.8, color: "#ff4466" },
      { platform: "X",         followers: 7589,  views: "578.7K", pct: 16.9, color: "#1da1f2" },
      { platform: "YouTube",   followers: 26700, views: "359.7K", pct: 10.5, color: "#ff0000" },
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
