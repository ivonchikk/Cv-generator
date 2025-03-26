import { FormControl } from "@angular/forms";

export interface ProfileInfo {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    specialization: FormControl<string>;
    department: FormControl<string>;
}