import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailBody } from 'src/controllers/send-email/send-email.types';

@Processor('mail-queue')
export class SendEmailConsumer {
  constructor(private mailService: MailerService) { }

  @OnQueueActive()
  onActive(job: Job<SendEmailBody>) {
    console.log(
      `Processing job ${job.id} sending email with email ${job.data.to}...`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<Job>, error: Error) {
    console.log(`Error in job: ${job.id}. Error: ${error.message}`);
  }

  @Process('mail-job')
  async sendMailJob(job: Job<SendEmailBody>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      ...(data.html
        ? {
          html: data.html
        }
        : {
          template: `/templates/${data.template}`,
          context: data.context
        }
      )
    });
  }
}
