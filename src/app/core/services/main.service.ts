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
  // getProcedureList() {
  //   return this.http.get(environment.apiEndpoint + 'healthDashboard');
  // }
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
  getProcedureList(id) {
    return this.http.get(environment.apiEndpoint + 'servicelistbyID/'+id);
  }

  // deleteProcedure(id) {
  //   return this.http.get(environment.apiEndpoint + 'ProcedureDeleteby/'+id);
  // }
  deleteProcedure(data) {
    return this.http.post(environment.apiEndpoint + 'ProcedureDelete/',data);
  }

  // deletePractioner(id) {
  //   return this.http.get(environment.apiEndpoint + 'ProcedureDeleteby/'+id);
  // }
  deletePractioner(pracId,provId) {
    return this.http.get(environment.apiEndpoint + 'PractionerDeleteby/'+pracId+'/'+provId); //practionerId/ ProviderId
  }

  getProcedureListbySpecId(data) {
    return this.http.post(environment.apiEndpoint + 'getProcedureListbySpecId',data);
  }

  providerNewRegistration(data) {
    return this.http.post(environment.apiEndpoint + 'CreateProviderdetails',data);
  }

  getProviderList(data) {
    return this.http.post(environment.apiEndpoint + 'ProviderList',data);
  }

  userCart(data) {
    return this.http.post(environment.apiEndpoint + 'usercart',data);
  }

  providerDetails(data) {
    return this.http.post(environment.apiEndpoint + 'ProviderDetails',data);
  }

  stripePayment(data) {
    return this.http.post(environment.apiEndpoint + 'stripePayment',data);
  }

  placeOrder(data) {
    return this.http.post(environment.apiEndpoint + 'order',data);
  }
  getStateList(data) {
    return this.http.post(environment.apiEndpoint + 'StatelistbyCountryCode',data);
  }

  newRegistration(data) {
    return this.http.post(environment.apiEndpoint + 'ProviderReg',data);
  }
  
  getProviderSpecialityList(data) {
    return this.http.post(environment.apiEndpoint + 'SpecialityListByProviderID',data);
  }

  addProvider(data) {
    return this.http.post(environment.apiEndpoint + 'AddPractioner',data);
  }
  updatePractioner(data) {
    return this.http.post(environment.apiEndpoint + 'AddPractioner',data);
  }

  getPractionerDetails(id) {
    return this.http.get(environment.apiEndpoint + 'PractionerDetailsby/'+id);
  }

  getOrderListing(data) {
    return this.http.post(environment.apiEndpoint + 'orderListing',data);
  }

  addProcedure(data) {
    return this.http.post(environment.apiEndpoint + 'addproc',data);
  }

  updateProcedure(data) {
    return this.http.post(environment.apiEndpoint + 'updateproc',data);
  }

  getmyProcList(id) {
    return this.http.get(environment.apiEndpoint + 'addprocList/'+id);
  }

  // updateProvider(data) {

  // }

  getOrderListingbyProvider(id) {
    return this.http.get(environment.apiEndpoint + 'Order/'+id);
  }

  
  updateProviderPassword(data) {
    return this.http.post(environment.apiEndpoint + 'ProviderChangePassword',data);
  }

  // getLocationDetails(data) {
  //   console.log("kkk==>",data);
  //  // http://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false"
  //   // return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng="+ data.lat + "," + data.long +"&sensor=false"');
  //   return this.http.get(environment.apiEndpoint + 'Specialitylist');
  // }


  



}
