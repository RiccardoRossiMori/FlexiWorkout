import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraSchedaPage } from './genera-scheda.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraSchedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraSchedaPageRoutingModule {}
