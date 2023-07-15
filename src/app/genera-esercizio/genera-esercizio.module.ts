import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraEsercizioPageRoutingModule } from './genera-esercizio-routing.module';

import { GeneraEsercizioPage } from './genera-esercizio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraEsercizioPageRoutingModule
  ],
  declarations: [GeneraEsercizioPage]
})
export class GeneraEsercizioPageModule {}
