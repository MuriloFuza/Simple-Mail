import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SendMailProducerService } from '../../producers/mail/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {
  constructor(private mailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDTO) {
    this.mailService.sendMail(createUser);
    return createUser;
  }
}
