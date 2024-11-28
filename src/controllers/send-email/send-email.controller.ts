import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailBody } from './send-email.types';
import { SendEmailService } from './send-email.service';

@Controller('send-email')
export class SendEmailController {
  constructor(private mailService: SendEmailService) {}

  @Post('/')
  async sendMail(@Body() data: SendEmailBody) {
    this.mailService.sendMail(data);
  }
}
