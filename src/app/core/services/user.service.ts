import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  headers: any;
  constructor(
    private http: HttpClient
  ) { 
    let login = 'admin';
    let password = '12345';
    this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', "Basic " + btoa(login + ':' + password) );
  }
  loginStatus(data): Observable<any> {
    if (data = true) {
      this.getLoggedInStatus.emit(true);
      return
    }
  }

 
  // userSignup(data) {
  //   return this.http.post(environment.apiEndpoint + 'userregister/', data, {headers: this.headers})
  // }

  userOtp(data) {
    return this.http.post(environment.apiEndpoint + 'userotp/', data, {headers: this.headers})
  }


 

  userForgotPassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordotp/', data, {headers: this.headers})
  }
  userForgotPasswordUpdate(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordupdate/', data, {headers: this.headers})
  }



  // userlistAddress(id) {
  //   return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/'+id, {headers: this.headers})
  // }


  userupdateAddress(data) {
    return this.http.post(environment.apiEndpoint + 'updatecustomeraddress/', data, {headers: this.headers})
  }

  updateImage(form,userId) {
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/'+userId, form, {headers: this.headers})
  }

 


  // Api for sihatku

  userSignin(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'usersigninsignupotp/', data, {headers: this.headers})
  }

  userSigninOtp(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'usersigninsignup/', data, {headers: this.headers})
  }

  userDetails(data) {
    return this.http.post(environment.apiEndpoint + 'getprofile/', data,{headers: this.headers})
  }

  editProfile(data) {
    return this.http.post(environment.apiEndpoint + 'updateprofile/', data,{headers: this.headers})
  }

  userlistAddress(data) {
    return this.http.post(environment.apiEndpoint + 'listaddress/',data, {headers: this.headers})
  }

  defaultAddress(data) {
    return this.http.post(environment.apiEndpoint + 'defaultaddress/', data, {headers: this.headers});
  }

  deleteAddress(data) {
    return this.http.post(environment.apiEndpoint + 'deleteaddress/', data, {headers: this.headers})
  }

  userAddAddress(data) {
    return this.http.post(environment.apiEndpoint + 'addaddress/', data, {headers: this.headers})
  }

}
