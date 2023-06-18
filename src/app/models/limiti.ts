import {Scheda} from "./scheda";
import {Esercizio} from "./esercizio";
import {ProprietaCompilaSchedaPage} from "../scheda-attiva/scheda-attiva.page";

export class DefaultCard {
  defaultSerie: number = 4;
  defaultRep: number = 12;
}

export class LimitCard {
  maxTempo: number = 600;
  maxSerie: number = 50;
  maxRep: number = 300;
  compilaSchedaPage: ProprietaCompilaSchedaPage; // Aggiungi una proprietà per la referenza alla pagina

  constructor(compilaSchedaPage: ProprietaCompilaSchedaPage) {
    this.compilaSchedaPage = compilaSchedaPage;
  }


  limitValue(target: any, max: number, index: number, scheda: Scheda): Scheda {
    const value = parseInt(target.value, 10);
    if (value > max) {
      target.value = max.toString();
    }
    switch (target.id) {
      case 'Serie': {
        scheda.esercizi[index].serie = value;
        break;
      }
      case 'Ripetizioni': {
        scheda.esercizi[index].ripetizioni = value;
        break;
      }
      case 'Peso': {
        scheda.esercizi[index].peso = value;
        break;
      }
      case 'Timer': {
        scheda.esercizi[index].timer = value;
        break;
      }
      case 'Timer Tabata': {
        scheda.esercizi[index].timerTabata = value;
        break;
      }
    }

    this.compilaSchedaPage.isButtonDisabled =
      scheda.esercizi.some(
        (esercizio: Esercizio) => esercizio.serie <= 0 || isNaN(esercizio.serie)
      ) ||
      scheda.esercizi.some(
        (esercizio: Esercizio) =>
          esercizio.ripetizioni <= 0 || isNaN(esercizio.ripetizioni)
      );
    return scheda;
  }
}
