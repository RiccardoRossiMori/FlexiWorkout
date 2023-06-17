import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CompilaSchedaPage, TabataDescriptionPopoverComponent} from './compila-scheda.page';

import {IonicModule} from '@ionic/angular';

import {CompilaSchedaPageRoutingModule} from './compila-scheda-routing.module';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    CompilaSchedaPageRoutingModule
  ],
  declarations: [CompilaSchedaPage, TabataDescriptionPopoverComponent],
})
export class CompilaSchedaPageModule {
}
