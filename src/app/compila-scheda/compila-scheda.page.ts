import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {EsercizioAPI} from '../models/esercizio-api';
import {Esercizio} from '../models/esercizio';
import {Scheda} from '../models/scheda';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-compila-scheda',
  templateUrl: './compila-scheda.page.html',
  styleUrls: ['./compila-scheda.page.scss'],
})
export class CompilaSchedaPage implements OnInit {
  exercises: any;
  l: LimitCard;
  d: DefaultCard;
  isButtonDisabled: boolean = false;
  scheda: Scheda = new Scheda(); // Inizializza la scheda vuota
  esercizioTabata: boolean[] = [];
  private user: firebase.User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popoverController: PopoverController,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.d = new DefaultCard();
    this.l = new LimitCard();
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    console.log(this.route.snapshot.data['exercises']);
    this.route.queryParams.subscribe((params) => {
      this.exercises = JSON.parse(params['exercises']);
      this.exercises.forEach((exercise: EsercizioAPI) => {
        const esercizio = new Esercizio(exercise, 4, 12, 0, 0, false, 0);
        this.scheda.esercizi.push(esercizio); // Aggiunge l'esercizio alla scheda
      });
    });
  }

  limitValue(target: any, max: number, index: number) {
    const value = parseInt(target.value, 10);
    if (value > max) {
      target.value = max.toString();
    }
    if (target.id === 'Serie') this.scheda.esercizi[index].serie = value;
    else if (target.id === 'Ripetizioni')
      this.scheda.esercizi[index].ripetizioni = value;
    this.isButtonDisabled =
      this.scheda.esercizi.some(
        (esercizio: Esercizio) => esercizio.serie <= 0 || isNaN(esercizio.serie)
      ) ||
      this.scheda.esercizi.some(
        (esercizio: Esercizio) =>
          esercizio.ripetizioni <= 0 || isNaN(esercizio.ripetizioni)
      );
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

  saveSchedule() {
    this.afStore.collection('').add(this.scheda).then(() => {
      this.router.navigate(['/home']);
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
export class TabataDescriptionPopoverComponent {}

export class LimitCard {
  maxTempo: number = 600;
  maxSerie: number = 50;
  maxRep: number = 300;
}

export class DefaultCard {
  defaultSerie: number = 4;
  defaultRep: number = 12;
}