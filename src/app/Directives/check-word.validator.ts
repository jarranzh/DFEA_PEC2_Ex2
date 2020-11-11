import { FormControl, ValidatorFn} from '@angular/forms';

export class CheckWord{
    public static checkInvalidWord(mask: RegExp): ValidatorFn{
        return (control: FormControl): { [key: string]: any } | null  => {
            const invalid = mask.test(control.value);
            return invalid ? { 'invalidWord': { value: control.value } } : null;
        }
    }
}