import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, from, map, Observable, switchMap, tap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {LocalStorage} from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();
  private username: string = '';
  private token: string = '';

  constructor(private auth: AngularFireAuth, private localStorage: LocalStorage) {
    console.log("controllo isLoggedIn in apertura");
    this.checkLoginStatus();
  }

  login(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password)).pipe(
      switchMap((userCredential) => {
        // Ottieni il token di accesso
        if (userCredential.user != null && "getIdToken" in userCredential.user) {
          const token = userCredential.user.getIdToken();
          // Memorizza il token e username nel localStorage
          if (userCredential.user != null && "email" in userCredential.user  && typeof userCredential.user.email === "string") {
            localStorage.setItem('username', userCredential.user.email);
          }
          return this.localStorage.setItem('token', token).pipe(
            tap(() => {
              this.isLoggedSubject.next(true);
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
  }

  signup(params: SignIn): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password)).pipe(
      switchMap((userCredential) => {
        // Ottieni il token di accesso
        if (userCredential.user != null && "getIdToken" in userCredential.user) {
          const token = userCredential.user.getIdToken();
          // Memorizza il token e username nel localStorage
          if (userCredential.user != null && "email" in userCredential.user && typeof userCredential.user.email === "string") {
            localStorage.setItem('username', userCredential.user.email);
          }
          this.isLoggedSubject.next(true);
          return this.localStorage.setItem('token', token);
        } else {
          return EMPTY;
        }
      })
    );
  }

  logout(): Observable<any> {
    return from(this.auth.signOut().then(() => {
      // Rimuovi il token dal localStorage
      this.localStorage.clear();
      this.localStorage.removeItem('token');
      this.localStorage.removeItem('email');
      this.localStorage.removeItem('username');
      localStorage.clear();
      this.isLoggedSubject.next(false);
    }));
  }

  private async checkLoginStatus(): Promise<void> {
    // Controlla se il token è presente nel localStorage
    const token = await this.localStorage.getItem('token').toPromise();
    const isLoggedIn = !!this.token; // Verifica se il token esiste
    if (isLoggedIn) this.isLoggedSubject.next(await this.verifyToken(this.token));
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const user = await this.auth.signInWithCustomToken(token);
      const tokenResult = await user.user?.getIdTokenResult();

      // Verifica la validità del token
      return !!(tokenResult && parseInt((await tokenResult).expirationTime) > Date.now() / 1000);
    } catch (error) {
      // Si è verificato un errore durante la verifica del token
      console.error('Errore nella verifica del token:', error);
      return false;
    }
  }

  isLoggedIn(): Observable<boolean> {
    console.log("controllo isLoggedIn");
    this.checkLoginStatus();
    return this.isLogged$;
  }

  getUsername(): string {
    let x = localStorage.getItem('username');
    return x ? x : '';
  }
}

type SignIn = {
  email: string;
  password: string;
}
