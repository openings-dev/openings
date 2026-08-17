# Panoramica di openings.dev

`openings.dev` aiuta a trovare offerte di lavoro tech già condivise nelle comunità pubbliche su GitHub. Raccoglie gli annunci in un'interfaccia di ricerca e mantiene il link alla fonte originale di ogni offerta.

La disponibilità e le modalità di candidatura possono cambiare. Controllale sempre nella pubblicazione originale.

## Cosa puoi fare

- Cercare offerte aperte per testo, repository, località, tag o account GitHub autore dell'annuncio.
- Ordinare i risultati e scegliere tra la vista elenco e la griglia.
- Consultare le pagine delle comunità e degli autori generate dai rispettivi annunci indicizzati.
- Aprire un'offerta con il parametro condivisibile `?job=<id>` nella pagina di ricerca.
- Tornare alla pubblicazione e al repository di origine per controllare i dettagli aggiornati.

## Come funziona

1. La pipeline separata `openings-dev/data` legge le fonti pubbliche delle comunità GitHub configurate.
2. Normalizza gli annunci supportati e genera file JSON statici con pagine, facet, indici di ricerca e dettagli delle offerte.
3. Pubblica questi file su GitHub. Il front-end li legge da `raw.githubusercontent.com`.
4. L'interfaccia risolve ricerca, filtri, ordinamento e paginazione a partire da questi file.
5. Le pagine statiche delle comunità e degli autori vengono generate dallo stesso insieme di dati durante la build.

## Architettura del front-end

Il front-end usa Next.js App Router ed è esportato come sito statico. Non contiene un'API locale per le offerte e non conserva una copia locale dell'inventario.

- `app/` contiene le route e le schermate specifiche di ciascuna route.
- `components/` contiene la struttura condivisa e i componenti riutilizzabili.
- `lib/opportunities/` gestisce gli URL remoti, la validazione, la normalizzazione, le query e i tipi di dominio.
- `lib/utils/` contiene utility indipendenti dal framework.
- `docs/` e i file Markdown nella directory principale forniscono i contenuti della documentazione e delle policy.

## Confini del prodotto

- Front-end: `openings-dev/openings`.
- Pipeline dei dati e file JSON statici: `openings-dev/data`.
- Fonti: pubblicazioni pubbliche supportate delle comunità GitHub.
- Dati locali sulle offerte nel front-end: nessuno.
- Route API locale per le offerte: nessuna.

Openings è uno strumento di ricerca. Non verifica i datori di lavoro, non riceve candidature e non sostituisce la pubblicazione originale.
