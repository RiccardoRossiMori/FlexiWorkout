import {Component, NgIterable, ViewChild} from '@angular/core';
import {IonSelect, IonTextarea} from '@ionic/angular';
import {ApiService} from "../api.service";
import {EsercizioAPI} from "../models/esercizio-api";

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


  constructor( private api: ApiService) {
  }

  checkboxChanged() {
    console.log("check chiamato e checked é "+ this.isChecked);
    this.isChecked = this.eserciziAPI.some(esercizio => {
      console.log("esercizio checkato? isChecked= "+esercizio.checked);
      return esercizio.checked;
    });
    console.log("dopo check, il valore é "+this.isChecked);
  }

  getAndPushApi() {
    const nomeEsercizio = this.nomeEsercizioTextarea.value;
    const tipoEsercizio = this.tipoEsercizioSelect.value;
    const muscolo = this.muscoloSelect.value;
    const difficolta = this.difficoltaSelect.value;
    let str: string = nomeEsercizio ? "?name=" + nomeEsercizio : "?";
    str += tipoEsercizio ? "&type=" + tipoEsercizio : "";
    str += muscolo ? "&muscle=" + muscolo : "";
    str += difficolta ? "&difficulty=" + difficolta : "";

    console.log(str);
    this.eserciziAPI = this.api.getExercises(str);
    console.log(this.eserciziAPI);
  }

  cambiaCheck(esercizio: EsercizioAPI) {
    esercizio.checked=!esercizio.checked;
    this.checkboxChanged();
  }
}
