import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {EsercizioAPI} from '../models/esercizio-api';
import {Esercizio} from '../models/esercizio';
import {Scheda} from '../models/scheda';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import {DefaultCard, LimitCard} from "../models/limiti";
import {ProprietaCompilaSchedaPage} from "../scheda-attiva/scheda-attiva.page";

@Component({
  selector: 'app-compila-scheda',
  templateUrl: './compila-scheda.page.html',
  styleUrls: ['./compila-scheda.page.scss'],
})
export class CompilaSchedaPage implements OnInit, ProprietaCompilaSchedaPage {
  exercises: any;
  l: LimitCard;
  d: DefaultCard;
  isButtonDisabled: boolean = false;
  scheda: Scheda = new Scheda(); // Inizializza la scheda vuota
  esercizioTabata: boolean[] = [];
  private user?: firebase.User;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.d = new DefaultCard();
    this.l = new LimitCard(this);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.scheda.userId = this.user.uid;
      }
    });
    console.log(this.route.snapshot.data['exercises'] + 'route.snapshot.data');
    this.route.queryParams.subscribe((params) => {
      this.exercises = JSON.parse(params['exercises']);
      this.exercises.forEach((exercise: EsercizioAPI) => {
        const esercizio = new Esercizio(exercise, 4, 12, 0, 0, false, 0);
        this.scheda.esercizi.push(esercizio); // Aggiunge l'esercizio alla scheda
      });
    });
    for (let i = 0; i < this.scheda.esercizi.length; i++) {
      this.esercizioTabata[i] = false;
    }
  }

  limitValue(target: any, max: number, index: number) {
    this.scheda = this.l.limitValue(target, max, index, this.scheda);
  }

  async showTabataDescription(event: MouseEvent) {
    const popover = await this.popoverController.create({
      component: TabataDescriptionPopoverComponent,
      event: event,
      translucent: true,
      showBackdrop: false,
    });

    return await popover.present();
  }

  selected(i: number) {
    this.esercizioTabata[i] = !this.esercizioTabata[i];
  }

  salvaScheda() {
    for (let i = 0; i < this.scheda.esercizi.length; i++)
      if (this.esercizioTabata[i])
        this.scheda.esercizi[i].tabata = true;

    const schedule = JSON.stringify(this.scheda);
// Recupera l'utente loggato
    const user = this.user;
    if (!user) {
      console.error('Utente non autenticato');
      return;
    }

    // Ottieni l'email dell'utente loggato
    const userEmail = user.email;

    // Crea una stringa con la data e l'ora corrente
    const currentDateTime = new Date().toLocaleString();

    // Rimuovi eventuali caratteri non validi nel nome del documento
    const sanitizedDateTime = currentDateTime.replace(/[^\w\s]/gi, '');

    // Crea il nome del documento utilizzando l'email e la data/ora corrente
    const documentName = `${userEmail}_${sanitizedDateTime}`;

    // Crea un riferimento al documento utilizzando l'email e la data/ora corrente
    const docRef = this.afStore.collection('scheda').doc(documentName);

    docRef.set(JSON.parse(schedule))
      .then(() => {
        console.log('Documento salvato correttamente!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Errore durante il salvataggio del documento:', error);
      });
  }
}

@Component({
  template: `
    <ion-popover trigger="Tabata" triggerAction="hover">
      <ng-template>
        <ion-content class="ion-padding">
          Tabata è un tipo di allenamento ad alta intensità che prevede brevi periodi di esercizio intenso seguiti da
          brevi periodi di riposo. Solitamente, un intervallo di Tabata consiste in 20 secondi di esercizio ad alta
          intensità seguiti da 10 secondi di riposo, per un totale di 8 cicli. Questo tipo di allenamento è efficace per
          migliorare la resistenza cardiovascolare e bruciare calorie.
        </ion-content>
      </ng-template>
    </ion-popover>
  `,
})
export class TabataDescriptionPopoverComponent {
}
