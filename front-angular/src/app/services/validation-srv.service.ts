import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class validationService {

    validationEmail(mail: string) {
        var emailRegex =/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if ( emailRegex.test(mail)){
           return true;
           } else {
           return false;
           }
    }
    validateFieldClear(dato:any) {
        if (dato == '' || dato == null) {
            return false;
        } else {
            return true;
        }
    }
    validateCellPhone(number:any){
        if ( /^09[0-9].*$/i.test(number)) {
            return true; 
        } else {
            return false;
        }
    }
    validateTelPhone(number:any){
        if (/^0[0-9].*$/i.test(number)) {
            return true; 
        } else {
            return false;
        }
    }
    validateMinLength(string:any){
        if (string.length<=10) {
            return false; 
        } else {
            return true;
        }
    }
}
