import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const trimValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const companyName = control.get('companyName').value;
    if (companyName === null) {
        return null;
    } else {

        if (companyName.startsWith(' ')) {
            return { validationT: true };
        }
        else {
            return null;
        }
    }
}