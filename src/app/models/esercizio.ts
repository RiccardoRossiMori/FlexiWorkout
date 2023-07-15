import {EsercizioInterface} from "./esercizioInterface";

export class Esercizio implements EsercizioInterface {
  difficulty: string = '';
  equipment: string = '';
  instructions: string = '';
  muscle: string = '';
  name: string = '';
  type: string = '';
  serie: number = 0;
  ripetizioni: number = 0;
  timer: number = 0; //tempo di riposo
  peso: number = 0; //peso utilizzato
  tabata: boolean = false; //se ha bisogno di un secondo timer per un tipo di esercizio tabata
  timerTabata: number = 0; //tempo di esercizio attivo
  userId: string = '';

  constructor(ex: EsercizioInterface, se: number, rep: number, time: number, weight: number, tab: boolean, ttab: number) {
    this.difficulty = ex.difficulty;
    this.equipment = ex.equipment;
    this.instructions = ex.instructions;
    this.muscle = ex.muscle;
    this.name = ex.name;
    this.type = ex.type;
    this.serie = se;
    this.ripetizioni = rep;
    this.timer = time;
    this.peso = weight;
    this.tabata = tab;
    this.timerTabata = ttab;
  }
}
