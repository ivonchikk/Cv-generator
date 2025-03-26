import { FormControl } from "@angular/forms";

export interface ProjectForm {
    projectName: FormControl<string>;
    startDate: FormControl<Date>;
    endDate: FormControl<Date>;
    teamSize: FormControl<string>;
    techStack: FormControl<string>;
    roles: FormControl<string>;
    description: FormControl<string>;
    responsibilities: FormControl<string>;
}