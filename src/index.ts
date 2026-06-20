// ============================================================
// accordi-stato-regioni-sicurezza-lavoro
// Indice TypeScript dei principali Accordi Stato-Regioni SSL.
// I testi integrali (con frontmatter YAML) sono nei file Markdown
// della cartella /accordi.
// ============================================================

import accordiJson from '../data/accordi.json';

export interface AccordoIndex {
  /** Slug stabile uguale al nome file Markdown senza estensione. */
  id: string;
  /** Numero di repertorio Conferenza Stato-Regioni (es. "78/CSR"). */
  numeroAccordo: string;
  /** Data di sottoscrizione in formato ISO YYYY-MM-DD. */
  data: string;
  /** Materia / oggetto sintetico. */
  materia: string;
  /** Soggetti coinvolti (lavoratori, preposti, ecc.). */
  soggettiCoinvolti: string[];
  /** Riferimento alla pubblicazione in Gazzetta Ufficiale. */
  pubblicazioneGU: string;
  /** URL alla fonte ufficiale (statoregioni.it o gazzettaufficiale.it). */
  linkFonte: string;
  /** Percorso relativo del file Markdown con il testo strutturato. */
  fileMd: string;
  /** True se l’accordo è ancora vigente. */
  vigente: boolean;
  /** ID dell’accordo che lo sostituisce (null se nessuno). */
  supersedutoDa: string | null;
}

export const ACCORDI: ReadonlyArray<AccordoIndex> = accordiJson as AccordoIndex[];

export function getAccordoById(id: string): AccordoIndex | undefined {
  return ACCORDI.find((a) => a.id === id);
}

export function getAccordiBySoggetto(soggetto: string): AccordoIndex[] {
  return ACCORDI.filter((a) =>
    a.soggettiCoinvolti.some((s) => s.toLowerCase() === soggetto.toLowerCase()),
  );
}

export function getAccordiVigenti(): AccordoIndex[] {
  return ACCORDI.filter((a) => a.vigente);
}
