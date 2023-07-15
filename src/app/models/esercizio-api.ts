import {EsercizioInterface} from "./esercizioInterface";

export class EsercizioAPI implements EsercizioInterface {
  difficulty: string = '';
  instructions: string = '';
  muscle: string = '';
  name: string = '';
  equipment: string = '';
  type: string = '';
  checked: boolean = false;
  userId: string = '';

  constructor(difficolta: string,
              descrizione: string,
              muscolo: string,
              nome: string,
              tipo: string,
              equipment: string,
              ) {
    this.difficulty = difficolta;
    this.instructions = descrizione;
    this.muscle = muscolo;
    this.name = nome;
    this.type = tipo;
    this.equipment=equipment;
  }
}
