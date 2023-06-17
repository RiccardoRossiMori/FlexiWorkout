import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedaAttivaPage } from './scheda-attiva.page';

const routes: Routes = [
  {
    path: '',
    component: SchedaAttivaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedaAttivaPageRoutingModule {}
