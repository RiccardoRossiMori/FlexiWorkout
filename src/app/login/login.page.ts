import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit, OnDestroy {
  @ViewChild('firebaseuiAuthContainer', { static: false }) firebaseuiAuthContainer!: ElementRef;

  form: FormGroup;
  uiConfig: firebaseui.auth.Config;
  ui: firebaseui.auth.AuthUI | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.uiConfig = {
      signInSuccessUrl: 'home',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
          // L'utente ha effettuato l'accesso con successo
          // Puoi eseguire le operazioni necessarie qui
          return true; // Blocca il reindirizzamento automatico
        },
        uiShown: () => {
          // FirebaseUI è stato visualizzato
          // Puoi eseguire le operazioni necessarie qui
        }
      }
    };
  }

  ngAfterViewInit() {
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start(this.firebaseuiAuthContainer.nativeElement, this.uiConfig);
    }
  }

  ngOnDestroy() {
    if (this.ui) {
      this.ui.delete();
      this.ui = null;
    }
  }

  login() {
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }
  }
}
