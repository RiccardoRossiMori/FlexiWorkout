import {Component} from '@angular/core';    // import component from angular core
import {NavController, NavParams} from '@ionic/angular';    // import IonicPage, Navcontroller, Navparams from ionic-angular
import {AlertController} from '@ionic/angular';    // import AlertController from ionic-angular
import {FormBuilder, FormGroup, Validators} from '@angular/forms';    // import formbuilder, formgroup, validators from angular forms
import {LoadingController} from '@ionic/angular';    // import loadingcontroller from ionic-angular
import {ToastController} from '@ionic/angular';
import {EmailAuthProvider, createUserWithEmailAndPassword, UserCredential} from 'firebase/auth';
import {FirebaseError} from 'firebase/app';
import {firebaseAuth} from "../../environments/environment";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

@Component({    // component
  selector: 'page-register',    // selector
  templateUrl: './signup.page.html',    // templateUrl
})

export class SignupPage {    // export class RegisterPage
  myForm: FormGroup;    // initialize myForm variable
  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
              private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {    // constructor
    this.myForm = this.formBuilder.group({    // initialize this.myForm with formbuilder
      email: ['', Validators.required, Validators.email],    // set email as required
      password: ['', Validators.required],    // set password as required
      name: ['', Validators.required],    // set name as required
    });
  }

  ionViewDidLoad() {    // ionViewDidLoad
    console.log('ionViewDidLoad RegisterPage');    // print message on console
  }

  async register(myForm: FormGroup) {    // async function register
    try {    // try block         // TODO risolvi errori e crea interfaccia grafica per login e signup
      const result = await EmailAuthProvider.credential(myForm.get('email')?.value, myForm.get('password')?.value); // create user with email and password
      if (result) {    // check if user created or not
        createUserWithEmailAndPassword(firebaseAuth, myForm.get('email')?.value, myForm.get('password')?.value)
          .then((userCredential: UserCredential) => {   // registrazione avvenuta con successo, si accede all'utente registrato
            const user = userCredential.user;   // si memorizzano i dati dell'utente nel database
            if (user != null && "uid" in user) {
              const database = firebase.database();
              const databaseRef = database.ref(`user/${user.uid}`);
              databaseRef.set(myForm)
                .then(() => {   // si è memorizzato con successo i dati dell'utente nel database, si naviga alla pagina principale
                  this.navCtrl.navigateRoot('../folder/folder.module');
                }).catch((error: FirebaseError) => {    // gestione degli errori
              });
            }
          })
          .catch((error: FirebaseError) => {    // gestione degli errori
          });
      }
    } catch (e) {    // catch block
      console.error(e);    // print error on console
      let alert = this.alertCtrl.create({    // create alert
        buttons: ['OK']    // button of alert
      });
      (await alert).present;    // present alert
    }
  }
}
