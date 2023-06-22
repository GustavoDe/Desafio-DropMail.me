import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInfoComponent } from './email-info/email-info.component';
import { EmailListComponent } from './email-list/email-list.component';
import { BoxEmailComponent } from './box-email/box-email.component';



@NgModule({
  declarations: [
    EmailInfoComponent,
    EmailListComponent,
    BoxEmailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EmailInfoComponent,
    EmailListComponent,
    BoxEmailComponent
  ]
})
export class SharedComponentsModule { }
