import {Component, OnInit, ViewChild} from '@angular/core';
import {EsercizioAPI} from "../models/esercizio-api";
import {IonSelect, IonTextarea} from "@ionic/angular";
import firebase from "firebase/compat";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-genera-esercizio',
  templateUrl: './genera-esercizio.page.html',
  styleUrls: ['./genera-esercizio.page.scss'],
})
export class GeneraEsercizioPage implements OnInit {
  @ViewChild('nomeEsercizioTextarea', {static: false}) nomeEsercizioTextarea!: IonTextarea;
  @ViewChild('tipoEsercizioSelect', {static: false}) tipoEsercizioSelect!: IonSelect;
  @ViewChild('muscoloSelect', {static: false}) muscoloSelect!: IonSelect;
  @ViewChild('difficoltaSelect', {static: false}) difficoltaSelect!: IonSelect;
  @ViewChild('descrizioneEsercizio', {static: false}) descrizioneEsercizio!: IonTextarea;
  @ViewChild('attrezzaturaEsercizio', {static: false}) attrezzaturaEsercizio!: IonSelect;
  enableSend: boolean = false;
  isChecked: boolean[] =[];
  eserciziG: EsercizioAPI[] = [];
  index:number=0;
  count: number = 0;
  countCheck: number = 0;
  isComplete: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit() {

  }

  create() {
    const nomeEsercizio = this.nomeEsercizioTextarea.value;
    const tipoEsercizio = this.tipoEsercizioSelect.value;
    const muscolo = this.muscoloSelect.value;
    const difficolta = this.difficoltaSelect.value;
    const descrizione = this.descrizioneEsercizio.value;
    const attrezzatura = this.attrezzaturaEsercizio.value;

    if (descrizione != null && nomeEsercizio != null) {
      this.eserciziG[this.count] = new EsercizioAPI(difficolta, descrizione, muscolo, nomeEsercizio, tipoEsercizio, attrezzatura);
      this.count++;
      this.countCheck++;
      this.index++;
    }

    // Resettare i valori dei campi
    this.nomeEsercizioTextarea.value = '';
    this.tipoEsercizioSelect.value = '';
    this.muscoloSelect.value = '';
    this.difficoltaSelect.value = '';
    this.descrizioneEsercizio.value = '';
    this.attrezzaturaEsercizio.value = '';

  }

  takeAndPush() {
    const eserciziFiltrati: EsercizioAPI[] = [];
    for (let i = 0; i < this.countCheck; i++) {
      if (this.isChecked[i]) {
        eserciziFiltrati.push(this.eserciziG[i]);
      }
    }

    this.api.pushExercises(eserciziFiltrati);  }


  cambiaCheck(index:number) {
    this.isChecked[index]=!this.isChecked[index];
    console.log("sono dentro ed il valore valutato é: " + this.isChecked.indexOf(true)!=null);
    this.enableSend = this.isChecked.indexOf(true)!=-1;
  }

  esercizioCompleto() {
    const nomeEsercizio = this.nomeEsercizioTextarea.value;
    const tipoEsercizio = this.tipoEsercizioSelect.value;
    const muscolo = this.muscoloSelect.value;
    const difficolta = this.difficoltaSelect.value;
    const descrizione = this.descrizioneEsercizio.value;
    const attrezzatura = this.attrezzaturaEsercizio.value;

    this.isComplete = nomeEsercizio !== '' && tipoEsercizio !== undefined && tipoEsercizio !== '' && muscolo !== undefined && muscolo !== '' && difficolta !== undefined && difficolta !== '' && descrizione !== '' && attrezzatura!==undefined && attrezzatura!=='';
  }

}
