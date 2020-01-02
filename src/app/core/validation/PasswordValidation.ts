
import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
      
        let password = AC.get('password').value;
        if(AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
            let verifyPassword = AC.get('confirmPassword').value;

            if(password != verifyPassword) {
                AC.get('confirmPassword').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }

    static MatchPasswordProvider(AC: AbstractControl) {
        let password = AC.get('providerPassword').value;
        if(AC.get('providerconfirmPassword').touched || AC.get('providerconfirmPassword').dirty) {
            let verifyPassword = AC.get('providerconfirmPassword').value;

            if(password != verifyPassword) {
                AC.get('providerconfirmPassword').setErrors( {MatchPasswordProvider: true} )
            } else {
                return null
            }
        }

    }
}