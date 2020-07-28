import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import {UserModel} from '../models/user-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;



    noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
    AuthHeader = {headers: new HttpHeaders().set('Authorization',
    `Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, private router: Router,
              public toastController: ToastController,public alertController: AlertController) {

  }


  async generalAlert(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `${header}`,
      message: `${message}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


  async generalToast(header, message, timeout) {
    const toast = await this.toastController.create({
      header : `${header}`,
      message: `${message}`,
      duration:  3000
    });
    toast.present();
  }


  postUser(userDetails) {
    return this.http.post(environment.apiBaseUrl + '/register' , userDetails, this.noAuthHeader);
  }
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl  + '/authenticate',
     authCredentials, this.noAuthHeader);
  }


  // SECURED ROUTE IN THE SERVER SIDE...
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/dashboard');
  }
  cashout(amount){
    return this.http.post(environment.apiBaseUrl + '/user-cashout', amount);
  }
  loadBalance(){
   return this.http.get(environment.apiBaseUrl + '/load-balance');
  }
  postCashout(post){
    return this.http.get(environment.apiBaseUrl + `/post-user-cashout${post}`);
  }
  payOutUser(id, username,amount){
    return this.http.get(environment.apiBaseUrl + `/payout-user${id},${username},${amount}`);
  }

  getPayoutList(){
    return this.http.get(environment.apiBaseUrl + `/get-recent-payouts`);
  }

  getTransaction(): Observable <any>{
    return this.http.get(environment.apiBaseUrl + '/get-transactions');
  }
  getHighRank(){
    return this.http.get(environment.apiBaseUrl+ '/get-high-ranked')
  }

  editAccount() {
    return this.http.get(environment.apiBaseUrl + '/edit_account');
  }
  transasction(payment){
    return this.http.post(environment.apiBaseUrl + '/transaction', payment);
  }
  saveUserRole(response){
      localStorage.setItem('user-role', response['doc']['role']);
  }

  getUser(){
    localStorage.getItem('username');
  }

  // ####### admin panel
  admindashboard(){
    return this.http.get(environment.apiBaseUrl + '/admin-dashboard');
  }
  getInvestors(){
    return this.http.get(environment.apiBaseUrl + '/get-investors');
  }
  usersCashout(){
    return this.http.get(environment.apiBaseUrl + '/users-cashout');
  }
  getLevel_1(): Observable <any>{
   return this.http.get(environment.apiBaseUrl + '/level-one-users');
  }
  getLevel_2(): Observable <any>{
   return this.http.get(environment.apiBaseUrl + '/level-two-users');
  }
  getLevel_3(): Observable <any>{
   return this.http.get(environment.apiBaseUrl + '/level-three-users');
  }
  getInActiveUsers(){
    return this.http.get(environment.apiBaseUrl + '/get-inactive-users');
  }
  deleteUser(user_id){
    return this.http.get(environment.apiBaseUrl + `/delete-user${user_id}`);
  }
  queryUserDetails(detaills){
    return this.http.get(environment.apiBaseUrl + `/query-user-details${detaills}`);
  }
  deleteTrasaction(user_id){
    return this.http.get(environment.apiBaseUrl + `/delete-transactions${user_id}`);
  }
  getAllTransactions(){
    return this.http.get(environment.apiBaseUrl + '/get-transanctions');
  }
  getLevel_4(): Observable <any>{
   return this.http.get(environment.apiBaseUrl + '/level-four-users');
  }
  postUserTolevel2(post : {user_id : string}): Observable<any>{
    return this.http.get(environment.apiBaseUrl +`/post-user-level2${post}` );
  }
  postUserTolevel_3(post : {user_id : string}): Observable<any>{
    return this.http.get(environment.apiBaseUrl +`/post-user-level3${post}` );
  }
  postUserTolevel_4(post : {user_id : string}): Observable<any>{
    return this.http.get(environment.apiBaseUrl +`/post-user-level4${post}` );
  }

  getRewardUsers(){
    return this.http.get(environment.apiBaseUrl + '/get-reward-users');
  }

  getUserRole(){
   return localStorage.getItem('role');
  }

  getUsername(){
   return localStorage.getItem('username');
  }

  getPackage(){
   return localStorage.getItem('package');
  }

  getfullname(){
   return localStorage.getItem('fullname');
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
   localStorage.removeItem('username');
   localStorage.removeItem('fullname');
   localStorage.removeItem('package');
   localStorage.removeItem('role');
   this.router.navigateByUrl('/login');

  }
}
