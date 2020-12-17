import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/dto/user-create.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserById(id: any): Promise<any> {
    return this.userRepository.findById(id).getOne();
  }

  async storeUsers(params: UserCreateDTO): Promise<User> {
    // check user by name
    const user = this.userRepository.findByName(params.name).getOne();
    if(user){
      throw new NotAcceptableException(
        'Name already exists',
      );
    }
    return await this.userRepository.userStore(params)
  }
}
