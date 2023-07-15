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
        loadChildren: () => import('./compila-scheda/compila-scheda.module').then( m => m.CompilaSchedaPageModule),
        data: { exercises: null } // Inizializza il parametro exercises con il valore desiderato o lascialo null per ora
      },
      {
        path: 'scheda-attiva',
        loadChildren: () => import('./scheda-attiva/scheda-attiva.module').then( m => m.SchedaAttivaPageModule)
      },
      {
        path: 'lista-schede',
        loadChildren: () => import('./lista-schede/lista-schede.module').then( m => m.ListaSchedePageModule)
      },
      {
        path: 'genera-esercizio',
        loadChildren: () => import('./genera-esercizio/genera-esercizio.module').then( m => m.GeneraEsercizioPageModule)
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
