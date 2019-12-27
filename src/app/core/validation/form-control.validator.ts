import { Errors } from './errors';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

export function FormControlValidator(field: FormControl, validatorFieldName) {
  const errors = Errors;
  let validationItem: {
    type: '',
    message: ''
  } = {
    type: '',
    message: ''
  };
  errors[validatorFieldName].find((item) => {
    if (
      field &&
      field.hasError(item.type) &&
      (field.dirty ||
      field.touched)
    ) {
      validationItem = item;
      return item;
    }
  });
  return validationItem;
}
