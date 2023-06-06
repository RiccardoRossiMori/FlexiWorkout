import { Component, ViewChild } from '@angular/core';
import { IonSelect, IonTextarea } from '@ionic/angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-genera-scheda',
  templateUrl: 'genera-scheda.page.html',
  styleUrls: ['genera-scheda.page.scss'],
})
export class GeneraSchedaPage {
  @ViewChild('nomeEsercizioTextarea', { static: false }) nomeEsercizioTextarea!: IonTextarea;
  @ViewChild('tipoEsercizioSelect', { static: false }) tipoEsercizioSelect!: IonSelect;
  @ViewChild('muscoloSelect', { static: false }) muscoloSelect!: IonSelect;
  @ViewChild('difficoltaSelect', { static: false }) difficoltaSelect!: IonSelect;

  constructor(private http: HttpClient) {
  }

  getFormValues() {
    const nomeEsercizio = this.nomeEsercizioTextarea.value;
    const tipoEsercizio = this.tipoEsercizioSelect.value;
    const muscolo = this.muscoloSelect.value;
    const difficolta = this.difficoltaSelect.value;
    const apiKey = 'A0F5n9W16NwqpjnpV33SPA==y33iR3fpHu1TgPWm';
    const headers = new HttpHeaders().set('X-Api-Key', apiKey);
    let str: string = nomeEsercizio?"name="+nomeEsercizio:"";
    // console.log(str);
    str+=tipoEsercizio?"&type="+tipoEsercizio:"";
    // console.log(str);
    str+=muscolo?"&muscle="+muscolo:"";
    // console.log(str);
    str+=difficolta?"&difficulty="+difficolta:"";
    // console.log(str);
    // console.log('Nome Esercizio:', nomeEsercizio);
    // console.log('Tipo Esercizio:', tipoEsercizio);
    // console.log('Muscolo:', muscolo);
    // console.log('Difficoltà:', difficolta);
    // console.log(str);
    this.http.get('https://api-ninjas.com/api/exercises'+str, {headers}).subscribe(
      (response) => {
        // Gestisci la risposta dell'API qui
        //TODO: controllare impostazioni CORS e cercare di effettuare una chiamata API corretta.
        console.log(response);
      },
      (error) => {
        // Gestisci l'errore qui
        console.error(error);
      }
    );

  }
}
