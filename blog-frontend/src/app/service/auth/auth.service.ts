import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupPayload } from 'src/app/components/login/signup/signup-payload';
import { Observable, from } from 'rxjs';
import { LoginPayload } from 'src/app/components/login/login/login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth/"

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {

  }

  signUp(signupPayload: SignupPayload): Observable<any> {
    return this.httpClient.post(`${this.authURL}sign-up`, signupPayload);
  }  
  
  logIn(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(`${this.authURL}log-in`, loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  getUsername(): string {
    return this.localStorageService.retrieve('username');
  }

  logOut() {
    this.localStorageService.clear('username');
    this.localStorageService.clear('authenticationToken');
  }

  matchUser(username: string): boolean {
    return this.getUsername() == username;
  }
}
