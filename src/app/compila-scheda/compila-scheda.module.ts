import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CompilaSchedaPage, TabataDescriptionPopoverComponent} from './compila-scheda.page';

import {IonicModule} from '@ionic/angular';

import {CompilaSchedaPageRoutingModule} from './compila-scheda-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompilaSchedaPageRoutingModule
  ],
  declarations: [CompilaSchedaPage, TabataDescriptionPopoverComponent],
})
export class CompilaSchedaPageModule {
}
