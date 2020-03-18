// import { Errors } from '../utilities';

// export function InputValidator(formName, field, validatorFieldName) {
//   const errors = Errors;
//   let validationItem = {
//     type: '',
//     message: ''
//   };
//   errors[validatorFieldName].find((item) => {
//     if (
//       formName.get(field) &&
//       formName.get(field).hasError(item.type) &&
//       (formName.get(field).dirty ||
//       formName.get(field).touched)
//     ) {
//       validationItem = item;
//       return item;
//     }
//   });
//   return validationItem;
// }
