import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { SendEmailModule } from './controllers/send-email/send-email.module';

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
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          port: Number(process.env.SMTP_PORT),
        },
        defaults: {
          port: Number(process.env.SMTP_PORT),
        },
        template: {
          dir: '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullBoardModule.forRoot({
      route: "/dashboard",
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    SendEmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
