import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoginPageRoutingModule} from './login-routing.module';
import {LoginPage} from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})


export class LoginPageModule {}

/*
*
import { AngularFireAuth } from 'angularfire2/auth';    // Import AngularFireAuth component
import { HomePage } from '../home/home';    // Import HomePage component


export class LoginPage {
}

* */
