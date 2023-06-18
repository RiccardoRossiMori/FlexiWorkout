import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Scheda} from '../models/scheda';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/compat/firestore';

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

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private afDatabase: AngularFirestore) {
    this.schedeDocumenti = [];
  }

  ngOnInit() {
    this.caricaSchedeAllenamento();
  }

  caricaSchedeAllenamento() {
    this.afDatabase.collection<Scheda>('scheda').get().toPromise().then((snapshot) => {
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
  }

  selezionaScheda(scheda: Scheda, i: number) {
    this.documentId = this.schedeDocumenti[i].id;
    console.log(i);
    console.log(this.documentId);
    this.schedaSelezionata = scheda;
  }

}

interface SchedaDocumenti {
  id: string;
  payload: QueryDocumentSnapshot<Scheda>;
}
