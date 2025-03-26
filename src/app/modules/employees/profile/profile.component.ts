import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProfileComponent {
  public idInPath: string = this.route.snapshot.paramMap.get('id')!
  constructor(private readonly route: ActivatedRoute) { }
}
