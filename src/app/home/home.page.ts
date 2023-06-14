import {Component} from '@angular/core';
import {UserService} from "../pages/signin/services/user.service";
//import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {Router} from "@angular/router";
import {delay} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string='';
  //private auth1 = firebase.auth();


  constructor(private userService: UserService, private router: Router) {

  }

  //TODO: capire come generare diverse pagine sullo stesso url a seconda di alcune condizioni
  /*TODO: pagine da generare:
           1.- primo inserimento di una scheda di allenamento;
           2.- pagina di selezione di una scheda da attivare;
           3.- pagina della scheda attiva. */
  /*TODO: l'ordine della home va in base a ciò che ho attivo: 1 se non ho schede,
     2 se non ne ho una attiva, 3 se ne ho una attiva.
     (per il controllo forse é meglio il 3-2-1 oppure un flag di nuovo utente, idky). */

  ngOnInit(): void {
    //const currentUser = this.auth1.currentUser;

    // Recupera lo username dal servizio di autenticazione
    this.userService.getUsername().subscribe(username => {
      this.username = username;
    });

  }

  async logout() {
    // this.auth.logout();
    await delay(1000);
    await this.router.navigate(['login']);
  }
}
