import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'genera-scheda',
        loadChildren: () => import('./genera-scheda/genera-scheda.module').then(m => m.GeneraSchedaPageModule),
      },
      {
        path: 'compila-scheda',
        loadChildren: () => import('./compila-scheda/compila-scheda.module').then( m => m.CompilaSchedaPageModule)
      }
      //TODO: Aggiungi altre route per le diverse sezioni o pagine dell'applicazione
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
