import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit{
  @ViewChild('firebaseuiAuthContainer', { static: false }) firebaseuiAuthContainer!: ElementRef;

  form: FormGroup;

  constructor(private afAuth: AngularFireAuth) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: '/home',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
          // L'utente ha effettuato l'accesso con successo
          // Puoi eseguire le operazioni necessarie qui
          return false; // Blocca il reindirizzamento automatico
        },
        uiShown: () => {
          // FirebaseUI è stato visualizzato
          // Puoi eseguire le operazioni necessarie qui
        }
      }
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(this.firebaseuiAuthContainer.nativeElement, uiConfig);
  }




  login() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
          // L'utente ha effettuato l'accesso con successo
          // Puoi eseguire le operazioni necessarie qui
          return false; // Blocca il reindirizzamento automatico
        },
        uiShown: () => {
          // FirebaseUI è stato visualizzato
          // Puoi eseguire le operazioni necessarie qui
        }
      },
      // Altre opzioni di configurazione di FirebaseUI
    };

    ui.start('#firebaseui-auth-container', uiConfig);
  }

}
