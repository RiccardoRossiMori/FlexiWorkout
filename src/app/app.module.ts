import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import {SignupPageModule} from "./signup/signup.module";
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {environment} from "../environments/environment";
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, SignupPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
