# Contribuire a openings.dev

Grazie per contribuire a migliorare `openings.dev`.

## Ambito

Questo repository contiene il front-end statico in Next.js. Non conserva né genera i dati delle offerte.

Usa questo repository per:

- Miglioramenti di UI e UX.
- Correzioni di routing, pagine statiche e accessibilità.
- Miglioramenti ai servizi per i dati remoti in `lib/opportunities`.
- Aggiornamenti della documentazione del front-end.

Usa [`openings-dev/data-pipeline`](https://github.com/openings-dev/data-pipeline) per:

- Modifiche al catalogo dei repository sorgente.
- Logica di acquisizione e normalizzazione da GitHub.
- Generazione degli snapshot e dei file dell'API statica.

## Regole per i dati

- Non aggiungere al front-end dati locali delle offerte, dataset simulati, fixture, `db.json` o snapshot JSON.
- Non importare file `.json` locali per ottenere i dati delle offerte.
- Non reintrodurre una route locale `/api/opportunities`.
- Mantieni la costruzione degli URL dei dati raw in `lib/opportunities/static-api.ts`.
- Mantieni le letture dell'API statica in `lib/opportunities/api.ts`.
- Mantieni le letture degli snapshot in `lib/opportunities/snapshot.ts`.

## Configurazione dell'ambiente di sviluppo

Requisiti:

- Node.js `>=20.9.0`
- npm

```bash
npm install
npm run dev
```

Apri `http://localhost:3000`.

Crea un file `.env.local` solo quando verifichi un altro branch dei dati remoti:

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data-pipeline/main
```

## Struttura del progetto

```txt
app/                      route di App Router e UI specifica delle route
components/               struttura condivisa, provider, icone e componenti UI
lib/opportunities/        servizi per i dati remoti, helper di routing e tipi del dominio
lib/translations/         messaggi localizzati dell'interfaccia
lib/utils/                utility condivise
docs/                     file Markdown localizzati mostrati dall'applicazione
```

## Flusso delle pull request

1. Crea un branch da `main`.
2. Mantieni la modifica circoscritta.
3. Esegui i controlli:

```bash
npm run lint
npm run build
```

4. Apri una pull request con:

- Un riepilogo chiaro.
- Screenshot per le modifiche visive.
- Note di test con l'elenco dei comandi eseguiti.
- Eventuali override della fonte dei dati usati durante i test.

## Checklist della pull request

- [ ] Non sono stati aggiunti file di dati locali né importazioni JSON.
- [ ] L'accesso ai dati remoti resta centralizzato in `lib/opportunities`.
- [ ] I componenti restano circoscritti e riutilizzabili.
- [ ] La documentazione è stata aggiornata quando sono cambiati il comportamento o la configurazione.
- [ ] `npm run lint` e `npm run build` vengono completati correttamente in locale.

## Codice di condotta

Partecipando, accetti di rispettare il [Codice di condotta](https://github.com/openings-dev/web/blob/main/CODE_OF_CONDUCT.md).
