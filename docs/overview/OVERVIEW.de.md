# Überblick über openings.dev

`openings.dev` bündelt Tech-Stellen aus öffentlichen GitHub-Communities, damit sie leichter zu finden und zu vergleichen sind. Jede Stelle bleibt mit ihrer Originalquelle verknüpft. Dort können Interessierte aktuelle Angaben und die nächsten Schritte prüfen.

Das Frontend nutzt den Next.js App Router und wird als statische Website exportiert. Es enthält keine lokale Kopie der Stellenanzeigen, sondern liest die öffentlichen JSON-Dateien aus dem separaten Repository `openings-dev/data`.

## Was Openings leistet

- Sucht nach Stellenbezeichnung, Stack, Erfahrungsstufe, Arbeitsort und Arbeitsmodell.
- Filtert und sortiert nach Repository, Region, Land, Tag und dem GitHub-Konto, das eine Anzeige veröffentlicht hat.
- Erzeugt öffentliche Seiten für Communities und die GitHub-Konten hinter den indexierten Anzeigen.
- Öffnet Stellendetails innerhalb der Suche über den Parameter `?job=<id>`.
- Behält bei jedem Eintrag den Link zur Originalquelle und zum GitHub-Repository bei.
- Stellt Projektdokumentation und Richtlinien aus den Markdown-Dateien des Repositorys bereit.

## Datenfluss

1. Die Pipeline `openings-dev/data` liest die konfigurierten öffentlichen GitHub-Quellen.
2. Sie normalisiert die Anzeigen, erstellt Suchfacetten und veröffentlicht paginierte statische JSON-Dateien.
3. Das Frontend liest diese Dateien von `raw.githubusercontent.com`.
4. Die Suche ordnet Filter den IDs und Dateien mit den passenden Stellen zu.
5. Community- und Autorenprofile werden beim Build aus denselben öffentlichen Daten erzeugt.

## Aktuelle Grenzen

- Frontend: `openings-dev/openings`.
- Pipeline und öffentliche Datendateien: `openings-dev/data`.
- Lokale Stellendateien im Frontend: keine.
- Lokale API-Route für Stellen: keine.
- Unterstützte Quellen: Anzeigen aus konfigurierten öffentlichen GitHub-Quellen.

## Architektur im Überblick

- `app/` enthält die Routen und ihre Ansichten.
- `components/` enthält die gemeinsam genutzte Struktur und wiederverwendbare UI-Komponenten.
- `lib/opportunities/` enthält den Zugriff auf entfernte Dateien, Routing-Helfer und Domänentypen.
- `lib/utils/` enthält frameworkunabhängige Hilfsfunktionen.
- `docs/` und die Markdown-Dateien im Stammverzeichnis liefern die Inhalte der Dokumentationsrouten.

## Produktumfang

Openings macht bereits veröffentlichte Tech-Stellen aus Communities leichter auffindbar. Es prüft keine Arbeitgeber, garantiert nicht, dass eine Stelle noch offen ist, nimmt keine Bewerbungen an und ersetzt nicht die Originalquelle.
