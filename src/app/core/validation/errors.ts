export const Errors = {
  servicesProcDesc: [
    { type: 'required', message: 'Please Enter About Procedure' },
  ],
  servicePromoCode: [
    { type: 'required', message: 'Please Enter Promo Code' },
  ],
  USAPrice: [
    { type: 'required', message: 'Please Enter USD Price' },
  ],
  locPrice: [
    { type: 'required', message: 'Please Enter Price' },
  ],
  discPrice: [
    { type: 'required', message: 'Please Enter Discount' },
  ],
  servicesSpeciality: [
    { type: 'required', message: 'Please Select Speciality' },
  ],
  servicesProcedure: [
    { type: 'required', message: 'Please Select Procedure' },
  ],
  title: [
    { type: 'required', message: 'Please Enter Title' },
  ],
  gender: [
    { type: 'required', message: 'Please Select Gender' },
  ],
  contactNumber: [
    { type: 'required', message: 'Please Enter Contact Number' },
  ],
  fieldSpeciality: [
    { type: 'required', message: 'Please Select Field Speciality' },
  ],
  // placeofPractice: [
  //   { type: 'required', message: 'Please Enter Practice Place' },
  // ],
  medicalCouncilNo: [
    { type: 'required', message: 'Please Enter Medical Council Number' },
  ],
  firstName: [
    { type: 'required', message: 'Please Enter First Name' },
  ],
  passportNumber: [
    { type: 'required', message: 'Please Enter Passport Number' },
  ],
  expertiseCategory: [
    { type: 'required', message: 'Please Enter Expertise Category' },
  ],
  address: [
    { type: 'required', message: 'Please Enter Practice Address' },
  ],
  registrationNo: [
    { type: 'required', message: 'Please Enter Practice Address' },
  ],
  lastName: [
    { type: 'required', message: 'Please Enter Last Name' },
  ],
  country: [
    { type: 'required', message: 'Please Select Country' },
  ],
  practisingSince: [
    { type: 'required', message: 'Please Enter Practising Since' },
  ],
  qualification: [
    { type: 'required', message: 'Please Enter Qualification' },
  ],
  medicalSchool: [
    { type: 'required', message: 'Please Enter Medical School' },
  ],
  aboutPractioner: [
    { type: 'required', message: 'Please Enter About Practicioner' },
  ],
  DOB: [
    { type: 'required', message: 'Date-of-Birth is required' },
  ],
  otp: [
    { type: 'required', message: 'Please Enter OTP' },
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Enter a valid email' },
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'notEqual', message: 'Password mismatch' }
  ],
 
  // verifyPassword: [
  //   { type: 'required', message: 'Please Retype Your new Password' },
  //   { type: 'notEqual', message: 'Password mismatch' }
  // ],
  // oldPassword: [
  //   { type: 'required', message: 'Old password is required' }
  // ],
  password: [
    { type: 'required', message: 'Password is required' },
    //{ type: 'pattern', message: 'Please enter a valid Password.' },
    { type: 'minlength', message: 'Password Must be 6 characters' }
  ],
  dob: [
    { type: 'required', message: 'Date-of-Birth is required' },
  ],
  // newPassword: [
  //   { type: 'required', message: 'New Password is required' },
  //   { type: 'pattern', message: 'Please enter a valid Password.' }
  // ],
  // fname: [
  //   { type: 'required', message: 'First Name is required' },
  //   { type: 'minlength', message: 'Must be more than 3 characters' }
  // ],
  // middleName: [
  //   { type: 'required', message: 'Middle Name is required' },
  //   { type: 'minlength', message: 'Must be more than 3 characters' }
  // ],
  // lname: [
  //   { type: 'required', message: 'Last Name is required' },
  //   { type: 'minlength', message: 'Must be more than 3 characters' }
  // ],

  // gender: [
  //   { type: 'required', message: 'Gender is required' },
  // ],
  // userField: [
  //   { type: 'required', message: 'User\'s field of expertise is required' },
  // ],
  mobile: [
    { type: 'required', message: 'Mobile Number is required' },
    { type: 'pattern', message: 'Enter a valid Mobile number' },
    { type: 'maxlength', message: 'Mobile Number not be more than 10 characters' }
  ],
  // organizationType: [
  //   { type: 'required', message: 'Organization type is required' }
  // ],
  // organizationName: [
  //   { type: 'required', message: 'Organization Name is required' },
  //   { type: 'minlength', message: 'Must be more than 3 characters' }
  // ],
  // yearOfEstablishment: [
  //   { type: 'required', message: 'Establishment date is required' }
  // ],
  // port: [
  //   { type: 'required', message: 'Port name is required' }
  // ],
  // organizationField: [
  //   { type: 'required', message: 'Write something about your organization' },
  // ],
  // address: [
  //   { type: 'required', message: 'Address is required' },
  // ],
  // contactPerson: [
  //   { type: 'required', message: 'Contact Person name is required' },
  // ],
  // transportationAvailable: [
  //   { type: 'required', message: 'Transportation Available is required' },
  // ],
  // faxNumber: [
  //   { type: 'required', message: 'Fax Number is required' },
  // ],
  // organizationListQueries: [
  //   { type: 'required', message: 'Field is required' },
  // ],
  // organizationList: [
  //   { type: 'required', message: 'Organization List is required' }
  // ],
  // website: [
  //   { type: 'required', message: 'Website is required' }
  // ],
  // maritimeProfessional: [
  //   { type: 'required', message: 'Please choose if you are a Maritime Professional.' },
  // ],
  // fieldOfExpertise: [
  //   { type: 'required', message: 'Please Select Your Field of Expertise.' }
  // ],
  // presentlySailing: [
  //   { type: 'required', message: 'Please choose if You\'re presently Sailing.' }
  // ],
  // department: [
  //   { type: 'required', message: 'Please choose Your Department.' }
  // ],
  // deckOfficer: [
  //   { type: 'required', message: 'Please choose Your Officer Role.' }
  // ],
  // deckRating: [
  //   { type: 'required', message: 'Please choose a Rating.' }
  // ],
  // engineEngineer: [
  //   { type: 'required', message: 'Please choose Your Engineer Role.' }
  // ],
  // engineRating: [
  //   { type: 'required', message: 'Please choose a Rating.' }
  // ],
  // cateringRole: [
  //   { type: 'required', message: 'Please choose Your Catering Role.' }
  // ],
  // shipProfessionalRole: [
  //   { type: 'required', message: 'Please choose Ship Professional Role.' }
  // ],
  // maritimeTeachingProfessional:  [
  //   { type: 'required', message: 'Please choose if you are a Teaching Professional.' }
  // ],
  // perviousSeafaringExperience: [
  //   { type: 'required', message: 'Please choose if you have Seafaring experience.' }
  // ],
  // location: [
  //   { type: 'required', message: 'Please choose a location.' }
  // ],
  // numberOfPersonInvolved: [
  //   { type: 'required', message: 'Please choose how many person is involved.' }
  // ],
  // personsInvolved: [
  //   { type: 'required', message: 'Persons Involved is required.' }
  // ],
  // personWasInvolvedIn: [
  //   { type: 'required', message: 'Person was involved in is required.' }
  // ],
  // shipWas: [
  //   { type: 'required', message: 'Field required.' }
  // ],
  // nearMissIncidentDesc: [
  //   { type: 'required', message: 'Please add some description.' }
  // ],
  // consquencesBeen: [
  //   { type: 'required', message: 'Field required.' }
  // ],
  // consequencesResulted: [
  //   { type: 'required', message: 'Field required.' }
  // ],
  // causesOfNearMiss: [
  //   { type: 'required', message: 'Field required.' }
  // ],
  // question: [
  //   { type: 'required', message: 'Please write a question.' }
  // ],
  // relatedTo: [
  //   { type: 'required', message: 'Please choose the relevant option.' }
  // ],
  // sourceOfQuestion: [
  //   { type: 'required', message: 'Please choose source of question.' }
  // ],
  // option: [
  //   { type: 'required', message: 'Please add option text.' }
  // ],
  // correctAnswer: [
  //   { type: 'required', message: 'Please choose a correct answer.' }
  // ],
  // designation: [
  //   { type: 'required', message: 'Please choose your Designation.' }
  // ],
};
