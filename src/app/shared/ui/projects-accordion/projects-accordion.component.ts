import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'projects-accordion',
  templateUrl: './projects-accordion.component.html',
  styleUrl: './projects-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProjectsAccordionComponent {

  @Input() public cvProjectForm!: FormGroup;
  @Input() public projectsIds?: string[] | null;
  @Input() public projectName!: string;
  @Output() public onClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

    public deleteBtn(event: MouseEvent, projectId: string): void {
      event.stopPropagation()
      this.onDelete.emit(projectId)
    }
}
