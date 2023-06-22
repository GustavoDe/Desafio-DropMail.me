import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmailListComponent } from './components/shared-components/email-list/email-list.component';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification-service.service';
import { Apollo, gql } from 'apollo-angular';
import { IntroduceSession } from './types/introduceSession';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren(EmailListComponent) emailItems!: QueryList<EmailListComponent>;

  title = 'dropmail.me-challenge';
  selectedItem: number | null = null;
  selectedEmail: any

  emailActive: string = ''
  id_email: string = ''

  emails: any[] = []
  unread_emails: number = 0
  emails_read: any = []

  constructor(
    private StorageService: StorageService,
    private NotificationService: NotificationService,
    private apollo: Apollo
  ) { }



  ngOnInit(): void {
    this.generateNewEmail()
    /*  this.selectItem(this.emails[0].id)
     this.selectedEmail = this.emails[0]
     console.log(this.selectedEmail)
     this.emails_read = this.StorageService.getItem("emails_read") || []
     this.unread_emails = this.emails.length - this.emails_read.length
     console.log("não lidos", this.unread_emails) */
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

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
        console.log(this.formatarData(new Date(email.expiresAt)))
        this.emailActive = email.addresses[0].address
        this.id_email = email.id
        console.log(this.emailActive)
      });
  }

  formatarData(data: any) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }


  updatedEmails() {
    console.log(this.id_email)
    this.apollo
      .query({
        query: gql`
        query {
          session(id: "${this.id_email}") {
            mails {
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
      })
      .subscribe((result: any) => {
        this.emails = result.data.session.mails
        console.log(result)
      },
        (err) => console.log(err));
  }

  ngOnDestroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      // O usuário está fora da janela, enviar notificação
      console.log("notificação sendo enviada")
      this.NotificationService.sendNotification('1234 chupa meu saco', this.selectedEmail)
      this.NotificationService.sendNotification('chupa minhas bola', this.selectedEmail)
    }
  }

  updateEmail() {
    this.updatedEmails()
  }

  selectItem(index: number) {
    this.selectedItem = index;
    const verifyEmailSelected = this.emails_read.find((i: any) => i == index)
    console.log(verifyEmailSelected)
    if (verifyEmailSelected == undefined) {
      this.emails_read.push(index)
      this.StorageService.setItem("emails_read", this.emails_read)
    }
    if (this.emailItems != undefined) {
      this.emailItems.forEach((item, i) => {
        if (i !== index) {
          item.deselect();
        }
      });
    }

  }

  handleEmailSelected(email: any) {
    this.selectedEmail = email;
    console.log(email)
    // Faça o que deseja com o email selecionado no AppComponent
  }

}
