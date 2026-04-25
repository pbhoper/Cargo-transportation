import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

export interface SendCongratsDto {
  email: string;

  name: string;

  event: string;
}

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/templates/congrats')
  async sendCongrats(@Body() dto: SendCongratsDto) {
    await this.emailService.sendCongrats(dto.email, dto.name, dto.event);
    return { message: 'Поздравление отправлено успешно' };
  }
}
