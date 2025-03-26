import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { ProjectForm } from '../../../model/forms/project-form.interface';

@Component({
  selector: 'cv-gen-project-form',
  templateUrl: './cv-gen-project-form.component.html',
  styleUrl: './cv-gen-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvGenProjectFormComponent  {
  @Input() public cvProjectForm!: FormGroup<ProjectForm>
}
