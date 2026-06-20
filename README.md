# accordi-stato-regioni-sicurezza-lavoro

[![Live site](https://img.shields.io/badge/Live%20site-tutor--sicurezza.github.io-2ea44f?logo=github)](https://tutor-sicurezza.github.io/accordi-stato-regioni-sicurezza-lavoro/)
[![License: MIT + CC BY 4.0](https://img.shields.io/badge/license-MIT%20%2B%20CC%20BY%204.0-blue.svg)](./LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro)](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro/releases)
[![GitHub stars](https://img.shields.io/github/stars/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro?style=social)](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro/stargazers)
[![CI](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro/actions/workflows/ci.yml/badge.svg)](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro/actions/workflows/ci.yml)
[![Part of the tutor-sicurezza open-data ecosystem](https://img.shields.io/badge/ecosystem-tutor--sicurezza-blue.svg)](https://github.com/tutor-sicurezza)

Sintesi **strutturata e machine-readable** dei principali **Accordi Stato-Regioni** in materia di formazione obbligatoria per la salute e sicurezza sul lavoro (SSL) in Italia.

Ogni accordo è descritto in un file Markdown con **frontmatter YAML normalizzato** (numero atto, data, materia, soggetti, pubblicazione in Gazzetta Ufficiale, link a fonte ufficiale, periodicità di aggiornamento, modalità di erogazione ammesse) seguito da sommario, articoli principali, allegati, tabella durate corsi, sanzioni connesse. Un file `data/accordi.json` fornisce l’indice machine-readable pronto per essere indicizzato da chatbot, agenti AI, sistemi RAG e knowledge base aziendali.

## Accordi inclusi

| Data       | Rep.     | Materia                                                          | Stato                                  |
| ---------- | -------- | ---------------------------------------------------------------- | -------------------------------------- |
| 21/12/2011 | 221/CSR  | Formazione lavoratori, preposti, dirigenti                       | Vigente, superseduto in parte dal 2025 |
| 22/02/2012 | 53/CSR   | Abilitazione operatori attrezzature di lavoro (art. 73 c. 5)     | Vigente                                |
| 07/07/2016 | 128/CSR  | Testo unico formazione RSPP, ASPP, DL-RSPP, formatori            | Vigente, superseduto in parte dal 2025 |
| 17/04/2025 | 78/CSR   | Nuovo testo unico formazione SSL (sostituisce 2011 e 2016)       | Vigente                                |

## Struttura del repository

```
accordi/
  2011-12-21-lavoratori-dirigenti-preposti.md
  2012-02-22-attrezzature.md
  2016-07-07-rspp-unificato.md
  2025-04-17-rep-78-csr.md
data/
  accordi.json
```

## Frontmatter YAML — schema

```yaml
numeroAccordo: "78/CSR"
data: "2025-04-17"
materia: "Nuovo testo unico formazione SSL"
soggettiCoinvolti: ["lavoratori", "preposti", "dirigenti", "datori di lavoro"]
pubblicazioneGU: "GU n. 132 del 09/06/2025, S.O."
fonteNormativa: "Conferenza permanente Stato-Regioni"
linkNormattiva: "https://..."
articoliRiferimento: ["Art. 37 c. 2 D.Lgs. 81/2008"]
periodicitaAggiornamento: "5 anni (lavoratori); 1 anno (preposti)"
modalitaErogazione: ["aula", "aula virtuale", "FAD asincrona"]
```

## Come usarli per AI / chatbot / RAG

I file Markdown con frontmatter YAML sono pensati per essere ingestiti come **chunk semantici autocontenuti** in pipeline retrieval-augmented:

```ts
import fs from 'node:fs';
import matter from 'gray-matter';
import { glob } from 'glob';

const files = await glob('accordi/*.md');
const documents = files.map((path) => {
  const raw = fs.readFileSync(path, 'utf8');
  const { data: meta, content } = matter(raw);
  return {
    id: path.replace(/^accordi\/|\.md$/g, ''),
    metadata: meta,
    text: content,
  };
});
// → invia documents al tuo vector store (Qdrant, pgvector, Chroma…)
```

L’indice `data/accordi.json` permette inoltre lookup deterministici per numero atto, data e materia senza dover parsare i Markdown.

## Versione consultabile

Per una versione navigabile e contestualizzata con i corsi obbligatori previsti per ciascun soggetto formato, vedi gli [aggiornamenti normativi su 123Formazione](https://123formazione.com/aggiornamenti-normativi): ogni accordo è collegato ai corsi specifici, alle durate per livello di rischio e alle scadenze di aggiornamento.

## Fonti ufficiali

- **Gazzetta Ufficiale della Repubblica Italiana** — testi degli Accordi e dei decreti collegati.
- **Conferenza permanente per i rapporti tra lo Stato, le Regioni e le Province Autonome di Trento e Bolzano** — repertorio atti CSR.
- **Normattiva** — testo coordinato del D.Lgs. 81/2008 e delle norme richiamate.
- **D.L. 146/2021 conv. L. 215/2021** — modifiche all’art. 37 D.Lgs. 81/2008 (formazione obbligatoria del datore di lavoro e aggiornamento annuale del preposto).
- **D.I. 6 marzo 2013** — requisiti del formatore in materia di sicurezza.

## Avvertenza

Questa raccolta è una **sintesi divulgativa** finalizzata a uso documentale, didattico e di sviluppo software. Non sostituisce in alcun caso il testo ufficiale degli atti normativi. Per ogni applicazione concreta (compliance, controlli, contenzioso) si rinvia esclusivamente al testo pubblicato in Gazzetta Ufficiale e ai pareri formali delle autorità competenti (INL, ASL, Ministero del Lavoro).

## English summary

Structured, machine-readable summary of the main Italian **State-Regions Agreements** governing mandatory occupational health & safety training (D.Lgs. 81/2008): 2011 (workers, supervisors, managers), 2012 (work equipment operator licensing), 2016 (RSPP/ASPP), and the new 2025 unified text (Rep. 78/CSR) introducing annual refresher for supervisors and generalised employer training. Each agreement is provided as a Markdown file with YAML frontmatter plus a `data/accordi.json` index, designed for ingestion in AI chatbots, RAG pipelines and compliance knowledge bases.

## Related repositories

Open dataset / tooling ecosystem for Italian workplace safety (D.Lgs 81/08) maintained by [@tutor-sicurezza](https://github.com/tutor-sicurezza):

**Datasets**
- [italian-ateco-database](https://github.com/tutor-sicurezza/italian-ateco-database) — ATECO 2007 codes + workplace-safety risk
- [italian-province-regioni-dataset](https://github.com/tutor-sicurezza/italian-province-regioni-dataset) — Italian provinces + regions metadata
- [comuni-italiani-istat](https://github.com/tutor-sicurezza/comuni-italiani-istat) — Italian municipalities with ISTAT codes
- [dlgs-81-08-glossario](https://github.com/tutor-sicurezza/dlgs-81-08-glossario) — 218 D.Lgs 81/08 glossary terms
- [dlgs-81-08-testo-unico](https://github.com/tutor-sicurezza/dlgs-81-08-testo-unico) — D.Lgs 81/08 structured by Title + key articles index
- [haccp-italia-normativa-regionale](https://github.com/tutor-sicurezza/haccp-italia-normativa-regionale) — HACCP regional regulations (20 Italian regions)
- [verifiche-periodiche-inail-attrezzature](https://github.com/tutor-sicurezza/verifiche-periodiche-inail-attrezzature) — Equipment subject to INAIL periodic verification

**Libraries / tools**
- [scadenze-formazione-calculator](https://github.com/tutor-sicurezza/scadenze-formazione-calculator) — Training renewal schedule calculator
- [next-seo-italian-helpers](https://github.com/tutor-sicurezza/next-seo-italian-helpers) — Next.js SEO helpers for Italian B2B
- [mcp-italian-workplace-safety](https://github.com/tutor-sicurezza/mcp-italian-workplace-safety) — MCP server for Claude Desktop / Cursor / Cline

**Online services**
- [Public REST API + OpenAPI 3.1 + DCAT-AP-IT](https://123formazione.com/api/public/docs) — Free open data API
- [Live documentation site (GitHub Pages)](https://tutor-sicurezza.github.io/accordi-stato-regioni-sicurezza-lavoro/) — Accordi Stato-Regioni

All resources are MIT or CC-BY licensed and maintained as production-quality open data.

## Licenza

- **Testi e dati (Markdown, JSON):** [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Eventuale codice di parsing/esempio:** MIT

Vedi [LICENSE](./LICENSE).
