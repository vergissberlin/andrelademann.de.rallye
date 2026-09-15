# Rallye – Bring den Sommer zurück

Interaktive Retro-Eis-Fankampagne im Stil eines deutschen Freibad-Eisautomaten der 1990er.

## Lokal starten

```bash
npm ci
npm run dev
```

## Architektur

- Astro + TypeScript
- XState für den Automaten-Flow
- Netlify Functions für Counter und Votes
- Supabase für persistente, fortlaufende Nummern
- Vitest für State-Machine-Tests

Die Netlify-Funktionen enthalten aktuell sichere MVP-Platzhalter. Vor dem öffentlichen Kampagnenstart müssen Supabase-Anbindung, Rate-Limiting, Session-Hashing und die serverseitige Share-Grafik ergänzt werden.
