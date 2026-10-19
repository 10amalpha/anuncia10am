# anuncia10am — Media Kit / Rate Card de 10AMPRO

**Live:** https://media.10am.pro (alias de `anuncia10am.vercel.app`) · Vercel project `prj_I07FrgNtJfkGkj80xvOz3n1Hgu26` · team `10ampros-projects`

## Estructura

| Archivo | Qué es |
|---|---|
| `stats.js` | **Única fuente de números** (episodios, seguidores por plataforma, totales de cortos, fecha de actualización). |
| `sponsorship-section-v3.jsx` | Componente completo del media kit (ES/EN, dark/light). Importa `STATS` y formatea. Textos, tiers, precios, sponsors, demografía viven aquí. |
| `pages/index.js` | Entry point Next.js. |
| `public/sponsors/` | Logos de sponsors. |

## Actualización semanal de datos (automática)

Una tarea programada de Claude ("Media kit · update semanal") corre cada lunes y:

1. Lee `https://growth.10am.pro/api/media-kit-stats` (repo `10am-growth`), que devuelve en una sola llamada:
   - `snapshot` → última fila de Supabase `growth_snapshots` (Spotify, Apple, X, TikTok, Substack, LinkedIn — la llena Hernán mensualmente en growth.10am.pro → Admin)
   - `live.youtube` / `live.instagram` → APIs en vivo
   - `episodes.count` → episodios largos (uploads ≥ 20 min, excluye Shorts)
2. Reescribe los valores de `stats.js` (nunca la forma del objeto).
3. `npx next build` → commit → push a `main` → Vercel despliega → verifica `READY`.

Reglas de seguridad de la tarea: si un valor cae >15 % vs el actual, o el conteo de episodios se mueve más de ±6, no se sobreescribe ese campo y se reporta.

Lo que **no** se automatiza (se actualiza a mano desde el dashboard de cortos cuando hay carga nueva): `STATS.shorts.*` (views totales, clips, avg/clip, engagement, likes, % por plataforma) — fuente https://10ampro-shorts-analytics.vercel.app/.

## Edición manual

- Precios / tiers / textos → `I18N` en `sponsorship-section-v3.jsx` (ES y EN).
- Sponsors y episodios de referencia → array `sponsors` en el mismo archivo.
- Demografía (edad, país, dispositivo) → `demoKpis`, `ageData`, `behavior` — refrescar ~trimestral desde YouTube Studio + Substack.
