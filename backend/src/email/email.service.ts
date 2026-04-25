import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendCongrats(email: string, name: string, event: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Поздравление с ${event}!`,
      template: './templates/congrats.hbs',
      context: { name, event },
    });
  }
}
