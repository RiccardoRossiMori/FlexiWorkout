import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedaAttivaPageRoutingModule } from './scheda-attiva-routing.module';

import { SchedaAttivaPage } from './scheda-attiva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedaAttivaPageRoutingModule
  ],
  declarations: [SchedaAttivaPage]
})
export class SchedaAttivaPageModule {}
