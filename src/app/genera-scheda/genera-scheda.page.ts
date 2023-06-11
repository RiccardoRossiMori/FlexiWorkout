import {Component, NgIterable, ViewChild} from '@angular/core';
import {IonSelect, IonTextarea} from '@ionic/angular';
import {ApiService} from "../api.service";

//import {HttpClient} from "@angular/common/http";

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
  eserciziAPI: NgIterable<any>='';

  constructor( private api: ApiService) {
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
}
