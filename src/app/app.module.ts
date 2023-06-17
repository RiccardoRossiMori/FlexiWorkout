import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';


import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from '../environments/environment';
import {UserService} from "./pages/signin/services/user.service";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSnackBarModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule],
  providers: [
    UserService,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    },
    // {
    //   provide: API_HTTP_CLIENT,
    //   useFactory: (http: HttpClient) => {
    //     return new ApiInterceptor(http);
    //   },
    //  deps: [HttpClient]
    // // },
    //  {
    //    provide: HTTP_INTERCEPTORS,
    //    useClass: ApiInterceptor,
    //    multi: true
    //  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
