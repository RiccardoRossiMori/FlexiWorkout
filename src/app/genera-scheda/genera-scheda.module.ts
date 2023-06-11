import {NgModule} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GeneraSchedaPageRoutingModule} from './genera-scheda-routing.module';

import {GeneraSchedaPage} from './genera-scheda.page';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "../api-interceptor.service";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraSchedaPageRoutingModule,
  ],
  declarations: [GeneraSchedaPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class GeneraSchedaPageModule {
}
