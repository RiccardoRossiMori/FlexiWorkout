import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    private auth: AngularFireAuth
  ) { }

  login(params: SignIn): Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  signup(params: SignIn): Observable<any>{
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    ));
  }

}
type SignIn = {
  email: string;
  password: string;
}
