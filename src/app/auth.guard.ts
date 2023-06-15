import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isCheckAuthenticationStatusCompleted = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isCheckAuthenticationStatusCompleted) {
      return this.isAuthenticated$.pipe(
        take(1),
        map(isAuthenticated => {
          if (isAuthenticated) {
            console.log("L'utente è autenticato");
            return true;
          } else {
            console.log("L'utente non è autenticato, reindirizzamento alla pagina di login");
            return this.router.parseUrl('/login');
          }
        })
      );
    } else {
      return this.checkAuthenticationStatus().pipe(
        tap(isAuthenticated => {
          this.isCheckAuthenticationStatusCompleted = true;
          if (!isAuthenticated) {
            console.log("L'utente non è autenticato, reindirizzamento alla pagina di login");
            this.router.navigateByUrl('/login');
          }
        }),
        map(() => true)
      );
    }
  }

  private checkAuthenticationStatus(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        this.isAuthenticated$.next(isAuthenticated);
        if (isAuthenticated) {
          console.log("L'utente è autenticato");
        }
      })
    );
  }
}
