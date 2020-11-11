import { FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const checkNIF: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let nif = control.get('nif').value;
    if (nif === null) {
        return null;
    } else {
        const nationality = control.get('nationality').value;

        if (nationality === 'ES') {

            const dniPattern = /^[XYZ]?\d{5,8}[A-Z]$/;
            nif = nif.toUpperCase();

            if (dniPattern.test(nif) === true) {
                let num = nif.substr(0, nif.length - 1);
                num = num.replace('X', 0).replace('Y', 1).replace('Z', 2);
                const letNif = nif.substr(nif.length - 1, 1);
                num = num % 23;
                let letPattern = 'TRWAGMYFPDXBNJZSQVHLCKET';
                letPattern = letPattern.substring(num, num + 1);
                if (letPattern !== letNif) {
                    return { validation: true };
                } else {
                    return null;
                }
            } else { return { validation: true }; }

        } else {
            return null;
        }
    }

}