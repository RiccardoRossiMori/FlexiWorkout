import {Component} from '@angular/core';    // import component from angular core
import {IonicPage} from "ionic";
import {  NavController, NavParams} from '@ionic/angular';    // import IonicPage, Navcontroller, Navparams from ionic-angular
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth'  // import AngularFireAuth from angularfire2/auth
import firebase from "firebase/compat";    // import AngularFireDatabase from angularfire2/database
//import {User} from '../../models/user';    // import User from models/user
//import {HomePage} from '../home/home';    // import HomePage from home/home
import {AlertController} from '@ionic/angular';    // import AlertController from ionic-angular
import {FormBuilder, FormGroup, Validators} from '@angular/forms';    // import formbuilder, formgroup, validators from angular forms
import {LoadingController} from '@ionic/angular';    // import loadingcontroller from ionic-angular
import {ToastController} from '@ionic/angular';
import firestore = firebase.firestore;
import {environment} from "../../environments/environment";
import User = firebase.User;

@IonicPage()    // Ionic Page
@Component({    // component
  selector: 'page-register',    // selector
  templateUrl: 'register.html',    // templateUrl
})
export class RegisterPage {    // export class RegisterPage
  private afAuth= environment.firebaseAuth;
  private afDatabase= environment.firebaseDB;
  user = {} as User;    // initialize user variable
  myForm: FormGroup;    // initialize myForm variable
  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
              private alertCtrl: AlertController, afAuth,afDatabase ,
              public navCtrl: NavController, public navParams: NavParams) {    // constructor
    this.myForm = this.formBuilder.group({    // initialize this.myForm with formbuilder
      email: ['', Validators.required],    // set email as required
      password: ['', Validators.required],    // set password as required
      name: ['', Validators.required],    // set name as required
      phone: [''],    // set phone as required
      address: [''],    // set address as required
      city: [''],    // set city as required
      state: [''],    // set state as required
      zip: [''],    // set zip as required
    });
  }

  ionViewDidLoad() {    // ionViewDidLoad
    console.log('ionViewDidLoad RegisterPage');    // print message on console
  }

  async register(user: User) {    // async function register
    try {    // try block         // TODO risolvi errori e crea interfaccia grafica per login e signup
      const result = await firebase.auth.EmailAuthProvider.credential(user.email,user.password) //this.afAuth.createUserWithEmailAndPassword(user.email, user.password);    // create user with email and password
      if (result) {    // check if user created or not
        this.afAuth.authState.take(1).subscribe(auth => {    // check auth state of user
          this.afDatabase.object(`user/${auth.uid}`).set(this.user)
            .then(() => this.navCtrl.setRoot(HomePage));    // set user data in firebase
        })
      }
    } catch (e) {    // catch block
      console.error(e);    // print error on console
      let alert = this.alertCtrl.create({    // create alert
        title: 'Error',    // title of alert
        subTitle: e,    // subtitle of alert
        buttons: ['OK']    // button of alert
      });
      alert.present();    // present alert
    }
  }
}
