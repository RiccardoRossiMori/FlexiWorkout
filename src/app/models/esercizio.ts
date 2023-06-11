export class Esercizio {
  difficolta: string='';
  descrizione: string=''; //breve descrizione dell'esercizio
  muscolo: string='';
  nome: string='';
  equipaggiamento: string=''; //equipaggiamento necessario
  tipo: string=''; //ad esempio cardio, strongman etc.
  serie: number=0;
  ripetizioni: number=0;
  timer: number=0; //tempo di riposo
  peso: number=0; //peso utilizzato
  tabata: boolean=false; //se ha bisogno di un secondo timer per un tipo di esercizio tabata
  timerTabata: number=0; //tempo di esercizio attivo

  // Aggiungi altre proprietà necessarie
/*
{ difficulty: string; instructions: string; muscle: string; name: string; equipment: string; type: string }
 */

}

