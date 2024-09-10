import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    const app: FirebaseApp = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);

    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      this.userSubject.next(user);
    } catch (error) {
      console.log(error);
    }
  }
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.userSubject.next(null);
      console.log('Successfully signed out');
    } catch (error) {
      console.log(error);
    }
  }
}
