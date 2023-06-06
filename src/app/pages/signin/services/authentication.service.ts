import { Injectable } from '@angular/core';
import { from, map, Observable, BehaviorSubject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  constructor(private auth: AngularFireAuth) {
  }

  login(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password)).pipe(
      map(() => {
        this.isLoggedSubject.next(true);
      })
    );
  }

  signup(params: SignIn): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password));
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogged$.pipe(
      map(isLogged => {
        if (!isLogged) {
          throw new Error('Access denied!');
        }
        return isLogged;
      })
    );
  }
}

type SignIn = {
  email: string;
  password: string;
}
