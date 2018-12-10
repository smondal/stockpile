import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        // this.role = this.currentUserSubject.value
      }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;

    }

    isAdmin(): boolean {
      return this.currentUserValue && this.currentUserValue.role === 'admin';
    }

    getToken(){
      return localStorage.getItem('token');
    }

    login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/api/users/authenticate`, { username, password })
        .pipe(map(user => {
          console.log(user);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', user.token);
              this.currentUserSubject.next(user);
              // this.currentUserSubject.next(user)
          }
          return user;
        })
      )
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
}
