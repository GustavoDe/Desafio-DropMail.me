import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EmailListComponent } from './components/shared-components/email-list/email-list.component';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification-service.service';

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

  emails = [
    {
      id: 1,
      title: "Seu novo carro está aqui",
      subject: "Sonho de consumo",
      content: "seu novo carro está na localiza, você pode alugar ou até mesmo comprar seu carro 0km ou seminovo. Se interessou? Entre em contato com (11) 96999-9999"
    },
    {
      id: 2,
      title: "Rai",
      subject: "Rai te mandou uma nova mensagem",
      content: "Olá bom dia, vi seu perfil no linkedin e achei muito interessante. Podemos agendar uma reunião?"
    },
    {
      id: 3,
      title: "Front Revisão1905 Movido para doing",
      subject: "Projeto marilia barreto",
      content: "Para saber mais clique aqui"
    }
  ]
  unread_emails: number = 0
  emails_read: any = []

  constructor(
    private StorageService: StorageService,
    private NotificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.selectItem(this.emails[0].id)
    this.selectedEmail = this.emails[0]
    console.log(this.selectedEmail)
    this.emails_read = this.StorageService.getItem("emails_read") || []
    this.unread_emails = this.emails.length - this.emails_read.length
    console.log("não lidos", this.unread_emails)
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

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
    console.log("atualizar email")
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
