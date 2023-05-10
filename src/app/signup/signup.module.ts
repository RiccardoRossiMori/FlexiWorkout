import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth'
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class SignupPage implements OnInit {
  // Export class LoginPage
  username: string = '';    // Defining variable username
  password: string = '';    // Defining variable password

  constructor(public navCtrl: NavController) {
  }  // constructor for class LoginPage

  async signup() {    // Defining login() method
    try {
      const res = await createUserWithEmailAndPassword(environment.firebaseAuth,this.username + '@gmail.com', this.password+'');    // try to login with given credentials
      if (res) {    // if login successful
        this.navCtrl.navigateRoot('../folder/folder.module');    // set the HomePage as root
      }
    } catch (err) {    // catch error
      console.dir(err);    // print error
      if ((err as { code: string }).code === 'auth/user-not-found') {    // check if user not found error
        console.log("User not found");    // print message on console
      }
    }
  }
  //TODO inserire il form per il log in
  //TODO collegare il tutto con firebase e verificare che funzioni tutto
  //TODO iniziare l'implementazione dell'app

  ngOnInit() {
  }

}
