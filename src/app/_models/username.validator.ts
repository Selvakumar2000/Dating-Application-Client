import { AbstractControl, ControlContainer, ValidatorFn } from "@angular/forms";

//drawbag is it accepts only one parameter which is a formcontrol,we cannot simply pass second parameter
/*export function forBiddenNameValidator(control : AbstractControl) : {[key : string] : any} | null
{
    //if validation fails it returns an object where the key is of type string and the value is type of any
    //if the validation passed it returns null
    
   const forbidden = /admin/.test(control.value);
   return forbidden ? { 'forbiddenName' : {value: control.value}} : null;
}*/

//create a factory function that accepts a string as a parameter and returns the validatorfunction itself
//a function that returns a validator function
export function forBiddenNameValidator(forBiddenName : RegExp): ValidatorFn
{
    return (control : AbstractControl) : {[key : string] : any} | null => {
        const forbidden = forBiddenName.test(control.value);
        return forbidden ? { 'forbiddenName' : {value: control.value}} : null;
    }
} 