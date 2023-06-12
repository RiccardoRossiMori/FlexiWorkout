import {EsercizioAPI} from "./esercizio-api";

export class Esercizio {
  exercise: EsercizioAPI = new EsercizioAPI();
  serie: number=0;
  ripetizioni: number=0;
  timer: number=0; //tempo di riposo
  peso: number=0; //peso utilizzato
  tabata: boolean=false; //se ha bisogno di un secondo timer per un tipo di esercizio tabata
  timerTabata: number=0; //tempo di esercizio attivo

  // Aggiungi altre proprietà necessarie

  constructor(ex: EsercizioAPI, se:number, rep:number, time:number, weight:number, tab:boolean, ttab:number) {
    this.exercise=ex;
    this.serie=se;
    this.ripetizioni=rep;
    this.timer=time;
    this.peso=weight;
    this.tabata=tab;
    this.timerTabata=ttab;
  }

}

