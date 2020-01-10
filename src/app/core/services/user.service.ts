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
   // let login = 'admin';
  //  let password = '12345';
  //  this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', "Basic " + btoa(login + ':' + password) );
  }
  loginStatus(data): Observable<any> {
    if (data = true) {
      this.getLoggedInStatus.emit(true);
      return
    }
  }

  userSignIn(data) {
    return this.http.post(environment.apiEndpoint + 'user-login/',data);
  }

  userSignUp(data) {
    return this.http.post(environment.apiEndpoint + 'user-registration/',data);
  }
  serviceProRegister(data) {
    console.log("Data in service page ==>",data);
    return this.http.post(environment.apiEndpoint + 'CreateProvider/',data);
  }

  providerSignIn(data) {
    return this.http.post(environment.apiEndpoint + 'provider-login/',data);
  }

  providerForgotPassword(data) {
    return this.http.post(environment.apiEndpoint + 'ProviderForgetPassword/',data);
  }
  userForgotPassword(data) {
    return this.http.post(environment.apiEndpoint + 'ForgetPassword/',data);
  }

  getUserProfile(id) {
    return this.http.get(environment.apiEndpoint + 'ServiceProfileviewby/'+id);
  }
  getProviderProfile(id) {
    return this.http.get(environment.apiEndpoint + 'profileviewby/'+id);
  }


  updatedProfileValue(data){
    return this.http.post(environment.apiEndpoint + 'ProviderProfileUpdate/',data);
  }



}
