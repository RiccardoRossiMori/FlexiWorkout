import {EsercizioInterface} from "./esercizioInterface";

export class EsercizioAPI implements EsercizioInterface{
  difficulty: string = '';
  instructions: string = '';
  muscle: string = '';
  name: string = '';
  equipment: string = '';
  type: string = '';
  checked: boolean=false;
}
