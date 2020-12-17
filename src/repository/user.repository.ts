import { User } from '../entity/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserCreateDTO } from 'src/dto/user-create.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  userData() {
    return getRepository(User).createQueryBuilder('user');
  }

  findById(userId: number) {
    return this.userData().where('user.id = :arg', { arg: userId });
  }

  findByName(name: string){
    return this.userData().where('user.name = :arg', { arg: name });
  }

  async userStore(arg: UserCreateDTO): Promise<User>
  {
    const data = new User();
    data.name = arg.name;
    data.amount = arg.amount;
    return await this.manager.save(data);
  }
}
