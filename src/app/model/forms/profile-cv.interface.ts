import { FormControl } from "@angular/forms";

export interface ProfileCv {
    lastName: FormControl<string>;
    email: FormControl<string>;
    skills: FormControl<string>;
    specialization: FormControl<string>;
    department: FormControl<string>;
}