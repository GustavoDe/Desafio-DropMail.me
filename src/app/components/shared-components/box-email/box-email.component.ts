import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mail } from 'src/app/types/mail';

@Component({
  selector: 'app-box-email',
  templateUrl: './box-email.component.html',
  styleUrls: ['./box-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxEmailComponent {
  @Input() email!: Mail;
}
