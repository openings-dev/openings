# API-Referenz

Dieses Dokument beschreibt die Ausrichtung der oeffentlichen API von openings.dev.

Die API stellt denselben normalisierten Stellenindex bereit wie die Web-App, um Integrationen, Automatisierungen und Analysen in Drittprodukten zu ermoeglichen.

## Status

Die API ist oeffentlich und entwickelt sich weiter. Vertragsdetails koennen sich aendern, waehrend Filter und Normalisierungsregeln reifen.

## Designziele

- Konsistentes Schema ueber alle Quell-Repositories.
- Vorhersehbare Pagination fuer inkrementelle Synchronisierung.
- Stabile IDs fuer Deduplizierung.
- Klare Felder fuer Stack, Senioritaet, Remote und Standort.

## Support

Bei Fragen oder Integrationsfeedback:

- [GitHub Issues](https://github.com/openings-dev/openings/issues)
