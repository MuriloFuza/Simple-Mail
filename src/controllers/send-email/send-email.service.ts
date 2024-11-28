import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SendEmailBody } from 'src/controllers/send-email/send-email.types';

@Injectable()
export class SendEmailService {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  async sendMail(email: SendEmailBody) {
    await this.mailQueue.add('mail-job', email);
  }
}
