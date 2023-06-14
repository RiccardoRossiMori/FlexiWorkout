import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {UserService} from "./pages/signin/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: firebase.User | null = null;

  constructor(private router: Router, private userService: UserService) {
    // this.router.navigate(['/login']); // Reindirizzamento automatico alla pagina di login
  }

  ngOnInit() {
    this.initApp();
  }

  initApp() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.user = user;
      } else {
        // User is signed out.
        this.user = null;
      }
    }, (error) => {
      console.log(error);
    });
  }

  signIn() {
    // Aggiungi qui la logica per l'accesso utilizzando Firebase Authentication
    // Esempio:
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // L'accesso è avvenuto con successo
        this.user = result.user;
        if (this.user!=null && "displayName" in this.user && this.user.displayName!=null) {
          this.userService.setUsername(this.user.displayName);
        }
      })
      .catch((error) => {
        // Si è verificato un errore durante l'accesso
        console.log(error);
      });
  }

  signOut() {
    // Aggiungi qui la logica per il logout utilizzando Firebase Authentication
    firebase.auth().signOut()
      .then(() => {
        // Il logout è avvenuto con successo
        this.user = null;
      })
      .catch((error) => {
        // Si è verificato un errore durante il logout
        console.log(error);
      });
  }
}
