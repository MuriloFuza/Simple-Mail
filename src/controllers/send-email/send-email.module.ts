import { BullAdapter } from "@bull-board/api/bullAdapter";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { SendEmailController } from "./send-email.controller";
import { SendEmailService } from "./send-email.service";
import { SendEmailConsumer } from "./send-email.consumer";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "mail-queue",
    }),
    BullBoardModule.forFeature({
      adapter: BullAdapter, // or use BullAdapter if you're using bull instead of bullMQ
      name: "mail-queue",
      options: {
        description: "The Simulation Queue runs all the simulations submitted.",
      },
    }),
  ],
  controllers: [SendEmailController],
  providers: [SendEmailService, SendEmailConsumer],
})
export class SendEmailModule {}
