import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListaSchedePageRoutingModule } from './lista-schede-routing.module';
import { ListaSchedePage } from './lista-schede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaSchedePageRoutingModule
  ],
  declarations: [ListaSchedePage]
})
export class ListaSchedePageModule {}
