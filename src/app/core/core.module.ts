import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
// guard
import { AuthGuard } from './guard/auth.guard';

// Ngx Bootstrap
import { BsDropdownModule, TabsModule, AccordionModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule
} from '@angular/material';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './components/signin/signin.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HeaderProviderComponent } from './components/header-provider/header-provider.component';
import { FooterProviderComponent } from './components/footer-provider/footer-provider.component';
import { ServiceproviderSigninComponent } from './components/serviceprovider-signin/serviceprovider-signin.component';
import { ServicesidebarComponent } from './components/servicesidebar/servicesidebar.component';
import { CarticonComponent } from './components/carticon/carticon.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SigninComponent,
    HeaderProviderComponent,
    FooterProviderComponent,
    ServiceproviderSigninComponent,
    ServicesidebarComponent,
    CarticonComponent


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//

    OwlModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkkz_K6d5CBMaY6qOBVSCuybYnP_AkagU',
      //apiKey:'AIzaSyBozOMarWpi9n-gu7TkXZR3WH36Admg--Q',
      libraries: ['places']
    }),
    AngularFontAwesomeModule,
    NgxPageScrollCoreModule,
    ScrollToModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    //AgmCoreModule,
    BsDropdownModule,
    AccordionModule,
    TabsModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    OwlModule,
    CarouselModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    // NgxImageGalleryModule,
    // LightboxModule,
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
    SidebarComponent,
    AngularFontAwesomeModule,
    HeaderProviderComponent,
    FooterProviderComponent,
    ServicesidebarComponent,
    CarticonComponent


  ],
  entryComponents: [
    SigninComponent,
    ServiceproviderSigninComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class CoreModule { }
