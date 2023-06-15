import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompilaSchedaPage } from './compila-scheda.page';

const routes: Routes = [
  {
    path: '',
    component: CompilaSchedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompilaSchedaPageRoutingModule {}
