import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaSchedePage } from './lista-schede.page';

const routes: Routes = [
  {
    path: '',
    component: ListaSchedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaSchedePageRoutingModule {}
