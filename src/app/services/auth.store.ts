import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { User } from './../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    private userSubject = new BehaviorSubject<User>(null);
    user$: Observable<User> = this.userSubject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>('api/login', { email, password })
            .pipe(
                tap(user => this.userSubject.next(user)),
                shareReplay()
            );
    }

    logout() {
        this.userSubject.next(null);
    }
}
