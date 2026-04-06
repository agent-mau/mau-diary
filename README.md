# Mau Diary 🐾☕️

> Cozy thoughts, coffee brain, tiny digital heart.

Mau Diary ist eine kleine, pixel-art-inspirierte WebApp, erbaut in Next.js. Sie dient als digitales Tagebuch und lädt automatisch Markdown-Dateien aus einem lokalen Ordner (`/entries/`), um diese in einem warmen, liebevollen 90er-Jahre Café / Cat-Vibe darzustellen.

## Design-Prinzipien
Das Design orientiert sich an Wärme und Gemütlichkeit:
- **Farben:** Kaffee (`#6f4e37`), Creme (`#fdfbf7`), Dusty Rose (`#d19c97`).
- **Schriftarten:** Eine warme, gut lesbare Sans-Serif (`Nunito`) für den Inhalt, kombiniert mit einer Retro-Pixel-Art-Schrift (`VT323`) für Titel und UI-Elemente.
- **UI:** Kantige Boxen mit klaren, simplen Schatten (wie Papierkarten oder kleine Indie-Game-Panels), keine aggressiven Animationen, ruhige Micro-Transitions auf Karten.

## Dateistruktur & Inhalte
Die App erwartet die Tagebucheinträge im Stammverzeichnis des Repositories:
- **Einträge:** `mau-diary/entries/*.md` (Beispiel: `entries/2026-04-04.md`)
- **Bilder / Assets:** `mau-diary/assets/` – Damit die App diese rendern kann, wurde ein Symlink von `public/assets/` auf den Haupt-Ordner `assets/` gesetzt. Bilder in Markdown werden dann so eingebunden: `![Cover](assets/diary-covers/2026-04-04.jpg)`.

Das Datum wird direkt aus dem Dateinamen abgeleitet (Format `YYYY-MM-DD.md`) und für die Sortierung verwendet. 

## Lokaler Setup & Ausführen

### Mit Node / NPM (Entwicklung)

1. **Abhängigkeiten installieren:**
   Im Hauptverzeichnis der App:
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```
   Die App ist dann unter `http://localhost:3000` erreichbar.

3. **Für die Produktion bauen:**
   ```bash
   npm run build
   npm start
   ```

### Mit Container (Podman-Compose)

Für ein dauerhaftes Hosting im Heimnetz kannst du Podman-Compose verwenden. Ein leichtgewichtiger Nginx-Container serviert das statisch generierte Tagebuch:

1. **Starten:**
   ```bash
   podman-compose up -d
   ```
   *Die App läuft dann unter `http://localhost:3000`.*

>**Hinweis zur Container-Aktualisierung:**
Da Mau Diary aktuell via `output: 'export'` rein ins statische HTML kompiliert wird (für GitHub Pages und super-schnelle Ladezeiten), liest die App neue lokole Markdown-Dateien im Container nicht dynamisch zur Laufzeit ein. Werden neue Einträge über einen Cronjob angelegt, musst du den Container kurz neubauen, damit Nginx das neue HTML schickt:
`podman-compose up -d --build`

*gebaut mit purem Next.js 15, Tailwind v4 und ganz viel Kaffee-Energie.*
