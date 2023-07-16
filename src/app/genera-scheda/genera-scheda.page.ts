import {Component, NgIterable, ViewChild} from '@angular/core';
import {IonSelect, IonTextarea} from '@ionic/angular';
import {ApiService} from "../api.service";
import {EsercizioAPI} from "../models/esercizio-api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genera-scheda',
  templateUrl: 'genera-scheda.page.html',
  styleUrls: ['genera-scheda.page.scss'],
})
export class GeneraSchedaPage {
  @ViewChild('nomeEsercizioTextarea', {static: false}) nomeEsercizioTextarea!: IonTextarea;
  @ViewChild('tipoEsercizioSelect', {static: false}) tipoEsercizioSelect!: IonSelect;
  @ViewChild('muscoloSelect', {static: false}) muscoloSelect!: IonSelect;
  @ViewChild('difficoltaSelect', {static: false}) difficoltaSelect!: IonSelect;
  eserciziAPI: any[]=[];
  isChecked: boolean = false;

  //TODO fai in modo che, cambiando parametri di ricerca, non spariscano gli esercizi selezionati.

  constructor( private api: ApiService,private router: Router) {
  }

  checkboxChanged() {
    this.isChecked = this.eserciziAPI.some(esercizio => esercizio.checked);
  }

  async getAndPushApi() {
    const nomeEsercizio = this.nomeEsercizioTextarea.value;
    const tipoEsercizio = this.tipoEsercizioSelect.value;
    const muscolo = this.muscoloSelect.value;
    const difficolta = this.difficoltaSelect.value;
    let str: string = nomeEsercizio ? "?name=" + nomeEsercizio : "?";
    str += tipoEsercizio ? "&type=" + tipoEsercizio : "";
    str += muscolo ? "&muscle=" + muscolo : "";
    str += difficolta ? "&difficulty=" + difficolta : "";

    this.eserciziAPI = await this.api.getExercises(str);
  }

  cambiaCheck(esercizio: EsercizioAPI) {
    esercizio.checked=!esercizio.checked;
    this.checkboxChanged();
  }

  compilaScheda() {
    // Ottieni gli esercizi selezionati
    const selectedExercises = this.eserciziAPI.filter(esercizio => esercizio.checked);
    console.log(selectedExercises);
    // Esegui il reindirizzamento alla pagina compila-scheda con gli esercizi selezionati come parametri
    this.router.navigate(['compila-scheda'], { queryParams: { exercises: JSON.stringify(selectedExercises) } });
  }
}
