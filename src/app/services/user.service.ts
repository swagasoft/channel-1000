import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import {UserModel} from '../models/user-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;


  selectedUser: UserModel = {
    fullname: '',
    role: '',
    username : '',
    email   : '',
    password: '',
    ref_username: ''
  };

    noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
    AuthHeader = {headers: new HttpHeaders().set('Authorization',
    `Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, private router: Router) {

  }

  postUser(user: UserModel) {
    return this.http.post(environment.apiBaseUrl + '/register' , user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl  + '/authenticate', authCredentials, this.noAuthHeader);
  }

  // SECURED ROUTE IN THE SERVER SIDE...
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/dashboard');
  }
  editAccount() {
    return this.http.get(environment.apiBaseUrl + '/edit_account');
  }

  setToken(token: string) {
   localStorage.setItem('token', token);

  }
  deleteToken() {
    window.localStorage.removeItem('token');
  }

  public getToken(): string {
  this.token = localStorage.getItem('token');
  return this.token;
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLogedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
    return userPayload.exp > Date.now() / 1000;
    } else {
    return false;
    }
  }
  public logout(): void {
   this.deleteToken();
   this.token = '';
   this.router.navigateByUrl('/');
  }
}
