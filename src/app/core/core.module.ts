import { NgModule,ModuleWithProviders } from '@angular/core';
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
import { BsDropdownModule,TabsModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './components/signin/signin.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    SigninComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
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
      ScrollToModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    //AgmCoreModule,
    BsDropdownModule,
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
   // NgxImageGalleryModule,
   // LightboxModule,
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
    SidebarComponent, 
    AngularFontAwesomeModule
  
  ],
  entryComponents: [
    SigninComponent,
  ]
})
export class CoreModule { }
