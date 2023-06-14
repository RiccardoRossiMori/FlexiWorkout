import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getUsername(): BehaviorSubject<string> {
    return this.usernameSubject;
  }

  setUsername(displayName: string) {
    this.usernameSubject.next(displayName);
  }
}
