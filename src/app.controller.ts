import {
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
