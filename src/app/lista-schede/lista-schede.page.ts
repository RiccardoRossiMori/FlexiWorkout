import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Scheda} from '../models/scheda';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/compat/firestore';
import {Router} from "@angular/router";
import {SchedaDocumenti} from "../models/scheda-documenti";

@Component({
  selector: 'app-lista-schede',
  templateUrl: './lista-schede.page.html',
  styleUrls: ['./lista-schede.page.scss'],
})
export class ListaSchedePage implements OnInit {
  schedeAllenamento: Scheda[] = [];
  schedeDocumenti: SchedaDocumenti[] = [];
  schedaSelezionata: Scheda = new Scheda();
  private documentId: string = '';

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private afDatabase: AngularFirestore, private router: Router) {
    this.schedeDocumenti = [];
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.caricaSchedeAllenamento();
  }

  caricaSchedeAllenamento() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.afDatabase
          .collection<Scheda>('scheda', (ref) => ref.where('userId', '==', userId))
          .get()
          .toPromise()
          .then((snapshot) => {
            if (snapshot) {
              this.schedeAllenamento = snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  ...doc.data()
                };
              });

              this.schedeDocumenti = snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  payload: doc
                };
              });
            }
          })
          .catch((error) => {
            console.error('Errore durante il recupero delle schede:', error);
          });
      }
    });
  }

  salvaSchedaAttiva() {
    if (this.schedaSelezionata) {
      console.log('Scheda selezionata:', this.schedaSelezionata);
      // Puoi fare ulteriori operazioni con la scheda selezionata qui
    }
    const documentRef = this.afDatabase.collection('scheda').doc(this.documentId);

    documentRef.update({schedaAttiva: true})
      .then(() => {
        for (let i = 0; i < this.schedeAllenamento.length; i++) {
          if (this.schedeAllenamento[i].schedaAttiva) {
            this.afDatabase.collection('scheda').doc(this.schedeDocumenti[i].id).update({schedaAttiva: false});
            break;
          }
        }
        console.log('Stato scheda attiva aggiornato con successo');
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiornamento dello stato scheda attiva:', error);
      });
    this.router.navigate(['scheda-attiva']); //cambiare l'impostazione e passare direttamente la scheda attiva?
  }

  selezionaScheda(scheda: Scheda, i: number) {
    this.documentId = this.schedeDocumenti[i].id;
    console.log(i);
    console.log(this.documentId);
    this.schedaSelezionata = scheda;
  }

}


