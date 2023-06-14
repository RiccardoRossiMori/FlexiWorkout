import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  signup() {
    if (this.passwordMatchValidator(this.form)) {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());

      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
            // L'utente ha effettuato la registrazione con successo
            // Puoi eseguire le operazioni necessarie qui
            this.router.navigate(['home']);
            return false; // Blocca il reindirizzamento automatico
          },
          uiShown: () => {
            // FirebaseUI è stato visualizzato
            // Puoi eseguire le operazioni necessarie qui
          }
        },
        signInOptions: [
          // Aggiungi qui le opzioni di registrazione desiderate
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Altre opzioni di configurazione di FirebaseUI per la registrazione
      };

      ui.start('#firebaseui-auth-container', uiConfig);
    } else {
      this.snackBar.open('Immettere la stessa password due volte!', 'OK', { duration: 5000 });
    }
  }
}
