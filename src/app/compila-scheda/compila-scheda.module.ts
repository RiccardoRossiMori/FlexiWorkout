import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompilaSchedaPageRoutingModule } from './compila-scheda-routing.module';

import { CompilaSchedaPage } from './compila-scheda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompilaSchedaPageRoutingModule
  ],
  declarations: [CompilaSchedaPage]
})
export class CompilaSchedaPageModule {}
