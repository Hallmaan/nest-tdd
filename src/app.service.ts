import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
