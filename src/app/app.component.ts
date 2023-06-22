import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmailListComponent } from './components/shared-components/email-list/email-list.component';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification-service.service';
import { Apollo, gql } from 'apollo-angular';
import { IntroduceSession } from './types/introduceSession';
import { Mail } from './types/mail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(EmailListComponent) emailItems!: QueryList<EmailListComponent>;

  title = 'dropmail.me-challenge';
  selectedItem: string | null = null;
  selectedEmail!: Mail
  emailActive: string = ''
  id_email: string = ''
  emails: Mail[] = []
  unread_emails: number = 0
  emails_read: any = [];
  previousQtdeEmails: number = 0
  permissionNotification: boolean = false;

  constructor(
    public StorageService: StorageService,
    private NotificationService: NotificationService,
    private apollo: Apollo
  ) { }



  ngOnInit(): void {
    this.getEmail();
    this.checkNotificationPermission()
  }

  getEmail() {
    let email_active = this.StorageService.getItem("email_active");
    if (email_active == null) {
      this.generateNewEmail()
    } else {
      if (this.checkEmailExpireyDate(email_active.expiresAt) == false) {
        this.generateNewEmail()
      } else {
        this.emailActive = email_active.addresses[0].address
        this.id_email = email_active.id

        this.updatedEmails()
      }
    }
  }

  generateNewEmail() {
    this.apollo
      .mutate({
        mutation: gql`
        mutation {
          introduceSession {
              id,
              expiresAt,
              addresses {
                address
              }
          }
      }

        `,
      })
      .subscribe((result: any) => {
        const email: IntroduceSession = result.data.introduceSession;
        this.StorageService.setItem("email_active", email);
        this.emailActive = email.addresses[0].address
        this.id_email = email.id
        this.updatedEmails()
        console.log("email.ativo", this.emailActive)

      });
  }

  formatDate(data: any) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  checkEmailExpireyDate(date: any): boolean {
    const dateInvalidEmail = new Date(date);
    const currentDate = new Date()
    if (dateInvalidEmail.getTime() < currentDate.getTime()) {
      return false
    } else {
      return true
    }
  }

  checkNotificationPermission(){
    if(Notification.permission === 'granted'){
      this.permissionNotification = true;
    } else if(Notification.permission !== 'denied'){
      this.permissionNotification = false;
      this.requestPermissionNotification()
    } else{
      this.permissionNotification = false
      this.requestPermissionNotification()
    }
  }

  requestPermissionNotification(){
    Notification.requestPermission().then((permission: string) => {
      if (permission === 'granted') {
        this.permissionNotification = true;
      } else {
        this.permissionNotification = true;
      }

    }).catch((error) => {
      alert(error)
    })
  }


  updatedEmails() {
    this.apollo
      .query({
        query: gql`
        query {
          session(id: "${this.id_email}" ) {
            mails {
              id,
              rawSize
              fromAddr
              toAddr
              downloadUrl
              text
              headerSubject
            }
          }
        }


        `,
        fetchPolicy: 'network-only'
      })
      .subscribe((result: any) => {

        this.emails = result.data.session.mails;
        if(this.emails.length > 0 ){
          this.selectItem(this.emails[0].id)
          this.selectedEmail = this.emails[0]
          this.emails_read = this.StorageService.getItem("emails_read") || []
          this.unread_emails = this.emails.length - this.emails_read.length
        }
        if(this.previousQtdeEmails < this.emails.length){
          this.previousQtdeEmails = this.emails.length;
          this.handleVisibilityChange();
        }

      },
        (err) => console.log(err));
  }

  handleVisibilityChange() {

    if (document.visibilityState === 'hidden') {
      // O usuário está fora da janela, enviar notificação
      this.sendNotification()
      console.log("notificação sendo enviada")

    }
  }

  sendNotification(){
    this.NotificationService.sendNotification('Novo Email Recebido', "Você tem um novo email em sua caixa de entrada!")
  }

  updateEmail() {
    this.updatedEmails()
  }

  selectItem(index: string) {
    this.selectedItem = index;
    const verifyEmailSelected = this.emails_read.find((i: any) => i.id == index)
    console.log(verifyEmailSelected)
    if (verifyEmailSelected == undefined) {
      this.emails_read.push(index)
      this.StorageService.setItem("emails_read", this.emails_read)
    }
    if (this.emailItems != undefined) {
      this.emailItems.forEach((item, i) => {
        if (i.toString() !== index) {
          item.deselect();
        }
      });
    }

  }

  handleEmailSelected(email: any) {
    this.selectedEmail = email;
    console.log("email ativo", email)
    // Faça o que deseja com o email selecionado no AppComponent
  }

}
