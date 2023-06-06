import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraSchedaPageRoutingModule } from './genera-scheda-routing.module';

import { GeneraSchedaPage } from './genera-scheda.page';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraSchedaPageRoutingModule
  ],
  declarations: [GeneraSchedaPage]
})
export class GeneraSchedaPageModule {}
