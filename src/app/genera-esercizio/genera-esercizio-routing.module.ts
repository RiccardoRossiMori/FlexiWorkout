import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraEsercizioPage } from './genera-esercizio.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraEsercizioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraEsercizioPageRoutingModule {}
