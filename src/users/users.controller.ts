import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async users(@Param() params: any): Promise<any> {
    try {
      return await this.userService.getUserById(params.id);
    } catch (e) {
      throw new NotAcceptableException(
        'Something wrong when getting user data, please try again',
      );
    }
  }

  @Post('addUsers')
  async addUsers(
    @Body() params: UserCreateDTO,
  ) {
    return await this.userService.storeUsers(params)
  }
}
