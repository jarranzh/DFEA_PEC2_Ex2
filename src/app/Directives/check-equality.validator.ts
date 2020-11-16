import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const checkEquality: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    return password.value === repeatPassword.value ? null : { equals: true };
}