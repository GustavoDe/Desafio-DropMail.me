import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Mail } from 'src/app/types/mail';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent implements OnInit {
  @Input() isSelected: boolean = false;
  @Input() email: any;
  @Output() emailSelected = new EventEmitter<any>();

  isClickedBefore: boolean = false;
  storageKey: string = '';

  constructor(private StorageService: StorageService){

  }

  ngOnInit(): void {
  /*   this.storageKey = 'emailItem_' + this.email.id; */
    this.isClickedBefore = this.StorageService.getItem(this.storageKey) || false;
  }

  deselect() {
    this.isSelected = false;
  }

  selectedEmail() {
    this.emailSelected.emit(this.email);
    this.isSelected = !this.isSelected;
    this.isClickedBefore = true;
    console.log(this.email)
    this.StorageService.setItem(this.storageKey, true);
    // Lógica adicional que você queira executar ao clicar no item
  }


}
