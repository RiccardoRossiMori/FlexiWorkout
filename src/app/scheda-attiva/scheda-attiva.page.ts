import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, QueryDocumentSnapshot} from "@angular/fire/compat/firestore";
import {Scheda} from "../models/scheda";
import {SchedaDocumenti} from "../models/scheda-documenti";
import {DefaultCard, LimitCard} from "../models/limiti";
import firebase from "firebase/compat";

export interface ProprietaCompilaSchedaPage {
  exercises: any;
  isButtonDisabled: boolean;
  route: any;
  router: any;
  // Aggiungi altre proprietà qui
}

@Component({
  selector: 'app-scheda-attiva',
  templateUrl: './scheda-attiva.page.html',
  styleUrls: ['./scheda-attiva.page.scss'],
})
export class SchedaAttivaPage implements ProprietaCompilaSchedaPage {
  scheda: Scheda = new Scheda();
  d: DefaultCard;
  l: LimitCard;
  esercizioTabata: boolean[] = [];
  private user?: firebase.User;
  private id: string = '';

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFirestore) {
    this.d = new DefaultCard();
    this.l = new LimitCard(this);
  }


  ionViewDidEnter() {
    this.caricaSchedaAttiva();
  }

  convertiScheda(schedaDocumenti: SchedaDocumenti): Scheda {
    // Effettua la conversione degli attributi necessari
    const scheda: Scheda = new Scheda();
    scheda.esercizi = schedaDocumenti.payload.data().esercizi; // Use doc.data() instead of doc
    scheda.schedaAttiva = schedaDocumenti.payload.data().schedaAttiva;
    scheda.userId = schedaDocumenti.payload.data().userId;
    // ...

    return scheda;
  }

  caricaSchedaAttiva() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.user = user;

        this.afDatabase
          .collection<Scheda>('scheda', (ref) =>
            ref.where('userId', '==', userId).where('schedaAttiva', '==', true).limit(1)
          )
          .get()
          .toPromise()
          .then((snapshot) => {
            if (snapshot && !snapshot.empty) {
              const doc: QueryDocumentSnapshot<Scheda> = snapshot.docs[0];
              const schedaAttiva: SchedaDocumenti = {
                payload: doc, // Use doc instead of doc.data()
                id: doc.id
              };
              console.log('Scheda attiva:', schedaAttiva);
              this.id = schedaAttiva.id;
              this.scheda = this.convertiScheda(schedaAttiva); // Apply the conversion
              let taba = this.scheda.esercizi;
              console.log(this.scheda);
              for (let i = 0; i < this.scheda.esercizi.length; i++) {
                this.esercizioTabata[i] = false;
                console.log(this.esercizioTabata[i] + " " + i);
                if (taba[i].tabata) {
                  this.esercizioTabata[i] = true;
                }

              }
            }
          })
          .catch((error) => {
            console.error('Errore durante il recupero della scheda attiva:', error);
          });
      }
    });
  }

  limitValue(target: any, max: number, index: number) {
    this.scheda = this.l.limitValue(target, max, index, this.scheda);
  }

  exercises: any;
  isButtonDisabled: boolean = false;
  route: any;
  router: any;

  aggiornaScheda() {
    const schedule = JSON.stringify(this.scheda);
// Recupera l'utente loggato
    const user = this.user;
    if (!user) {
      console.error('Utente non autenticato');
      return;
    }

    const docRef = this.afDatabase.collection('scheda').doc(this.id);

    docRef.update(JSON.parse(schedule))
      .then(() => {
        console.log('Documento salvato correttamente!');
      })
      .catch((error) => {
        console.error('Errore durante il salvataggio del documento:', error);
      });
  }
}
