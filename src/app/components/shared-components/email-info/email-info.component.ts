import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailInfoComponent implements OnInit {
  @Input() email!: string
  @Input() countdown: number = 15;
  @Output() reloadEmail = new EventEmitter();
  @Output() generateEmail = new EventEmitter();

  borderSize: string = '';
  borderColor: string = '';
  iconCopy = 'fa-solid fa-copy'
  textCopy = 'Copy'

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    const totalDuration = 15;

    setInterval(() => {
      this.countdown--;
      if (this.countdown == 0) {
        this.countdown = totalDuration
        this.sendEvent()
      }

      this.cdr.detectChanges();

    }, 1000);
  }

  sendEvent() {
    this.reloadEmail.emit();
  }

  generateNewEmail(){
    this.generateEmail.emit();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.email)
      .then(() => {
        this.iconCopy = 'fa-solid fa-check'
        this.textCopy = 'Copied'
        setTimeout(() => {
          this.iconCopy = 'fa-solid fa-copy'
          this.textCopy = 'Copy'

        }, 1500)
      })
      .catch((error) => {
        console.error('Erro ao copiar texto para a área de transferência:', error);
      });
  }





}
