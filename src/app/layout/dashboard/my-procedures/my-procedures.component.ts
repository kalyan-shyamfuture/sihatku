import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from "../../../core/services/main.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControlValidator, PasswordValidator } from "../../../core/validators";
import { log } from 'util';
@Component({
  selector: 'app-my-procedures',
  templateUrl: './my-procedures.component.html',
  styleUrls: ['./my-procedures.component.scss']
})
export class MyProceduresComponent implements OnInit {
  procedureList: any = [];
  userId: any;
  procedureId: any;
  specialityDetails: any = [];
  serviceRegForm: FormGroup;
  submitted: boolean = false;
  services_details: FormArray;
  listMyProcedure: any = [];

  currency = {
    // "AED": "United Arab Emirates Dirham",
    // "AFN": "Afghan Afghani",
    // "ALL": "Albanian Lek",
    // "AMD": "Armenian Dram",
    // "ANG": "Netherlands Antillean Guilder",
    // "AOA": "Angolan Kwanza",
    // "ARS": "Argentine Peso",
    // "AUD": "Australian Dollar",
    // "AWG": "Aruban Florin",
    // "AZN": "Azerbaijani Manat",
    // "BAM": "Bosnia-Herzegovina Convertible Mark",
    // "BBD": "Barbadian Dollar",
    // "BDT": "Bangladeshi Taka",
    // "BGN": "Bulgarian Lev",
    // "BHD": "Bahraini Dinar",
    // "BIF": "Burundian Franc",
    // "BMD": "Bermudan Dollar",
    // "BND": "Brunei Dollar",
    // "BOB": "Bolivian Boliviano",
    // "BRL": "Brazilian Real",
    // "BSD": "Bahamian Dollar",
    // "BTC": "Bitcoin",
    // "BTN": "Bhutanese Ngultrum",
    // "BWP": "Botswanan Pula",
    // "BYN": "Belarusian Ruble",
    // "BZD": "Belize Dollar",
    // "CAD": "Canadian Dollar",
    // "CDF": "Congolese Franc",
    // "CHF": "Swiss Franc",
    // "CLF": "Chilean Unit of Account (UF)",
    // "CLP": "Chilean Peso",
    // "CNH": "Chinese Yuan (Offshore)",
    // "CNY": "Chinese Yuan",
    // "COP": "Colombian Peso",
    // "CRC": "Costa Rican Colón",
    // "CUC": "Cuban Convertible Peso",
    // "CUP": "Cuban Peso",
    // "CVE": "Cape Verdean Escudo",
    // "CZK": "Czech Republic Koruna",
    // "DJF": "Djiboutian Franc",
    // "DKK": "Danish Krone",
    // "DOP": "Dominican Peso",
    // "DZD": "Algerian Dinar",
    // "EGP": "Egyptian Pound",
    // "ERN": "Eritrean Nakfa",
    // "ETB": "Ethiopian Birr",
    // "EUR": "Euro",
    // "FJD": "Fijian Dollar",
    // "FKP": "Falkland Islands Pound",
    // "GBP": "British Pound Sterling",
    // "GEL": "Georgian Lari",
    // "GGP": "Guernsey Pound",
    // "GHS": "Ghanaian Cedi",
    // "GIP": "Gibraltar Pound",
    // "GMD": "Gambian Dalasi",
    // "GNF": "Guinean Franc",
    // "GTQ": "Guatemalan Quetzal",
    // "GYD": "Guyanaese Dollar",
    // "HKD": "Hong Kong Dollar",
    // "HNL": "Honduran Lempira",
    // "HRK": "Croatian Kuna",
    // "HTG": "Haitian Gourde",
    // "HUF": "Hungarian Forint",
    // "IDR": "Indonesian Rupiah",
    // "ILS": "Israeli New Sheqel",
    // "IMP": "Manx pound",
    // "INR": "Indian Rupee",
    // "IQD": "Iraqi Dinar",
    // "IRR": "Iranian Rial",
    // "ISK": "Icelandic Króna",
    // "JEP": "Jersey Pound",
    // "JMD": "Jamaican Dollar",
    // "JOD": "Jordanian Dinar",
    // "JPY": "Japanese Yen",
    // "KES": "Kenyan Shilling",
    // "KGS": "Kyrgystani Som",
    // "KHR": "Cambodian Riel",
    // "KMF": "Comorian Franc",
    // "KPW": "North Korean Won",
    // "KRW": "South Korean Won",
    // "KWD": "Kuwaiti Dinar",
    // "KYD": "Cayman Islands Dollar",
    // "KZT": "Kazakhstani Tenge",
    // "LAK": "Laotian Kip",
    // "LBP": "Lebanese Pound",
    // "LKR": "Sri Lankan Rupee",
    // "LRD": "Liberian Dollar",
    // "LSL": "Lesotho Loti",
    // "LYD": "Libyan Dinar",
    // "MAD": "Moroccan Dirham",
    // "MDL": "Moldovan Leu",
    // "MGA": "Malagasy Ariary",
    // "MKD": "Macedonian Denar",
    // "MMK": "Myanma Kyat",
    // "MNT": "Mongolian Tugrik",
    // "MOP": "Macanese Pataca",
    // "MRO": "Mauritanian Ouguiya (pre-2018)",
    // "MRU": "Mauritanian Ouguiya",
    // "MUR": "Mauritian Rupee",
    // "MVR": "Maldivian Rufiyaa",
    // "MWK": "Malawian Kwacha",
    // "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    // "MZN": "Mozambican Metical",
    // "NAD": "Namibian Dollar",
    // "NGN": "Nigerian Naira",
    // "NIO": "Nicaraguan Córdoba",
    // "NOK": "Norwegian Krone",
    // "NPR": "Nepalese Rupee",
    // "NZD": "New Zealand Dollar",
    // "OMR": "Omani Rial",
    // "PAB": "Panamanian Balboa",
    // "PEN": "Peruvian Nuevo Sol",
    // "PGK": "Papua New Guinean Kina",
    // "PHP": "Philippine Peso",
    // "PKR": "Pakistani Rupee",
    // "PLN": "Polish Zloty",
    // "PYG": "Paraguayan Guarani",
    // "QAR": "Qatari Rial",
    // "RON": "Romanian Leu",
    // "RSD": "Serbian Dinar",
    // "RUB": "Russian Ruble",
    // "RWF": "Rwandan Franc",
    // "SAR": "Saudi Riyal",
    // "SBD": "Solomon Islands Dollar",
    // "SCR": "Seychellois Rupee",
    // "SDG": "Sudanese Pound",
    // "SEK": "Swedish Krona",
    // "SGD": "Singapore Dollar",
    // "SHP": "Saint Helena Pound",
    // "SLL": "Sierra Leonean Leone",
    // "SOS": "Somali Shilling",
    // "SRD": "Surinamese Dollar",
    // "SSP": "South Sudanese Pound",
    // "STD": "São Tomé and Príncipe Dobra (pre-2018)",
    // "STN": "São Tomé and Príncipe Dobra",
    // "SVC": "Salvadoran Colón",
    // "SYP": "Syrian Pound",
    // "SZL": "Swazi Lilangeni",
    // "THB": "Thai Baht",
    // "TJS": "Tajikistani Somoni",
    // "TMT": "Turkmenistani Manat",
    // "TND": "Tunisian Dinar",
    // "TOP": "Tongan Pa'anga",
    // "TRY": "Turkish Lira",
    // "TTD": "Trinidad and Tobago Dollar",
    // "TWD": "New Taiwan Dollar",
    // "TZS": "Tanzanian Shilling",
    // "UAH": "Ukrainian Hryvnia",
    // "UGX": "Ugandan Shilling",
     "USD": "United States Dollar",
    // "UYU": "Uruguayan Peso",
    // "UZS": "Uzbekistan Som",
    // "VEF": "Venezuelan Bolívar Fuerte",
    // "VND": "Vietnamese Dong",
    // "VUV": "Vanuatu Vatu",
    // "WST": "Samoan Tala",
    // "XAF": "CFA Franc BEAC",
    // "XAG": "Silver Ounce",
    // "XAU": "Gold Ounce",
    // "XCD": "East Caribbean Dollar",
    // "XDR": "Special Drawing Rights",
    // "XOF": "CFA Franc BCEAO",
    // "XPD": "Palladium Ounce",
    // "XPF": "CFP Franc",
    // "XPT": "Platinum Ounce",
    // "YER": "Yemeni Rial",
    // "ZAR": "South African Rand",
    // "ZMW": "Zambian Kwacha",
    // "ZWL": "Zimbabwean Dollar"
  };
  currencyList: any;
  specialtyId: any;
  isMYR:any;
  constructor(
    private modalService: BsModalService,
    private mainService: MainService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.userId = localStorage.getItem('userId');
    this.specialtyId = localStorage.getItem('specialityId');
    ////console.log("kkkkkkkkkkkkkk==>", this.specialtyId);
  }

  ngOnInit() {
  //  this.getProcedureList();
    this.serviceRegForm = this.formBuilder.group({
      serviceDetails: this.formBuilder.array([])
    })
    this.currencyList = Object.keys(this.currency);
    // //console.log(this.currencyList);
    this.myAllProcedureList();

    this.isMYR = Object.values(this.currency).indexOf(localStorage.getItem('getCurrency'))
    //console.log("Is MYR==>",this.isMYR);
  }

  myAllProcedureList() {

    this.mainService.getmyProcList(this.userId).subscribe(
      res => {
       // //console.log("My Procedure List==>", res);
        this.listMyProcedure = res['response']['serviceDetails'];
        //console.log("List My Procedure==>",this.listMyProcedure);
       // alert(this.listMyProcedure.length);
        //this.listMyProcedure = res['response']['serviceDetails'];
        // Loop

        
      },
      error => {
        //console.log(error.error);
      }
    )
  }

  myProcedureList() {

    this.mainService.getmyProcList(this.userId).subscribe(
      res => {
       // //console.log("My Procedure List==>", res);
        this.listMyProcedure = res['response'];
       // alert(this.listMyProcedure.length);
        //this.listMyProcedure = res['response']['serviceDetails'];
        // Loop

        if(this.listMyProcedure.length == 0) {
          this.listMyProcedure=[];
        }
        else {
          const serviceRegForm = this.serviceRegForm.controls.serviceDetails as FormArray;
        ////console.log(serviceRegForm.controls);
        this.listMyProcedure['serviceDetails'].map((procItem, key) => {
       //   //console.log('map', procItem);
          
        });
        serviceRegForm.controls.map(spcControl => {
          // //console.log('outside if', spcControl);
          this.listMyProcedure['serviceDetails'].map((procItem, key) => {
           // //console.log('outside if', spcControl, procItem);
            if (spcControl.value.speciality === procItem.speciality) {
            //  //console.log('within if', spcControl);
              const procs = spcControl.get('procedure') as FormArray;
              
              procs.controls.map((proc, key) => {
                procItem.procedure.map(singleProc => {
                  if (singleProc.ProcedureID === proc.get('ProcedureID').value) {
                    // const spcControls = spcControl
                    //console.log('within if map', proc, singleProc, procItem);
                    proc.get('isChecked').setValue(true);
                    proc.get('aboutProcedure').setValue(singleProc.aboutProcedure);
                    proc.get('currency').setValue(singleProc.currency);
                    proc.get('setPrice').setValue(singleProc.setPrice);
                  }
                });
                
              });
            }
          });
        });
        }
        
      },
      error => {
        //console.log(error.error);
      }
    )
  }


  getProcedureList() {
    this.spinner.show();
    var data = {
      "SpecID": this.specialtyId
    }
    this.mainService.getProcedureListbySpecId(data).subscribe(
      res => {
       // //console.log("Res==>", res);
        this.specialityDetails = res['response'];
        this.specialityDetails.map((spc, key) => {
        //  //console.log(spc);
          this.createServiceDetail(spc.specialityID);
          spc.ProcedureDetails.forEach(value => {
          //  //console.log("Value ==>",value);
            this.createProcedure(key, value.procedureid);
          });
        });
        this.spinner.hide();
        this.myProcedureList();
      },
      error => {
        //console.log(error.error);
        this.spinner.hide();
      }
    )
  }

  


  get mainForm() {
    return this.serviceRegForm.get('serviceDetails') as FormArray;
  }

  servicedetailsModel(valueId): FormGroup {
    return this.formBuilder.group({
      speciality: [valueId, Validators.required],
      procedure: this.formBuilder.array([])
    });
  }


  createServiceDetail(specialityId): void {
    const formIndex = this.mainForm.length;
    this.mainForm.push(this.servicedetailsModel(specialityId));
    // //console.log(this.mainForm);

  }

  procedureModel(procedureId): FormGroup {
    return this.formBuilder.group({
      ProcedureID: [procedureId, Validators.required],
      isChecked: [false],
      aboutProcedure: ['', Validators.required],
      currency: ['', Validators.required],
      setPrice: ['', Validators.required],
      // locPrice: ['', Validators.required],
    });
  }


  createProcedure(index, procedureId): void {
    // //console.log(index, this.mainForm.at(index));
    const procedureForm = this.mainForm.at(index).get('procedure') as FormArray;
    // const procedureValue = procedureForm.controls.length + 1;
    procedureForm.push(this.procedureModel(procedureId));
  }

  submitForm() {
    this.serviceRegForm.value.providerId = this.userId;
    ////console.log("Provider reg New==>", this.serviceRegForm.value);

 ////console.log("123==>",this.listMyProcedure.length);
    if(this.listMyProcedure.length == 0) {

      this.mainService.addProcedure(this.serviceRegForm.value).subscribe(
        res => {
      //    //console.log("Res==>", res);
          if (res['status'] == 1) {
            this.toastr.success(res['response'][0]['msg'], '', {
              timeOut: 3000,
            });
          }
        },
        error => {
          //console.log(error.error);
        }
      )

    }
    else {
      this.mainService.updateProcedure(this.serviceRegForm.value).subscribe(
        res => {
          ////console.log("Res==>", res);
          if (res['status'] == 1) {
            this.getProcedureList();
            this.toastr.success(res['response'][0]['msg'], '', {
              timeOut: 3000,
            });
          }
        },
        error => {
          //console.log(error.error);
        }
      )
    }
   
  }



}
