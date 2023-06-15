import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  setUsername(displayName: string) {
    this.usernameSubject.next(displayName);
  }
}
