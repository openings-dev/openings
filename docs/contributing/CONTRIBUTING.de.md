# Zu openings.dev beitragen

Danke, dass du `openings.dev` verbesserst.

## Umfang

Dieses Repository enthält das statische Next.js-Frontend. Es speichert oder erzeugt keine Stellendaten.

Nutze dieses Repository für:

- Verbesserungen an Benutzeroberfläche und User Experience.
- Korrekturen an Routing, statischen Seiten und Barrierefreiheit.
- Verbesserungen an Diensten für entfernte Daten unter `lib/opportunities`.
- Aktualisierungen der Frontend-Dokumentation.

Nutze [`openings-dev/data-pipeline`](https://github.com/openings-dev/data-pipeline) für:

- Änderungen am Katalog der Quell-Repositories.
- Logik für das Einlesen und Normalisieren von GitHub-Daten.
- Erzeugung von Snapshots und Dateien der statischen API.

## Datenregeln

- Füge dem Frontend keine lokalen Stellendaten, Mock-Datensätze, Fixtures, `db.json` oder JSON-Snapshots hinzu.
- Importiere keine lokalen `.json`-Dateien mit Stellendaten.
- Führe keine lokale Route `/api/opportunities` wieder ein.
- Belasse die Konstruktion der Rohdaten-URLs in `lib/opportunities/static-api.ts`.
- Belasse Lesezugriffe auf die statische API in `lib/opportunities/api.ts`.
- Belasse Lesezugriffe auf Snapshots in `lib/opportunities/snapshot.ts`.

## Entwicklungsumgebung

Voraussetzungen:

- Node.js `>=20.9.0`
- npm

```bash
npm install
npm run dev
```

Öffne `http://localhost:3000`.

Erstelle `.env.local` nur, wenn du einen anderen entfernten Daten-Branch testest:

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

## Projektstruktur

```txt
app/                      App-Router-Routen und routenspezifische Benutzeroberfläche
components/               gemeinsam genutzte App-Struktur, Provider, Icons und UI-Komponenten
lib/opportunities/        Dienste für entfernte Daten, Routing-Helfer und Domänentypen
lib/translations/         lokalisierte Meldungen der Benutzeroberfläche
lib/utils/                gemeinsam genutzte Hilfsfunktionen
docs/                     lokalisierte Markdown-Dateien, die die Anwendung darstellt
```

## Pull-Request-Ablauf

1. Erstelle einen Branch ausgehend von `main`.
2. Begrenze die Änderung auf ein klares Ziel.
3. Führe die Prüfungen aus:

```bash
npm run lint
npm run build
```

4. Öffne einen Pull Request mit:

- Einer klaren Zusammenfassung.
- Screenshots bei visuellen Änderungen.
- Prüfhinweisen mit den ausgeführten Befehlen.
- Allen während der Prüfung verwendeten Überschreibungen der Datenquelle.

## Pull-Request-Checkliste

- [ ] Es wurden keine lokalen Datendateien oder JSON-Importe hinzugefügt.
- [ ] Der Zugriff auf entfernte Daten bleibt in `lib/opportunities` zentralisiert.
- [ ] Komponenten bleiben fokussiert und wiederverwendbar.
- [ ] Die Dokumentation wurde aktualisiert, wenn sich Verhalten oder Einrichtung geändert haben.
- [ ] `npm run lint` und `npm run build` laufen lokal erfolgreich durch.

## Verhaltenskodex

Mit deiner Teilnahme erklärst du dich mit dem [Verhaltenskodex](https://github.com/openings-dev/web/blob/main/CODE_OF_CONDUCT.md) einverstanden.
