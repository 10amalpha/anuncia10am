'use client';
import { useState, useEffect } from "react";
import { STATS, fmtFollowers, totalAudience, fmtUpdated } from "./stats";

const I18N = {
  es: {
    sponsorArea: "🔒 Área de Sponsors", sponsorAccess: "🔒 Acceso Sponsors", user: "Usuario", password: "Contraseña",
    badCreds: "Credenciales incorrectas", enter: "ENTRAR →", cancel: "cancelar",
    themeLight: "Cambiar a modo claro", themeDark: "Cambiar a modo oscuro", langBtn: "EN",
    title: "Patrocina 10AMPRO", subtitle: "Rate Card & Media Kit 2026",
    quote: "\"La droga más peligrosa es un salario cómodo. Optimiza tu dieta de información y reprograma tu cerebro con modelos mentales de inversión táctica.\"",
    episodesPublished: "EPISODIOS PUBLICADOS", episodesSub: "desde 2021 · sin interrupciones · ver en YouTube ↗",
    podcastWhere: "donde sale el contenido de tu marca", totalAudience: "AUDIENCIA TOTAL", listeners: "oyentes · 93% LATAM",
    epDuration: "DURACIÓN EP.", episodes: "EPISODIOS", perWeek: "1/sem", avgWatch: "AVG WATCH TIME",
    liveAnalytics: "ver analytics en vivo ↗", shortsReach: "REACH EN CORTOS", totalViews: `views totales · ${STATS.shorts.clips} clips`, dataUpdated: "Datos actualizados",
    avgClip: "AVG / CLIP", engRate: "ENG. RATE", totalLikes: "TOTAL LIKES",
    killer1: "Aquí no se venden vistas.", killer2: "Se vende ", killerAccent: "confianza",
    limited: "⏳ DISPONIBILIDAD LIMITADA", only2: "Solo 2 espacios de patrocinio por episodio",
    slotsDesc: "Cada episodio tiene un máximo de 2 slots de IFrame. Una vez ocupada tu categoría, no hay segunda opción.",
    slotsPerEp: "SLOTS POR EPISODIO", slotsPerEpSub: "máximo por transmisión", eps2026: "EPISODIOS EN 2026", eps2026Sub: "programados este año",
    brandPerCat: "MARCA POR CATEGORÍA", brandPerCatSub: "exclusividad garantizada",
    firstCome: "Los espacios se asignan por orden de llegada. Reserva tu categoría antes de que lo haga tu competencia.",
    includes: "INCLUYE",
    tiers: [
      { badge: "PATROCINADOR DEL DÍA", tag: "Asociación directa con contenido de alta autoridad y transferencia de credibilidad nativa.",
        includes: ["Episodio completo (60–90 min) en formato video + audio", "Distribución en YouTube, Spotify, Apple Podcasts y todas las plataformas", "IFrame con logo del aliado durante todo el episodio"],
        pricing: [{ label: "INVERSIÓN INDIVIDUAL", sub: "USD por Episodio" }, { label: "PLAN ANUAL (54 EPISODIOS)", sub: "50% DESCUENTO APLICADO" }] },
      { badge: "IFRAME · PRESENCIA PERMANENTE", tag: "Máxima exposición sostenida. Tu marca visible durante el 100% de la transmisión.",
        includes: ["Logo y mensaje de marca visible durante todo el episodio completo", "Interactividad directa: Inclusión de códigos QR y enlaces de acción", "Exclusividad por categoría: Sin competencia en el mismo bloque visual"],
        pricing: [{ label: "MENSUAL BASE", sub: "USD / Mes" }, { label: "TRIMESTRAL (12 EPS)", sub: "10% DESCUENTO APLICADO" }, { label: "SEMESTRAL (24 EPS)", sub: "20% DESCUENTO APLICADO" }] },
    ],
    socialProof: "SOCIAL PROOF", brandLooks: "Así se ve tu marca en 10AMPRO", iframeVisible: "IFrame visible durante el 100% del episodio · Casos reales",
    watchEp: "Ver episodio ↗",
    sponsorDesc: ["Fintech · billetera digital", "Energía · La energía que quieres", "Crypto · DeFi & NFTs wallet", "Tech · VPN · fastestvpn.com/10ampro"],
    audienceSays: "LO QUE DICE LA AUDIENCIA", paidSubs: "Suscriptores de pago · Substack",
    testimonials: [
      "El contenido que comparten en los podcast es valioso para mi proyecto de retiro. Me ayuda a estructurar decisiones de inversión y planificación.",
      "Gracias por aportar a una mejor dieta mental en un mundo hiperconectado para compartir mayormente basura. Como emprendedor, agradecido por el valor recibido y me alegro de contribuir a esta generación de valor que promueven.",
      "I support you because my \"younger self\" would have loved to be like you when I grew up... and also because your episodes are the best way to learn how to invest.",
    ],
    cta: "QUIERO SER PATROCINADOR →", footer: "10AMPRO · Innovación, Tecnología y Negocios para LATAM · 2026 · www.10am.pro",
    demoTag: "👥 AUDIENCIA", demoSub: "quién te escucha · YouTube Studio + Substack",
    demoKpis: [
      { v: "78%", l: "MAYORES DE 35", sub: "poder adquisitivo real" },
      { v: "74%", l: "COLOMBIA", sub: "+ USA, España, México" },
      { v: "32.8%", l: "OPEN RATE EMAIL", sub: "promedio 30 días · Substack" },
      { v: "56%", l: "WATCH TIME SUSCRITOS", sub: "audiencia fiel, no de paso" },
    ],
    ageTitle: "EDAD", ageSrc: "YouTube · lifetime",
    geoTitle: "PAÍS", geoSrc: "YouTube views · Substack subs", geoYt: "YT", geoSs: "Substack",
    behaviorTitle: "CÓMO CONSUMEN", behaviorSrc: "YouTube · lifetime",
    behavior: [
      { l: "Móvil", v: 56.4 }, { l: "TV", v: 20.7 }, { l: "Computador", v: 19.4 }, { l: "Tablet", v: 3.6 },
    ],
    behaviorNotes: [
      "Recurrentes + casuales: 39.8% de la audiencia mensual",
      "8.2% con campana activada (2.1K) · típico YouTube 5–20%",
      "Substack: 8,097 seguidores en 75 países",
    ],
    demoFoot: "Perfil: profesional LATAM de 25–54, decisor, con capital para invertir. No es tráfico — es una comunidad que paga por confianza.",
    // ── Entrega por episodio ──
    epTag: "🎯 LO QUE ENTREGA UN EPISODIO", epSub: "YouTube Data API · sin contar Spotify ni Apple",
    epHeadline1: "¿1.000 CEOs y emprendedores", epHeadline2: "o un millón de views?",
    epHeadlineSub: "Preferimos lo primero. Cada episodio pone tu marca 60–90 minutos frente a gente que decide, no frente a un scroll.",
    epKpis: [
      { l: "VIEWS POR EPISODIO", sub: "mediana · últimos 20 episodios" },
      { l: "HORAS DE ATENCIÓN", sub: "por episodio · views × 23:23" },
      { l: "INTERACCIÓN", sub: "likes + comentarios / views" },
      { l: "EPISODIOS · 12 MESES", sub: "79 horas de contenido original" },
    ],
    epChartTitle: "ÚLTIMOS 24 EPISODIOS", epChartSub: "views YouTube por episodio · línea = mediana", epChartNote: "claro = publicado hace menos de 30 días, aún acumulando",
    epMedian: "mediana", epSpecial: "ESP = episodio especial",
    epFoot1: "No vendemos CPM.", epFoot2: " Un pre-roll dura 6 segundos. Aquí tu logo acompaña una conversación de una hora con una audiencia que se queda 23 minutos en promedio: cada episodio son ~1.800 horas de atención de decisores — el equivalente a 75 días continuos de un ejecutivo mirando tu marca. En 12 meses: 142.000 horas, 16 años de atención acumulada.",
    // ── Top contenido ──
    topTag: "🏆 TECHO DE ALCANCE", topSub: "lo que pasa cuando un tema pega",
    topEpisodesTitle: "TOP EPISODIOS · HISTÓRICO", topEpisodesSrc: "views YouTube · episodio completo",
    topClipsTitle: "MEJOR CORTO POR PLATAFORMA", topClipsSrc: "views en la plataforma · 366 cortos",
    topViews: "views", topFoot: "Los invitados que mueven la aguja son empresarios, inversionistas y figuras de política económica. Esa es la conversación en la que tu marca entra.",
  },
  en: {
    sponsorArea: "🔒 Sponsor Area", sponsorAccess: "🔒 Sponsor Access", user: "Username", password: "Password",
    badCreds: "Invalid credentials", enter: "SIGN IN →", cancel: "cancel",
    themeLight: "Switch to light mode", themeDark: "Switch to dark mode", langBtn: "ES",
    title: "Sponsor 10AMPRO", subtitle: "Rate Card & Media Kit 2026",
    quote: "\"The most dangerous drug is a comfortable salary. Optimize your information diet and reprogram your brain with tactical investing mental models.\"",
    episodesPublished: "EPISODES PUBLISHED", episodesSub: "since 2021 · zero gaps · watch on YouTube ↗",
    podcastWhere: "where your brand's content airs", totalAudience: "TOTAL AUDIENCE", listeners: "listeners · 93% LATAM",
    epDuration: "EP. LENGTH", episodes: "EPISODES", perWeek: "1/week", avgWatch: "AVG WATCH TIME",
    liveAnalytics: "live analytics ↗", shortsReach: "SHORTS REACH", totalViews: `total views · ${STATS.shorts.clips} clips`, dataUpdated: "Data updated",
    avgClip: "AVG / CLIP", engRate: "ENG. RATE", totalLikes: "TOTAL LIKES",
    killer1: "We don't sell views.", killer2: "We sell ", killerAccent: "trust",
    limited: "⏳ LIMITED AVAILABILITY", only2: "Only 2 sponsorship slots per episode",
    slotsDesc: "Each episode has a maximum of 2 IFrame slots. Once your category is taken, there is no second option.",
    slotsPerEp: "SLOTS PER EPISODE", slotsPerEpSub: "maximum per broadcast", eps2026: "EPISODES IN 2026", eps2026Sub: "scheduled this year",
    brandPerCat: "BRAND PER CATEGORY", brandPerCatSub: "guaranteed exclusivity",
    firstCome: "Slots are assigned first come, first served. Reserve your category before your competitor does.",
    includes: "INCLUDES",
    tiers: [
      { badge: "SPONSOR OF THE DAY", tag: "Direct association with high-authority content and native credibility transfer.",
        includes: ["Full episode (60–90 min) in video + audio format", "Distribution on YouTube, Spotify, Apple Podcasts and all platforms", "IFrame with partner logo throughout the entire episode"],
        pricing: [{ label: "SINGLE EPISODE", sub: "USD per Episode" }, { label: "ANNUAL PLAN (54 EPISODES)", sub: "50% DISCOUNT APPLIED" }] },
      { badge: "IFRAME · PERMANENT PRESENCE", tag: "Maximum sustained exposure. Your brand visible during 100% of the broadcast.",
        includes: ["Logo and brand message visible throughout the full episode", "Direct interactivity: QR codes and action links included", "Category exclusivity: no competitors in the same visual block"],
        pricing: [{ label: "MONTHLY BASE", sub: "USD / Month" }, { label: "QUARTERLY (12 EPS)", sub: "10% DISCOUNT APPLIED" }, { label: "SEMI-ANNUAL (24 EPS)", sub: "20% DISCOUNT APPLIED" }] },
    ],
    socialProof: "SOCIAL PROOF", brandLooks: "This is how your brand looks on 10AMPRO", iframeVisible: "IFrame visible during 100% of the episode · Real cases",
    watchEp: "Watch episode ↗",
    sponsorDesc: ["Fintech · digital wallet", "Energy · The energy you want", "Crypto · DeFi & NFTs wallet", "Tech · VPN · fastestvpn.com/10ampro"],
    audienceSays: "WHAT THE AUDIENCE SAYS", paidSubs: "Paid subscribers · Substack",
    testimonials: [
      "The content they share on the podcast is valuable for my retirement project. It helps me structure investment and planning decisions.",
      "Thank you for contributing to a better mental diet in a hyperconnected world built mostly to share garbage. As an entrepreneur, I'm grateful for the value received and glad to contribute to the value you create.",
      "I support you because my \"younger self\" would have loved to be like you when I grew up... and also because your episodes are the best way to learn how to invest.",
    ],
    cta: "I WANT TO SPONSOR →", footer: "10AMPRO · Innovation, Technology & Business for LATAM · 2026 · www.10am.pro",
    demoTag: "👥 AUDIENCE", demoSub: "who listens · YouTube Studio + Substack",
    demoKpis: [
      { v: "78%", l: "AGED 35+", sub: "real purchasing power" },
      { v: "74%", l: "COLOMBIA", sub: "+ USA, Spain, Mexico" },
      { v: "32.8%", l: "EMAIL OPEN RATE", sub: "30-day average · Substack" },
      { v: "56%", l: "SUBSCRIBER WATCH TIME", sub: "loyal, not drive-by" },
    ],
    ageTitle: "AGE", ageSrc: "YouTube · lifetime",
    geoTitle: "COUNTRY", geoSrc: "YouTube views · Substack subs", geoYt: "YT", geoSs: "Substack",
    behaviorTitle: "HOW THEY WATCH", behaviorSrc: "YouTube · lifetime",
    behavior: [
      { l: "Mobile", v: 56.4 }, { l: "TV", v: 20.7 }, { l: "Computer", v: 19.4 }, { l: "Tablet", v: 3.6 },
    ],
    behaviorNotes: [
      "Regular + casual viewers: 39.8% of monthly audience",
      "8.2% with bell on (2.1K) · YouTube typical 5–20%",
      "Substack: 8,097 followers across 75 countries",
    ],
    demoFoot: "Profile: LATAM professionals aged 25–54, decision-makers with capital to invest. Not traffic — a community that pays for trust.",
    // ── Per-episode delivery ──
    epTag: "🎯 WHAT ONE EPISODE DELIVERS", epSub: "YouTube Data API · Spotify and Apple not included",
    epHeadline1: "1,000 CEOs and founders,", epHeadline2: "or a million views?",
    epHeadlineSub: "We'd take the first. Every episode puts your brand in front of people who decide for 60–90 minutes — not in front of a scroll.",
    epKpis: [
      { l: "VIEWS PER EPISODE", sub: "median · last 20 episodes" },
      { l: "HOURS OF ATTENTION", sub: "per episode · views × 23:23" },
      { l: "INTERACTION", sub: "likes + comments / views" },
      { l: "EPISODES · 12 MONTHS", sub: "79 hours of original content" },
    ],
    epChartTitle: "LAST 24 EPISODES", epChartSub: "YouTube views per episode · line = median", epChartNote: "light = published less than 30 days ago, still accumulating",
    epMedian: "median", epSpecial: "ESP = special episode",
    epFoot1: "We don't sell CPM.", epFoot2: " A pre-roll lasts 6 seconds. Here your logo sits inside an hour-long conversation with an audience that stays 23 minutes on average: each episode is ~1,800 hours of decision-makers' attention — the equivalent of one executive looking at your brand for 75 straight days. Over 12 months: 142,000 hours, 16 years of accumulated attention.",
    // ── Top content ──
    topTag: "🏆 REACH CEILING", topSub: "what happens when a topic lands",
    topEpisodesTitle: "TOP EPISODES · ALL TIME", topEpisodesSrc: "YouTube views · full episode",
    topClipsTitle: "BEST CLIP PER PLATFORM", topClipsSrc: "views on that platform · 366 clips",
    topViews: "views", topFoot: "The guests who move the needle are entrepreneurs, investors and economic-policy figures. That is the conversation your brand joins.",
  },
};

function SponsorLogin({ L }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const creds = {
    wenia: { pass: "wenia", url: "https://wenia-dashboard.vercel.app" },
  };

  const handleLogin = () => {
    const key = user.toLowerCase().trim();
    if (creds[key] && creds[key].pass === pass) {
      window.open(creds[key].url, "_blank");
      setError("");
      setUser("");
      setPass("");
      setShow(false);
    } else {
      setError(L.badCreds);
    }
  };

  if (!show) {
    return (
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <button
          onClick={() => setShow(true)}
          style={{
            background: "none", border: "1px solid #ffffff15",
            color: "#555", fontSize: 10, fontWeight: 600,
            letterSpacing: "2px", padding: "10px 24px",
            borderRadius: 6, cursor: "pointer",
            fontFamily: "'Courier New',monospace",
            textTransform: "uppercase",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = "#ffcc0044"; e.currentTarget.style.color = "#ffcc00"; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = "#ffffff15"; e.currentTarget.style.color = "#555"; }}
        >
          {L.sponsorArea}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 340, margin: "0 auto 40px", padding: "24px",
      background: "#0a0a0a", border: "1px solid #ffffff10",
      borderRadius: 12,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "2px",
        color: "#ffcc00", textTransform: "uppercase",
        marginBottom: 16, textAlign: "center",
        fontFamily: "'Courier New',monospace",
      }}>
        {L.sponsorAccess}
      </div>
      <input
        type="text"
        placeholder={L.user}
        value={user}
        onChange={(e) => { setUser(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        style={{
          width: "100%", background: "#111", border: "1px solid #ffffff15",
          color: "#eee", padding: "10px 14px", borderRadius: 6,
          fontSize: 13, marginBottom: 10, outline: "none",
          fontFamily: "'Courier New',monospace",
          boxSizing: "border-box",
        }}
      />
      <input
        type="password"
        placeholder={L.password}
        value={pass}
        onChange={(e) => { setPass(e.target.value); setError(""); }}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        style={{
          width: "100%", background: "#111", border: "1px solid #ffffff15",
          color: "#eee", padding: "10px 14px", borderRadius: 6,
          fontSize: 13, marginBottom: 10, outline: "none",
          fontFamily: "'Courier New',monospace",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <div style={{ fontSize: 11, color: "#ff4444", marginBottom: 10, textAlign: "center" }}>
          {error}
        </div>
      )}
      <button
        onClick={handleLogin}
        style={{
          width: "100%", background: "linear-gradient(135deg,#1a1400,#141000)",
          color: "#ffcc00", border: "1px solid #ffcc0033",
          padding: "10px", fontSize: 11, fontWeight: 700,
          letterSpacing: "2px", borderRadius: 6,
          cursor: "pointer", fontFamily: "'Courier New',monospace",
        }}
      >
        {L.enter}
      </button>
      <div
        onClick={() => { setShow(false); setError(""); }}
        style={{
          fontSize: 10, color: "#444", textAlign: "center",
          marginTop: 12, cursor: "pointer",
        }}
      >
        {L.cancel}
      </div>
    </div>
  );
}

export default function SponsorshipSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [ytSubs, setYtSubs] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("es");
  const L = I18N[lang];

  const t = darkMode ? {
    bg: "#000", text: "#e8e8e8", heading: "#fff", muted: "#6b7280", subtle: "#555",
    card: "#0f0f0f", cardAlt: "#0a0a0a", border: "#1a1a1a", borderLight: "#2a2a2a",
    accent: "#ffcc00", green: "#44cc88", red: "#ff4444",
    quoteText: "#aaa", footerText: "#333",
    loginBg: "#0a0a0a", loginBorder: "#ffffff10",
    podcastGrad: "linear-gradient(135deg,#0f1200,#0a0f0a)", podcastBorder: "#ffcc0022",
    shortsGrad: "linear-gradient(135deg,#0a1a0f,#080f08)", shortsBorder: "#44cc8822",
    scarcityGrad: "linear-gradient(135deg,#1a1000,#0f0a00)", scarcityBorder: "#ffcc0022",
    ctaGrad: "linear-gradient(135deg,#1a1400,#141000)",
    tierBorder: (accent) => `${accent}33`, tierHighlightBg: (accent) => `${accent}10`,
    sponsorCardBg: "#0f0f0f", sponsorCardBorder: "#1e1e1e",
    testimonialBg: "#0a0f0a", testimonialBorder: "#44cc8822",
    barBg: "#111",
  } : {
    bg: "#ffffff", text: "#1a1a1a", heading: "#000", muted: "#6b7280", subtle: "#888",
    card: "#f8f8f8", cardAlt: "#f0f0f0", border: "#e0e0e0", borderLight: "#d0d0d0",
    accent: "#b8960f", green: "#1a8a54", red: "#cc3333",
    quoteText: "#555", footerText: "#999",
    loginBg: "#f5f5f5", loginBorder: "#e0e0e0",
    podcastGrad: "linear-gradient(135deg,#fafaf0,#f5f8f5)", podcastBorder: "#b8960f33",
    shortsGrad: "linear-gradient(135deg,#f0faf5,#f5f8f5)", shortsBorder: "#1a8a5433",
    scarcityGrad: "linear-gradient(135deg,#faf5e8,#f8f0e0)", scarcityBorder: "#b8960f33",
    ctaGrad: "linear-gradient(135deg,#f5f0e0,#f0ead0)",
    tierBorder: (accent) => `${accent}44`, tierHighlightBg: (accent) => `${accent}15`,
    sponsorCardBg: "#f8f8f8", sponsorCardBorder: "#e0e0e0",
    testimonialBg: "#f0faf5", testimonialBorder: "#1a8a5433",
    barBg: "#e8e8e8",
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const fetchYtSubs = async () => {
      try {
        const res = await fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC1yKEFqN6Tzz9DTK7fwS3LQ&key=AIzaSyANRsjsV-WdoLxM9yEz-yIgBFBdoUYPXCw");
        if (res.ok) {
          const data = await res.json();
          const stats = data.items?.[0]?.statistics;
          if (stats?.subscriberCount) {
            setYtSubs(parseInt(stats.subscriberCount));
          }
        }
      } catch (e) {}
    };
    fetchYtSubs();
  }, []);

  const tierMeta = [
    { prices: ["$3,500", "$94,500"], highlight: [false, true], accent: "#ffcc00" },
    { prices: ["$1,000", "$2,700", "$4,800"], highlight: [false, false, true], accent: "#ff8800" },
  ];
  const tiers = L.tiers.map((tt, i) => ({
    badge: tt.badge, tag: tt.tag, includes: tt.includes, accent: tierMeta[i].accent,
    pricing: tt.pricing.map((pp, j) => ({ label: pp.label, sub: pp.sub, price: tierMeta[i].prices[j], highlight: tierMeta[i].highlight[j] })),
  }));

  const sponsors = [
    { name: "Wenia",      desc: L.sponsorDesc[0], episode: "E196", img: "/sponsors/wenia.jpg",      url: "https://youtu.be/leDK2mccGWM" },
    { name: "Celsia",     desc: L.sponsorDesc[1], episode: "E177", img: "/sponsors/celsia.jpg",     url: "https://youtu.be/y7fzSK5M5g0" },
    { name: "Phantom",    desc: L.sponsorDesc[2], episode: "E189", img: "/sponsors/phantom.jpg",    url: "https://youtu.be/" },
    { name: "FastestVPN", desc: L.sponsorDesc[3], episode: "E186", img: "/sponsors/fastestvpn.jpg", url: "https://youtu.be/" },
  ];

  const fmtSubs = fmtFollowers;

  const podcastPlatforms = [
    { platform: "YouTube",        followers: fmtSubs(ytSubs || STATS.podcast.youtube), icon: "▶", color: "#ff0000" },
    { platform: "Spotify",        followers: fmtSubs(STATS.podcast.spotify), icon: "♫", color: "#1db954" },
    { platform: "Apple Podcasts", followers: fmtSubs(STATS.podcast.apple),   icon: "🎧", color: "#a855f7" },
    { platform: "X",              followers: fmtSubs(STATS.podcast.x),       icon: "𝕏", color: "#e4e4e7" },
    { platform: "Substack",       followers: fmtSubs(STATS.podcast.substack), icon: "✉", color: "#ff6719" },
  ];

  const shortsPlatforms = STATS.shorts.platforms.map((row) => ({
    ...row,
    followers: fmtSubs(row.platform === "YouTube" && ytSubs ? ytSubs : row.followers),
  }));

  const px = isMobile ? 16 : 40;

  const ageData = [
    { l: "18–24", v: 2.3 }, { l: "25–34", v: 19.6 }, { l: "35–44", v: 28.2 },
    { l: "45–54", v: 24.7 }, { l: "55–64", v: 14.4 }, { l: "65+", v: 10.8 },
  ];
  const geoData = [
    { l: "Colombia", yt: 72.4, ss: 74 }, { l: "USA", yt: 9.1, ss: 7 },
    { l: "España", yt: 2.9, ss: 3 }, { l: "México", yt: 1.0, ss: 3 }, { l: "Canadá", yt: 0.7, ss: 1 },
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh", fontFamily: "'Courier New', monospace", color: t.text, paddingBottom: "60px", transition: "background 0.3s, color 0.3s" }}>
      <style dangerouslySetInnerHTML={{ __html: "html,body{margin:0;padding:0;background:#000}" }} />

      {/* ── THEME TOGGLE ── */}
      <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 999, display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          style={{
            background: darkMode ? "#1a1a1a" : "#f0f0f0",
            border: `1px solid ${darkMode ? "#333" : "#ccc"}`,
            color: darkMode ? "#ffcc00" : "#b8960f",
            borderRadius: "20px", height: "40px", padding: "0 14px",
            cursor: "pointer", fontSize: "11px", fontWeight: "900", letterSpacing: "2px",
            fontFamily: "'Courier New',monospace", transition: "all 0.3s",
            boxShadow: darkMode ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.15)",
          }}
          title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        >
          {L.langBtn}
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: darkMode ? "#1a1a1a" : "#f0f0f0",
            border: `1px solid ${darkMode ? "#333" : "#ccc"}`,
            borderRadius: "50%", width: "40px", height: "40px",
            cursor: "pointer", fontSize: "18px", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: darkMode ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.15)",
          }}
          title={darkMode ? L.themeLight : L.themeDark}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ── HEADER (hub style) ── */}
      <header style={{ maxWidth: "960px", margin: isMobile ? "0 auto 32px" : "0 auto 48px", textAlign: "center", padding: isMobile ? "32px 16px 0" : "48px 40px 0" }}>
        <img
          src="/logo.jpg"
          alt="10AMPRO"
          style={{ width: isMobile ? "72px" : "100px", height: isMobile ? "72px" : "100px", borderRadius: "50%", margin: "0 auto 16px", display: "block" }}
        />
        <h1 style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: "600", margin: "0 0 8px", color: t.heading, fontFamily: "Georgia, serif" }}>
          {L.title}
        </h1>
        <p style={{ fontSize: "13px", color: t.muted, margin: 0 }}>
          {L.subtitle}
        </p>
        <p style={{ fontSize: "13px", color: t.quoteText, margin: "12px auto 0", maxWidth: "520px", lineHeight: "1.6", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
          {L.quote}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px", fontSize: "12px" }}>
          <a href="https://10am.pro" target="_blank" rel="noopener noreferrer" style={{ color: t.muted, textDecoration: "none" }}>10am.pro</a>
          <a href="https://x.com/holdmybirra" target="_blank" rel="noopener noreferrer" style={{ color: t.green, textDecoration: "none" }}>@holdmybirra</a>
        </div>
      </header>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: `0 ${px}px` }}>

        {/* ── EPISODE COUNTER ── */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <a href="https://www.youtube.com/@10ampro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: t.cardAlt, border: `1px solid ${t.accent}22`, borderRadius: "8px", padding: "12px 28px", cursor: "pointer" }}>
              <div style={{ fontSize: "28px", fontWeight: "900", color: t.accent }}>{STATS.episodes}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: t.heading, letterSpacing: "1px" }}>{L.episodesPublished}</div>
                <div style={{ fontSize: "10px", color: t.subtle, marginTop: "2px" }}>{L.episodesSub}</div>
              </div>
            </div>
          </a>
        </div>

        {/* ── BLOQUE 1: PODCAST — donde sale el contenido del sponsor ── */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700" }}>📻 PODCAST</div>
            <div style={{ flex: 1, height: "1px", background: t.border }} />
            <div style={{ fontSize: "10px", color: t.subtle }}>{L.podcastWhere}</div>
          </div>
          <div style={{ background: t.podcastGrad, border: `1px solid ${t.podcastBorder}`, borderRadius: "14px", overflow: "hidden" }}>
            {/* Top row: total + key metrics */}
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700", marginBottom: "4px" }}>{L.totalAudience}</div>
                <div style={{ fontSize: "26px", fontWeight: "900", color: t.accent }}>{totalAudience(ytSubs).toLocaleString("en-US")}+ <span style={{ fontSize: "13px", color: t.subtle, fontWeight: "400" }}>{L.listeners}</span></div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { v: "1–1.5h", l: L.epDuration },
                  { v: L.perWeek, l: L.episodes },
                  { v: STATS.avgWatchTime, l: L.avgWatch },
                ].map(s => (
                  <div key={s.l} style={{ background: t.cardAlt, border: `1px solid ${t.borderLight}`, borderRadius: "8px", padding: "8px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "900", color: t.heading }}>{s.v}</div>
                    <div style={{ fontSize: "9px", color: t.subtle, letterSpacing: "2px", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Platform grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)" }}>
              {podcastPlatforms.map((p, i) => (
                <div key={p.platform} style={{ padding: "18px 16px", borderRight: (!isMobile && i < 2) ? `1px solid ${t.border}` : "none", borderBottom: isMobile && i < 2 ? `1px solid ${t.border}` : "none", textAlign: "center" }}>
                  <div style={{ fontSize: "20px", color: p.color, marginBottom: "8px", opacity: 0.8 }}>{p.icon}</div>
                  <div style={{ fontSize: "18px", fontWeight: "900", color: t.heading, marginBottom: "4px" }}>{p.followers}</div>
                  <div style={{ fontSize: "10px", color: t.subtle, letterSpacing: "2px" }}>{p.platform.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BLOQUE 1b: ENTREGA POR EPISODIO ── */}
        {(() => {
          const E = STATS.episodeStats;
          const fmtK = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K" : String(n);
          const ceiling = 14000;
          const cutoff = new Date(Date.UTC(...E.asOf.split("-").map((v, i) => i === 1 ? Number(v) - 1 : Number(v))) - 30 * 86400000);
          const kpis = [
            { v: E.medianViews.toLocaleString("en-US"), ...L.epKpis[0] },
            { v: `~${E.attentionHours.toLocaleString("en-US")} h`, ...L.epKpis[1] },
            { v: E.engagementRate, ...L.epKpis[2] },
            { v: String(E.last12m.episodes), ...L.epKpis[3] },
          ];
          return (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700" }}>{L.epTag}</div>
                <div style={{ flex: 1, height: "1px", background: t.border }} />
                <div style={{ fontSize: "10px", color: t.subtle }}>{L.epSub}</div>
              </div>
              <div style={{ background: t.podcastGrad, border: `1px solid ${t.podcastBorder}`, borderRadius: "14px", overflow: "hidden" }}>
                {/* Headline */}
                <div style={{ padding: isMobile ? "24px 20px 18px" : "28px 32px 20px", textAlign: "center", borderBottom: `1px solid ${t.border}` }}>
                  <h3 style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: "900", color: t.heading, margin: "0 0 10px", fontFamily: "Georgia,serif", lineHeight: "1.3" }}>
                    {L.epHeadline1}<br />{L.epHeadline2}
                  </h3>
                  <p style={{ fontSize: "13px", color: t.muted, margin: 0, lineHeight: "1.7", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", fontFamily: "Georgia,serif", fontStyle: "italic" }}>{L.epHeadlineSub}</p>
                </div>
                {/* KPI row */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", borderBottom: `1px solid ${t.border}` }}>
                  {kpis.map((k, i) => (
                    <div key={k.l} style={{ padding: "18px 14px", textAlign: "center", borderRight: (!isMobile && i < 3) || (isMobile && i % 2 === 0) ? `1px solid ${t.border}` : "none", borderBottom: isMobile && i < 2 ? `1px solid ${t.border}` : "none" }}>
                      <div style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "900", color: t.accent }}>{k.v}</div>
                      <div style={{ fontSize: "9px", color: t.heading, letterSpacing: "2px", fontWeight: "700", marginTop: "4px" }}>{k.l}</div>
                      <div style={{ fontSize: "10px", color: t.subtle, marginTop: "2px" }}>{k.sub}</div>
                    </div>
                  ))}
                </div>
                {/* Chart */}
                <div style={{ padding: isMobile ? "18px 16px" : "20px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                    <div>
                      <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "3px", fontWeight: "700" }}>{L.epChartTitle}</div>
                      <div style={{ fontSize: "9px", color: t.subtle }}>{L.epChartSub}</div>
                    </div>
                    <div style={{ fontSize: "9px", color: t.subtle }}>{E.sampleWindow}</div>
                  </div>
                  <div style={{ position: "relative", height: isMobile ? "120px" : "150px" }}>
                    {/* median line */}
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: `${Math.min(E.medianViews, ceiling) / ceiling * 100}%`, borderTop: `1px dashed ${t.accent}`, opacity: 0.7, zIndex: 1 }}>
                      <span style={{ position: "absolute", left: 0, top: "-15px", fontSize: "9px", color: t.accent, letterSpacing: "1px", background: t.cardAlt, padding: "1px 5px", borderRadius: "3px" }}>{L.epMedian} {fmtK(E.medianViews)}</span>
                    </div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: isMobile ? "3px" : "5px" }}>
                      {E.recent.map(([d, label, v], i) => {
                        const fresh = new Date(d + "T00:00:00Z") > cutoff;
                        const capped = v > ceiling;
                        const h = Math.min(v, ceiling) / ceiling * 100;
                        return (
                          <div key={i} title={`${label} · ${d} · ${v.toLocaleString("en-US")} views`} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", minWidth: 0 }}>
                            {!isMobile && <div style={{ fontSize: "8px", color: capped ? t.accent : t.subtle, marginBottom: "3px", whiteSpace: "nowrap" }}>{fmtK(v)}{capped ? " ▲" : ""}</div>}
                            <div style={{ width: "100%", height: `${Math.max(h, 2)}%`, background: t.accent, opacity: fresh ? 0.35 : (label === "ESP" ? 0.65 : 0.9), borderRadius: "2px 2px 0 0" }} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: isMobile ? "3px" : "5px", marginTop: "6px", borderTop: `1px solid ${t.border}`, paddingTop: "6px" }}>
                    {E.recent.map(([d, label], i) => (
                      <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "8px", color: t.subtle, minWidth: 0, overflow: "visible", whiteSpace: "nowrap" }}>
                        {(isMobile ? i % 6 === 0 : i % 2 === 0) ? label.replace("ESP", "★") : ""}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginTop: "8px", fontSize: "9px", color: t.subtle }}>
                    <span>{L.epChartNote}</span><span>★ / {L.epSpecial}</span>
                  </div>
                </div>
                <div style={{ padding: "16px 28px", borderTop: `1px solid ${t.border}`, fontSize: "12px", color: t.quoteText, fontFamily: "Georgia,serif", fontStyle: "italic", textAlign: "center", lineHeight: "1.7" }}>
                  <span style={{ color: t.heading, fontWeight: "700", fontStyle: "normal" }}>{L.epFoot1}</span>{L.epFoot2}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── BLOQUE 2: SHORTS — reach adicional de distribución ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700" }}>📱 SHORTS</div>
            <div style={{ flex: 1, height: "1px", background: t.border }} />
            <a href="https://10ampro-shorts-analytics.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "10px", color: t.green, textDecoration: "none", letterSpacing: "1px" }}>{L.liveAnalytics}</a>
          </div>
          <div style={{ background: t.shortsGrad, border: `1px solid ${t.shortsBorder}`, borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700", marginBottom: "4px" }}>{L.shortsReach}</div>
                <div style={{ fontSize: "26px", fontWeight: "900", color: t.green }}>{STATS.shorts.totalViews} <span style={{ fontSize: "13px", color: t.subtle, fontWeight: "400" }}>{L.totalViews}</span></div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { v: STATS.shorts.avgPerClip, l: L.avgClip },
                  { v: STATS.shorts.engagementRate, l: L.engRate },
                  { v: STATS.shorts.totalLikes, l: L.totalLikes },
                ].map(s => (
                  <div key={s.l} style={{ background: t.cardAlt, border: `1px solid ${t.borderLight}`, borderRadius: "8px", padding: "8px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "900", color: t.green }}>{s.v}</div>
                    <div style={{ fontSize: "9px", color: t.subtle, letterSpacing: "2px", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bars */}
            <div style={{ padding: "18px 28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {shortsPlatforms.map((row) => (
                  <div key={row.platform} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "72px", fontSize: "11px", color: t.muted, textAlign: "right" }}>{row.platform}</div>
                    <div style={{ flex: 1, background: t.barBg, borderRadius: "2px", height: "10px", overflow: "hidden" }}>
                      <div style={{ width: `${row.pct}%`, height: "100%", background: row.color, borderRadius: "2px", opacity: 0.85 }} />
                    </div>
                    <div style={{ width: "58px", fontSize: "12px", fontWeight: "700", color: darkMode ? "#ccc" : "#333", textAlign: "right" }}>{row.views}</div>
                    <div style={{ width: "40px", fontSize: "10px", color: t.subtle, textAlign: "right" }}>{row.pct}%</div>
                    <div style={{ width: "64px", fontSize: "10px", color: darkMode ? "#444" : "#999", textAlign: "right" }}>{row.followers}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BLOQUE 3: AUDIENCIA / DEMOGRAFÍA ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700" }}>{L.demoTag}</div>
            <div style={{ flex: 1, height: "1px", background: t.border }} />
            <div style={{ fontSize: "10px", color: t.subtle }}>{L.demoSub}</div>
          </div>
          <div style={{ background: t.podcastGrad, border: `1px solid ${t.podcastBorder}`, borderRadius: "14px", overflow: "hidden" }}>
            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", borderBottom: `1px solid ${t.border}` }}>
              {L.demoKpis.map((k, i) => (
                <div key={k.l} style={{ padding: "18px 16px", textAlign: "center", borderRight: (!isMobile && i < 3) || (isMobile && i % 2 === 0) ? `1px solid ${t.border}` : "none", borderBottom: isMobile && i < 2 ? `1px solid ${t.border}` : "none" }}>
                  <div style={{ fontSize: "24px", fontWeight: "900", color: t.accent }}>{k.v}</div>
                  <div style={{ fontSize: "9px", color: t.heading, letterSpacing: "2px", fontWeight: "700", marginTop: "4px" }}>{k.l}</div>
                  <div style={{ fontSize: "10px", color: t.subtle, marginTop: "2px" }}>{k.sub}</div>
                </div>
              ))}
            </div>
            {/* 3 columns */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 0 }}>
              {/* Age */}
              <div style={{ padding: "18px 22px", borderRight: isMobile ? "none" : `1px solid ${t.border}`, borderBottom: isMobile ? `1px solid ${t.border}` : "none" }}>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "3px", fontWeight: "700" }}>{L.ageTitle}</div>
                <div style={{ fontSize: "9px", color: t.subtle, marginBottom: "12px" }}>{L.ageSrc}</div>
                {ageData.map(a => (
                  <div key={a.l} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
                    <div style={{ width: "40px", fontSize: "11px", color: t.muted, textAlign: "right" }}>{a.l}</div>
                    <div style={{ flex: 1, background: t.barBg, borderRadius: "2px", height: "9px", overflow: "hidden" }}>
                      <div style={{ width: `${a.v * 3}%`, maxWidth: "100%", height: "100%", background: a.v >= 19 ? t.accent : `${t.accent}66`, borderRadius: "2px" }} />
                    </div>
                    <div style={{ width: "40px", fontSize: "11px", fontWeight: "700", color: darkMode ? "#ccc" : "#333", textAlign: "right" }}>{a.v}%</div>
                  </div>
                ))}
              </div>
              {/* Geo */}
              <div style={{ padding: "18px 22px", borderRight: isMobile ? "none" : `1px solid ${t.border}`, borderBottom: isMobile ? `1px solid ${t.border}` : "none" }}>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "3px", fontWeight: "700" }}>{L.geoTitle}</div>
                <div style={{ fontSize: "9px", color: t.subtle, marginBottom: "12px" }}>{L.geoSrc}</div>
                {geoData.map(g => (
                  <div key={g.l} style={{ marginBottom: "9px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                      <span style={{ color: t.muted }}>{g.l}</span>
                      <span style={{ fontWeight: "700", color: darkMode ? "#ccc" : "#333" }}>{g.yt}% <span style={{ fontSize: "9px", color: t.subtle, fontWeight: "400" }}>{L.geoYt}</span> · {g.ss}% <span style={{ fontSize: "9px", color: t.subtle, fontWeight: "400" }}>{L.geoSs}</span></span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <div style={{ background: t.barBg, borderRadius: "2px", height: "5px", overflow: "hidden" }}><div style={{ width: `${g.yt}%`, height: "100%", background: "#ff0000", opacity: 0.8 }} /></div>
                      <div style={{ background: t.barBg, borderRadius: "2px", height: "5px", overflow: "hidden" }}><div style={{ width: `${g.ss}%`, height: "100%", background: "#ff6719", opacity: 0.8 }} /></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Behavior */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "3px", fontWeight: "700" }}>{L.behaviorTitle}</div>
                <div style={{ fontSize: "9px", color: t.subtle, marginBottom: "12px" }}>{L.behaviorSrc}</div>
                {L.behavior.map(b => (
                  <div key={b.l} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
                    <div style={{ width: "72px", fontSize: "11px", color: t.muted, textAlign: "right" }}>{b.l}</div>
                    <div style={{ flex: 1, background: t.barBg, borderRadius: "2px", height: "9px", overflow: "hidden" }}>
                      <div style={{ width: `${b.v}%`, height: "100%", background: t.green, borderRadius: "2px", opacity: 0.85 }} />
                    </div>
                    <div style={{ width: "40px", fontSize: "11px", fontWeight: "700", color: darkMode ? "#ccc" : "#333", textAlign: "right" }}>{b.v}%</div>
                  </div>
                ))}
                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${t.border}` }}>
                  {L.behaviorNotes.map((n, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", fontSize: "10px", color: t.muted, lineHeight: "1.5", marginBottom: "5px" }}>
                      <span style={{ color: t.green }}>›</span><span>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: "14px 28px", borderTop: `1px solid ${t.border}`, fontSize: "12px", color: t.quoteText, fontFamily: "Georgia,serif", fontStyle: "italic", textAlign: "center", lineHeight: "1.6" }}>
              {L.demoFoot}
            </div>
          </div>
        </div>

        {/* ── BLOQUE 3b: TECHO DE ALCANCE — top episodios + mejor corto por plataforma ── */}
        {(() => {
          const E = STATS.episodeStats;
          const fmtK = (n) => (n / 1000).toFixed(1) + "K";
          const maxEp = E.topEpisodes[0].views;
          const platColor = { TikTok: "#ff4466", Instagram: "#e1306c", X: "#1da1f2", YouTube: "#ff0000" };
          return (
            <div style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700" }}>{L.topTag}</div>
                <div style={{ flex: 1, height: "1px", background: t.border }} />
                <div style={{ fontSize: "10px", color: t.subtle }}>{L.topSub}</div>
              </div>
              <div style={{ background: t.podcastGrad, border: `1px solid ${t.podcastBorder}`, borderRadius: "14px", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 0 }}>
                  {/* Top episodes */}
                  <div style={{ padding: "18px 22px", borderRight: isMobile ? "none" : `1px solid ${t.border}`, borderBottom: isMobile ? `1px solid ${t.border}` : "none" }}>
                    <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "3px", fontWeight: "700" }}>{L.topEpisodesTitle}</div>
                    <div style={{ fontSize: "9px", color: t.subtle, marginBottom: "12px" }}>{L.topEpisodesSrc}</div>
                    {E.topEpisodes.map((e, i) => (
                      <a key={e.ep} href={`https://youtu.be/${e.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: "9px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "11px", marginBottom: "3px", gap: "8px" }}>
                          <span style={{ color: t.muted, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><span style={{ color: t.subtle }}>{i + 1}.</span> <span style={{ color: t.heading, fontWeight: "700" }}>{e.guest}</span> <span style={{ color: t.subtle }}>· {e.ep}</span></span>
                          <span style={{ fontWeight: "700", color: darkMode ? "#ccc" : "#333", whiteSpace: "nowrap" }}>{fmtK(e.views)} <span style={{ fontSize: "9px", color: t.subtle, fontWeight: "400" }}>{L.topViews}</span></span>
                        </div>
                        <div style={{ background: t.barBg, borderRadius: "2px", height: "6px", overflow: "hidden" }}><div style={{ width: `${e.views / maxEp * 100}%`, height: "100%", background: t.accent, opacity: 0.85 }} /></div>
                      </a>
                    ))}
                  </div>
                  {/* Top clip per platform */}
                  <div style={{ padding: "18px 22px" }}>
                    <div style={{ fontSize: "9px", color: t.green, letterSpacing: "3px", fontWeight: "700" }}>{L.topClipsTitle}</div>
                    <div style={{ fontSize: "9px", color: t.subtle, marginBottom: "12px" }}>{L.topClipsSrc}</div>
                    {E.topClips.map((c) => (
                      <a key={c.platform} href={c.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <div style={{ width: "6px", height: "28px", borderRadius: "2px", background: platColor[c.platform], opacity: 0.85, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "9px", color: t.subtle, letterSpacing: "2px" }}>{c.platform.toUpperCase()}</div>
                          <div style={{ fontSize: "11px", color: t.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: "900", color: t.green, whiteSpace: "nowrap" }}>{fmtK(c.views)}</div>
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "14px 28px", borderTop: `1px solid ${t.border}`, fontSize: "12px", color: t.quoteText, fontFamily: "Georgia,serif", fontStyle: "italic", textAlign: "center", lineHeight: "1.6" }}>
                  {L.topFoot}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── KILLER PHRASE ── */}
        <div style={{ textAlign: "center", margin: "48px 0" }}>
          <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${t.accent}33,transparent)`, marginBottom: "32px" }} />
          <p style={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "900", color: t.heading, margin: 0, fontFamily: "Georgia,serif", lineHeight: "1.5" }}>
            {L.killer1}<br />{L.killer2}<span style={{ color: t.accent }}>{L.killerAccent}</span>.
          </p>
          <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${t.accent}33,transparent)`, marginTop: "32px" }} />
        </div>

        {/* ── SCARCITY / FOMO ── */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <div style={{ background: t.scarcityGrad, border: `1px solid ${t.scarcityBorder}`, borderRadius: "14px", padding: isMobile ? "28px 20px" : "36px 48px" }}>
            <div style={{ fontSize: "9px", color: t.red, letterSpacing: "4px", fontWeight: "700", marginBottom: "14px" }}>{L.limited}</div>
            <h3 style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: "900", color: t.heading, margin: "0 0 10px", fontFamily: "Georgia,serif" }}>{L.only2}</h3>
            <p style={{ fontSize: "13px", color: t.muted, margin: "0 0 28px", lineHeight: "1.7", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
              {L.slotsDesc}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "14px", marginBottom: "24px" }}>
              {[
                { value: "2", label: L.slotsPerEp, sub: L.slotsPerEpSub },
                { value: "54", label: L.eps2026, sub: L.eps2026Sub },
                { value: "1", label: L.brandPerCat, sub: L.brandPerCatSub },
              ].map((item) => (
                <div key={item.label} style={{ background: t.cardAlt, border: `1px solid ${t.borderLight}`, borderRadius: "10px", padding: "18px 14px" }}>
                  <div style={{ fontSize: "30px", fontWeight: "900", color: t.red }}>{item.value}</div>
                  <div style={{ fontSize: "9px", color: t.subtle, letterSpacing: "2px", fontWeight: "700", marginTop: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "10px", color: darkMode ? "#444" : "#999", marginTop: "4px" }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: `${t.red}99`, letterSpacing: "1px", margin: 0 }}>
              {L.firstCome}
            </p>
          </div>
        </div>

        {/* ── TIERS ── */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginBottom: "48px" }}>
          {tiers.map((tier) => (
            <div key={tier.badge} style={{ background: t.card, border: `1px solid ${t.tierBorder(tier.accent)}`, borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "2px", background: `linear-gradient(90deg,transparent,${tier.accent},transparent)` }} />
              <div style={{ padding: "24px 26px 18px" }}>
                <div style={{ fontSize: "12px", fontWeight: "900", color: tier.accent, letterSpacing: "2px", marginBottom: "10px" }}>{tier.badge}</div>
                <p style={{ fontSize: "12px", color: t.muted, margin: 0, lineHeight: "1.6", fontStyle: "italic", fontFamily: "Georgia,serif" }}>{tier.tag}</p>
              </div>
              <div style={{ height: "1px", background: t.border, margin: "0 26px" }} />
              <div style={{ padding: "18px 26px", flex: 1 }}>
                <div style={{ fontSize: "9px", color: darkMode ? "#444" : "#999", letterSpacing: "3px", marginBottom: "12px", fontWeight: "700" }}>{L.includes}</div>
                {tier.includes.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "9px", alignItems: "flex-start" }}>
                    <span style={{ color: tier.accent, fontSize: "11px", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "12px", color: darkMode ? "#bbb" : "#555", lineHeight: "1.5" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: "1px", background: t.border, margin: "0 26px" }} />
              <div style={{ padding: "18px 26px" }}>
                {tier.pricing.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", marginBottom: i < tier.pricing.length - 1 ? "8px" : "0", background: p.highlight ? t.tierHighlightBg(tier.accent) : t.cardAlt, border: p.highlight ? `1px solid ${tier.accent}44` : `1px solid ${t.border}`, borderRadius: "6px" }}>
                    <div>
                      <div style={{ fontSize: "9px", color: p.highlight ? tier.accent : t.subtle, letterSpacing: "2px", fontWeight: "700", marginBottom: "3px" }}>{p.label}</div>
                      <div style={{ fontSize: "10px", color: p.highlight ? `${tier.accent}99` : (darkMode ? "#333" : "#aaa") }}>{p.sub}</div>
                    </div>
                    <div style={{ fontSize: p.highlight ? "26px" : "20px", fontWeight: "900", color: p.highlight ? tier.accent : t.muted }}>{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── SOCIAL PROOF ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700", marginBottom: "8px" }}>{L.socialProof}</div>
            <h3 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "900", color: t.heading, margin: 0, fontFamily: "Georgia,serif" }}>{L.brandLooks}</h3>
            <p style={{ color: t.subtle, fontSize: "12px", marginTop: "8px", letterSpacing: "1px" }}>{L.iframeVisible}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
            {sponsors.map((s, i) => (
              <div key={i} style={{ background: t.sponsorCardBg, border: `1px solid ${t.sponsorCardBorder}`, borderRadius: "10px", overflow: "hidden" }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", position: "relative", textDecoration: "none" }}>
                  <img src={s.img} alt={`${s.name} · ${s.episode}`} style={{ width: "100%", display: "block" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "52px", height: "52px", background: "rgba(0,0,0,0.72)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.35)" }}>
                    <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid white", marginLeft: "4px" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", padding: "4px 10px", fontSize: "10px", color: "#fff", letterSpacing: "1px" }}>
                    {s.episode} · {L.watchEp}
                  </div>
                </a>
                <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: t.heading }}>{s.name}</div>
                    <div style={{ fontSize: "11px", color: t.subtle, marginTop: "2px" }}>{s.desc} · {s.episode}</div>
                  </div>
                  <div style={{ background: darkMode ? "#1a1a0a" : "#faf5e0", border: `1px solid ${t.accent}33`, borderRadius: "4px", padding: "4px 10px", fontSize: "10px", color: t.accent, letterSpacing: "1px" }}>IFrame</div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div style={{ marginTop: "32px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700", marginBottom: "6px" }}>{L.audienceSays}</div>
              <p style={{ color: t.subtle, fontSize: "12px", letterSpacing: "1px", margin: 0 }}>{L.paidSubs}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "14px" }}>
              {[
                { name: "Felipe Castrillón", badge: "Paid Subscriber · Substack", quote: L.testimonials[0] },
                { name: "Juan D", badge: "Paid Subscriber · Substack", quote: L.testimonials[1] },
                { name: "Jose Cardenas", badge: "Paid Subscriber · Substack", quote: L.testimonials[2] },
              ].map((tst, i) => (
                <div key={i} style={{ background: t.testimonialBg, border: `1px solid ${t.testimonialBorder}`, borderRadius: "10px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ fontSize: "22px", color: `${t.green}44` }}>"</div>
                  <p style={{ fontSize: "12px", color: t.quoteText, lineHeight: "1.7", margin: 0, fontFamily: "Georgia,serif", fontStyle: "italic", flex: 1 }}>{tst.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: t.heading }}>{tst.name}</div>
                    <div style={{ background: `${t.green}22`, border: `1px solid ${t.green}44`, borderRadius: "3px", padding: "2px 6px", fontSize: "9px", color: t.green, fontWeight: "700", letterSpacing: "1px" }}>{tst.badge}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SPONSOR LOGIN ── */}
        <SponsorLogin L={L} />

        {/* ── CTA ── */}
        <div style={{ textAlign: "center" }}>
          <a href="https://forms.gle/SuszJCtsQE7mF6mPA" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{ background: t.ctaGrad, color: t.accent, border: `1px solid ${t.accent}44`, padding: "16px 52px", fontSize: "12px", fontWeight: "900", letterSpacing: "4px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Courier New',monospace" }}>
              {L.cta}
            </button>
          </a>
          <div style={{ color: t.footerText, fontSize: "11px", marginTop: "16px", letterSpacing: "1px" }}>
            {L.footer}
          </div>
          <div style={{ color: t.footerText, fontSize: "10px", marginTop: "6px", letterSpacing: "1px", opacity: 0.7 }}>
            {L.dataUpdated}: {fmtUpdated(lang)}
          </div>
        </div>

      </div>
    </div>
  );
}
