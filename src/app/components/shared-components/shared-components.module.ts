import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInfoComponent } from './email-info/email-info.component';
import { EmailListComponent } from './email-list/email-list.component';



@NgModule({
  declarations: [
    EmailInfoComponent,
    EmailListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EmailInfoComponent,
    EmailListComponent
  ]
})
export class SharedComponentsModule { }
