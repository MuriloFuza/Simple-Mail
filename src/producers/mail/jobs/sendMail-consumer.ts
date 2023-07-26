import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/controllers/create-user/create-user-dto';

@Processor('mail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job<CreateUserDTO>) {
    console.log(
      `Processing job ${job.id} sending email to ${job.data.name} with email ${job.data.email}...`,
    );
  }

  @Process('mail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Teste BackGroundJobs',
      subject: 'Email enviado com sucesso!',
      text: `Este email foi entregue para ${data.name}`,
    });
  }
}
