'use client';
import { useState, useEffect } from "react";

function SponsorLogin() {
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
      setError("Credenciales incorrectas");
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
          🔒 Área de Sponsors
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
        🔒 Acceso Sponsors
      </div>
      <input
        type="text"
        placeholder="Usuario"
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
        placeholder="Contraseña"
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
        ENTRAR →
      </button>
      <div
        onClick={() => { setShow(false); setError(""); }}
        style={{
          fontSize: 10, color: "#444", textAlign: "center",
          marginTop: 12, cursor: "pointer",
        }}
      >
        cancelar
      </div>
    </div>
  );
}

export default function SponsorshipSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [ytSubs, setYtSubs] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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

  const tiers = [
    {
      badge: "PATROCINADOR DEL DÍA",
      tag: "Asociación directa con contenido de alta autoridad y transferencia de credibilidad nativa.",
      includes: [
        "Episodio completo (60–90 min) en formato video + audio",
        "Distribución en YouTube, Spotify, Apple Podcasts y todas las plataformas",
        "IFrame con logo del aliado durante todo el episodio",
      ],
      pricing: [
        { label: "INVERSIÓN INDIVIDUAL",     price: "$3,500",  sub: "USD por Episodio",       highlight: false },
        { label: "PLAN ANUAL (54 EPISODIOS)", price: "$94,500", sub: "50% DESCUENTO APLICADO", highlight: true  },
      ],
      accent: "#ffcc00",
    },
    {
      badge: "IFRAME · PRESENCIA PERMANENTE",
      tag: "Máxima exposición sostenida. Tu marca visible durante el 100% de la transmisión.",
      includes: [
        "Logo y mensaje de marca visible durante todo el episodio completo",
        "Interactividad directa: Inclusión de códigos QR y enlaces de acción",
        "Exclusividad por categoría: Sin competencia en el mismo bloque visual",
      ],
      pricing: [
        { label: "MENSUAL BASE",        price: "$1,000", sub: "USD / Mes",              highlight: false },
        { label: "TRIMESTRAL (12 EPS)", price: "$2,700", sub: "10% DESCUENTO APLICADO", highlight: false },
        { label: "SEMESTRAL (24 EPS)",  price: "$4,800", sub: "20% DESCUENTO APLICADO", highlight: true  },
      ],
      accent: "#ff8800",
    },
  ];

  const sponsors = [
    { name: "Wenia",      desc: "Fintech · billetera digital", episode: "E196", img: "/sponsors/wenia.jpg",      url: "https://youtu.be/leDK2mccGWM" },
    { name: "Celsia",     desc: "Energía · La energía que quieres", episode: "E177", img: "/sponsors/celsia.jpg",     url: "https://youtu.be/y7fzSK5M5g0" },
    { name: "Phantom",    desc: "Crypto · DeFi & NFTs wallet",  episode: "E189", img: "/sponsors/phantom.jpg",    url: "https://youtu.be/" },
    { name: "FastestVPN", desc: "Tech · VPN · fastestvpn.com/10ampro", episode: "E186", img: "/sponsors/fastestvpn.jpg", url: "https://youtu.be/" },
  ];

  const fmtSubs = (n) => n >= 1000 ? n.toLocaleString("en-US") + "+" : n + "+";

  const podcastPlatforms = [
    { platform: "YouTube",        followers: ytSubs ? fmtSubs(ytSubs) : "23,000+", icon: "▶", color: "#ff0000" },
    { platform: "Spotify",        followers: "36,500+", icon: "♫", color: "#1db954" },
    { platform: "Apple Podcasts", followers: "6,000+",  icon: "🎧", color: "#a855f7" },
    { platform: "X",              followers: "6,000+",  icon: "𝕏", color: "#e4e4e7" },
    { platform: "Substack",       followers: "5,400+",  icon: "✉", color: "#ff6719" },
  ];

  const shortsPlatforms = [
    { platform: "TikTok",    followers: "50,000+", views: "323.7K", pct: 28.2, color: "#ff4466" },
    { platform: "Instagram", followers: "17,000+", views: "590.3K", pct: 51.4, color: "#e1306c" },
    { platform: "X",         followers: "6,000+",  views: "151.6K", pct: 13.2, color: "#1da1f2" },
    { platform: "YouTube",   followers: ytSubs ? fmtSubs(ytSubs) : "23,000+", views: "81.8K",  pct: 7.1,  color: "#ff0000" },
  ];

  const px = isMobile ? 16 : 40;

  return (
    <div style={{ background: t.bg, minHeight: "100vh", fontFamily: "'Courier New', monospace", color: t.text, paddingBottom: "60px", transition: "background 0.3s, color 0.3s" }}>
      <style dangerouslySetInnerHTML={{ __html: "html,body{margin:0;padding:0;background:#000}" }} />

      {/* ── THEME TOGGLE ── */}
      <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 999 }}>
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
          title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
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
          Patrocina 10AMPRO
        </h1>
        <p style={{ fontSize: "13px", color: t.muted, margin: 0 }}>
          Rate Card & Media Kit 2026
        </p>
        <p style={{ fontSize: "13px", color: t.quoteText, margin: "12px auto 0", maxWidth: "520px", lineHeight: "1.6", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
          "La droga más peligrosa es un salario cómodo. Optimiza tu dieta de información y reprograma tu cerebro con modelos mentales de inversión táctica."
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
              <div style={{ fontSize: "28px", fontWeight: "900", color: t.accent }}>207</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: t.heading, letterSpacing: "1px" }}>EPISODIOS PUBLICADOS</div>
                <div style={{ fontSize: "10px", color: t.subtle, marginTop: "2px" }}>desde 2021 · sin interrupciones · ver en YouTube ↗</div>
              </div>
            </div>
          </a>
        </div>

        {/* ── BLOQUE 1: PODCAST — donde sale el contenido del sponsor ── */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700" }}>📻 PODCAST</div>
            <div style={{ flex: 1, height: "1px", background: t.border }} />
            <div style={{ fontSize: "10px", color: t.subtle }}>donde sale el contenido de tu marca</div>
          </div>
          <div style={{ background: t.podcastGrad, border: `1px solid ${t.podcastBorder}`, borderRadius: "14px", overflow: "hidden" }}>
            {/* Top row: total + key metrics */}
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700", marginBottom: "4px" }}>AUDIENCIA TOTAL</div>
                <div style={{ fontSize: "26px", fontWeight: "900", color: t.accent }}>{((ytSubs || 23800) + 36527 + 6000 + 6092 + 5414).toLocaleString()}+ <span style={{ fontSize: "13px", color: t.subtle, fontWeight: "400" }}>oyentes · 93% LATAM</span></div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { v: "1–1.5h", l: "DURACIÓN EP." },
                  { v: "1/sem",  l: "EPISODIOS" },
                  { v: "23:23",    l: "AVG WATCH TIME" },
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

        {/* ── BLOQUE 2: SHORTS — reach adicional de distribución ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700" }}>📱 SHORTS</div>
            <div style={{ flex: 1, height: "1px", background: t.border }} />
            <a href="https://10ampro-shorts-analytics.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "10px", color: t.green, textDecoration: "none", letterSpacing: "1px" }}>ver analytics en vivo ↗</a>
          </div>
          <div style={{ background: t.shortsGrad, border: `1px solid ${t.shortsBorder}`, borderRadius: "14px", overflow: "hidden" }}>
            <div style={{ padding: "20px 28px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700", marginBottom: "4px" }}>REACH EN CORTOS</div>
                <div style={{ fontSize: "26px", fontWeight: "900", color: t.green }}>1.1M <span style={{ fontSize: "13px", color: t.subtle, fontWeight: "400" }}>views totales · 76 clips</span></div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { v: "15.1K", l: "AVG / CLIP" },
                  { v: "3.3%",  l: "ENG. RATE" },
                  { v: "38.2K", l: "TOTAL LIKES" },
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

        {/* ── KILLER PHRASE ── */}
        <div style={{ textAlign: "center", margin: "48px 0" }}>
          <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${t.accent}33,transparent)`, marginBottom: "32px" }} />
          <p style={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "900", color: t.heading, margin: 0, fontFamily: "Georgia,serif", lineHeight: "1.5" }}>
            Aquí no se venden vistas.<br />Se vende <span style={{ color: t.accent }}>confianza</span>.
          </p>
          <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${t.accent}33,transparent)`, marginTop: "32px" }} />
        </div>

        {/* ── SCARCITY / FOMO ── */}
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <div style={{ background: t.scarcityGrad, border: `1px solid ${t.scarcityBorder}`, borderRadius: "14px", padding: isMobile ? "28px 20px" : "36px 48px" }}>
            <div style={{ fontSize: "9px", color: t.red, letterSpacing: "4px", fontWeight: "700", marginBottom: "14px" }}>⏳ DISPONIBILIDAD LIMITADA</div>
            <h3 style={{ fontSize: isMobile ? "20px" : "26px", fontWeight: "900", color: t.heading, margin: "0 0 10px", fontFamily: "Georgia,serif" }}>Solo 2 espacios de patrocinio por episodio</h3>
            <p style={{ fontSize: "13px", color: t.muted, margin: "0 0 28px", lineHeight: "1.7", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
              Cada episodio tiene un máximo de 2 slots de IFrame. Una vez ocupada tu categoría, no hay segunda opción.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "14px", marginBottom: "24px" }}>
              {[
                { value: "2", label: "SLOTS POR EPISODIO", sub: "máximo por transmisión" },
                { value: "54", label: "EPISODIOS EN 2026", sub: "programados este año" },
                { value: "1", label: "MARCA POR CATEGORÍA", sub: "exclusividad garantizada" },
              ].map((item) => (
                <div key={item.label} style={{ background: t.cardAlt, border: `1px solid ${t.borderLight}`, borderRadius: "10px", padding: "18px 14px" }}>
                  <div style={{ fontSize: "30px", fontWeight: "900", color: t.red }}>{item.value}</div>
                  <div style={{ fontSize: "9px", color: t.subtle, letterSpacing: "2px", fontWeight: "700", marginTop: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "10px", color: darkMode ? "#444" : "#999", marginTop: "4px" }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: `${t.red}99`, letterSpacing: "1px", margin: 0 }}>
              Los espacios se asignan por orden de llegada. Reserva tu categoría antes de que lo haga tu competencia.
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
                <div style={{ fontSize: "9px", color: darkMode ? "#444" : "#999", letterSpacing: "3px", marginBottom: "12px", fontWeight: "700" }}>INCLUYE</div>
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
            <div style={{ fontSize: "9px", color: t.accent, letterSpacing: "4px", fontWeight: "700", marginBottom: "8px" }}>SOCIAL PROOF</div>
            <h3 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "900", color: t.heading, margin: 0, fontFamily: "Georgia,serif" }}>Así se ve tu marca en 10AMPRO</h3>
            <p style={{ color: t.subtle, fontSize: "12px", marginTop: "8px", letterSpacing: "1px" }}>IFrame visible durante el 100% del episodio · Casos reales</p>
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
                    {s.episode} · Ver episodio ↗
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
              <div style={{ fontSize: "9px", color: t.green, letterSpacing: "4px", fontWeight: "700", marginBottom: "6px" }}>LO QUE DICE LA AUDIENCIA</div>
              <p style={{ color: t.subtle, fontSize: "12px", letterSpacing: "1px", margin: 0 }}>Suscriptores de pago · Substack</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "14px" }}>
              {[
                { name: "Felipe Castrillón", badge: "Paid Subscriber · Substack", quote: "El contenido que comparten en los podcast es valioso para mi proyecto de retiro. Me ayuda a estructurar decisiones de inversión y planificación." },
                { name: "Juan D", badge: "Paid Subscriber · Substack", quote: "Gracias por aportar a una mejor dieta mental en un mundo hiperconectado para compartir mayormente basura. Como emprendedor, agradecido por el valor recibido y me alegro de contribuir a esta generación de valor que promueven." },
                { name: "Jose Cardenas", badge: "Paid Subscriber · Substack", quote: "I support you because my \"younger self\" would have loved to be like you when I grew up... and also because your episodes are the best way to learn how to invest." },
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
        <SponsorLogin />

        {/* ── CTA ── */}
        <div style={{ textAlign: "center" }}>
          <a href="https://forms.gle/SuszJCtsQE7mF6mPA" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{ background: t.ctaGrad, color: t.accent, border: `1px solid ${t.accent}44`, padding: "16px 52px", fontSize: "12px", fontWeight: "900", letterSpacing: "4px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Courier New',monospace" }}>
              QUIERO SER PATROCINADOR →
            </button>
          </a>
          <div style={{ color: t.footerText, fontSize: "11px", marginTop: "16px", letterSpacing: "1px" }}>
            10AMPRO · Innovación, Tecnología y Negocios para LATAM · 2026 · www.10am.pro
          </div>
        </div>

      </div>
    </div>
  );
}
