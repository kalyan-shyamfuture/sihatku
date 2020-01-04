import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  @Output() getCartNumberStatus: EventEmitter<any> = new EventEmitter();
  headers: any;
  constructor(
    private http: HttpClient
  ) { 
    const login = 'admin';
    const password = '12345';
    this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', 'Basic ' + btoa(login + ':' + password) );

  }

  cartNumberStatus(data): Observable<any> {
    if (data = true) {
      this.getCartNumberStatus.emit(true);
      return;
    }
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
  getProcedureList() {
    return this.http.get(environment.apiEndpoint + 'healthDashboard');
  }
  getSpecialityList() {
    return this.http.get(environment.apiEndpoint + 'Specialitylist');
  }

  getCountryList() {
    return this.http.get(environment.apiEndpoint + 'CountryList');
  }
  getProcedurebySpeciality(id) {
    return this.http.get(environment.apiEndpoint + 'procbyname/'+id);
  }
  getBannerList() {
    return this.http.get(environment.apiEndpoint + 'webbannerlist');
  }
  getTopOffers() {
    return this.http.get(environment.apiEndpoint + 'topoffers');
  }

  requestFeedBack(data) {
    return this.http.post(environment.apiEndpoint + 'userfeedbac',data);
  }

  uploadImage(data) {
    return this.http.post(environment.apiEndpoint + 'upload',data);
  }

  getPopularProcedure() {
    return this.http.get(environment.apiEndpoint + 'popularProcedures');
  }
  getFeatureProvider() {
    return this.http.get(environment.apiEndpoint + 'featuredProviders');
  }

  getPractionerList(id) {
    return this.http.get(environment.apiEndpoint + 'PracticenerDetails/'+id);
  }
}
