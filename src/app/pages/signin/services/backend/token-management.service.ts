import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class TokenManagementService {


  constructor(private afAuth: AngularFireAuth) {}

  async generateCustomToken(uid: string): Promise<string> {
    try {
      const customToken = await this.afAuth.createCustomToken(uid);
      return customToken;
    } catch (error) {
      console.error('Errore nella generazione del token personalizzato:', error);
      throw error;
    }
  }

  // Resto del codice del servizio
}


