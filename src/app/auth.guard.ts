import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthenticationService} from "./pages/signin/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        console.log("la guardia ti osserva");
        if (isLoggedIn) {
          console.log("loggato dentro guardia");
          return true;
        }
        console.log("stronzo, non sei loggato! ti ho visto!");
        // Reindirizza l'utente alla pagina di login se non è autenticato
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
