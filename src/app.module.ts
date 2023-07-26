import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducerService } from './producers/mail/jobs/sendMail-producer-service';
import { SendMailConsumer } from './producers/mail/jobs/sendMail-consumer';
import { Queue } from 'bull';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        port: Number(process.env.SMTP_PORT),
      },
      defaults: {
        from: '"Murilo Fuza" <murilo@nestjs.com>',
        port: Number(process.env.SMTP_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailProducerService, SendMailConsumer],
})
export class AppModule {
  constructor(@InjectQueue('mail-queue') private mailQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.mailQueue)]);
    consumer.apply(router).forRoutes('/admin/bull');
  }
}
