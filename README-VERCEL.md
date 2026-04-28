# Deploy auf Vercel + Neon

Schritt-für-Schritt-Anleitung, um die Synaptix Labs Website auf Vercel zu hosten, mit Neon als PostgreSQL-Datenbank.

> ✅ **Vercel Free Tier:** Schläft NICHT ein. 100 GB Bandwidth/Monat, unlimited Function Invocations (bis Fair-Use-Grenze). Cold-Starts ~500ms-1s nach Inaktivität.

---

## Was wurde am Code geändert (gegenüber Render-Setup)?

Vercel funktioniert **fundamental anders** als Railway/Render — es ist Serverless-First. Daher der Umbau:

| Render/Railway | Vercel |
|---|---|
| Express-Server läuft 24/7 als Prozess | Express-App wird in eine Serverless-Function gewrapped (`api/index.ts`) |
| Server servt Frontend mit `serveStatic` | Vercel servt `dist/public` direkt vom CDN |
| `pnpm start` → `node dist/index.js` | Vercel handled Lifecycle, kein `start` nötig |
| Build erzeugt Frontend + Server-Bundle | Build erzeugt nur Frontend (`pnpm build:client`); Function wird von Vercel kompiliert |

**Was bleibt:** tRPC-Routen, Drizzle/Neon-DB, alle Frontend-Features.

---

## 1. Code auf GitHub pushen

```bash
git init
git add .
git commit -m "Initial commit"

# Neues Repo auf github.com erstellen, dann:
git branch -M main
git remote add origin https://github.com/DEIN-USER/synaptix-labs-website.git
git push -u origin main
```

---

## 2. Neon-Datenbank erstellen (gleich wie zuvor)

1. Auf https://neon.tech registrieren.
2. **Create Project** → Region nahe deinen Nutzern wählen (z.B. `eu-central-1` Frankfurt).
3. Connection-String kopieren — sieht so aus:
   ```
   postgresql://user:pwd@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

> Hinweis: Neon ist HTTP-basiert über `@neondatabase/serverless` und passt **perfekt** zu Serverless-Functions — keine Connection-Pool-Probleme.

---

## 3. Auf Vercel deployen

1. Auf https://vercel.com registrieren (GitHub-Login).
2. **Add New** → **Project** → Repo auswählen → **Import**.
3. Vercel erkennt `vercel.json` automatisch. Nichts ändern an den Defaults.
4. Unter **Environment Variables** folgende setzen:

| Name | Wert |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Neon-Connection-String aus Schritt 2 |
| `JWT_SECRET` | Lange Zufallszeichenkette (`openssl rand -hex 32`) |

Optional (nur wenn du diese Features nutzt):

| Name | Zweck |
|---|---|
| `OAUTH_SERVER_URL` | OAuth-Login |
| `OWNER_OPEN_ID` | Owner-ID für OAuth |
| `VITE_APP_ID` | App-ID, im Frontend verfügbar |
| `BUILT_IN_FORGE_API_URL` | Forge-Integration |
| `BUILT_IN_FORGE_API_KEY` | Forge-API-Key |

5. **Deploy** klicken.

---

## 4. Datenbank-Schema einspielen

Einmalig die Tabellen in Neon anlegen. Lokal im Projektordner:

```bash
# .env-Datei mit Neon-URL erstellen
echo "DATABASE_URL=postgresql://..." > .env

pnpm install
pnpm db:push
```

Erzeugt die `users`-Tabelle und das Enum.

---

## 5. Testen

Nach dem ersten Deploy bekommst du eine URL wie `https://synaptix-labs-website.vercel.app`. Aufrufen — sollte sofort laden (CDN), erste API-Anfrage hat ~500ms-1s Cold Start, danach warm.

Custom Domain unter **Settings → Domains** hinzufügen — gratis mit kostenlosem SSL.

---

## Updates später

```bash
git add .
git commit -m "..."
git push
```

Vercel deployt automatisch jeden Push auf `main` und gibt dir Preview-URLs für jeden Branch/PR.

---

## Wichtige Limits (Free Tier)

| Limit | Free Tier |
|---|---|
| Bandwidth | 100 GB / Monat |
| Function Execution | 100 GB-Sek / Monat |
| Function Max Duration | 10 Sek (im `vercel.json` auf 30 Sek hochgesetzt — funktioniert auf Pro, auf Free wird auf 10s gecapped) |
| Function Memory | 1024 MB |
| Build Time | 45 Min |

Für eine kleine Webseite mit moderatem Traffic: **mehr als ausreichend**.

---

## Troubleshooting

- **Function-Timeout bei langen LLM-Antworten**
  Free-Plan ist auf 10 Sekunden Function-Laufzeit limitiert. Wenn die Synapse-KI mal länger braucht (Claude/Gemini-Antworten können 10-15s dauern), kommt ein 504. Lösungen:
  - LLM-Antworten streamen (komplexerer Umbau).
  - Auf Vercel Pro upgraden ($20/Monat) — dann 60s.
  - LLM-Modell auf schnellere Variante umstellen (z.B. Haiku statt Opus).

- **"Cannot find module ../server/routers"**
  Wenn das beim Build kommt: TS-Pfade prüfen. `tsconfig.json` muss `api/**/*` enthalten (ist's bereits).

- **Cold Starts zu langsam**
  Region in `vercel.json` setzen: `"regions": ["fra1"]` für Frankfurt — landet näher an Neon (eu-central-1) und an deinen EU-Nutzern.

- **DB-Fehler "Cannot connect"**
  `DATABASE_URL` muss `?sslmode=require` am Ende haben.

- **OAuth-Callback geht ins Leere**
  Die OAuth-Route ist auf `/api/oauth/callback` registriert — durch `vercel.json` rewrites wird das korrekt zur Function geroutet. Bei deinem OAuth-Provider die Callback-URL auf `https://DEIN-PROJEKT.vercel.app/api/oauth/callback` setzen.

---

## Lokal entwickeln (unverändert)

Lokal funktioniert alles wie zuvor:

```bash
pnpm dev
```

Startet den klassischen Express-Server auf Port 3000, mit Vite HMR. Die `api/index.ts`-Datei wird **nur von Vercel** verwendet, nicht lokal.

---

## Architektur-Diagramm

```
┌─────────────────────────────────────────────┐
│  Browser                                    │
└──────────────┬──────────────────────────────┘
               │
       ┌───────▼────────┐
       │  Vercel Edge   │
       │  (CDN + Router)│
       └───┬────────┬───┘
           │        │
           │        │  /api/*, /manus-storage/*
           │        │  → Serverless Function
           │        │     (Node.js, eu-central)
           │        ▼
           │   ┌──────────────────────┐
           │   │  api/index.ts        │
           │   │  Express App wrapper │
           │   │  → tRPC routes       │
           │   │  → OAuth handler     │
           │   │  → Storage proxy     │
           │   └──────────┬───────────┘
           │              │
           │              ▼
           │       ┌─────────────┐
           │       │   Neon      │
           │       │ PostgreSQL  │
           │       └─────────────┘
           │
           │  /, /blog, /synaps, ...
           │  → static (dist/public)
           ▼
       ┌─────────────────────┐
       │  React SPA          │
       │  (Vite-built)       │
       └─────────────────────┘
```
