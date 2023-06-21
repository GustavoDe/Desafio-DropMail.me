import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInfoComponent } from './email-info/email-info.component';



@NgModule({
  declarations: [
    EmailInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EmailInfoComponent
  ]
})
export class SharedComponentsModule { }
