import { NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateDTO } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const expectResult: User = {
    id: 1,
    name: 'agung',
    amount: '2.0',
  };

  const storeRequest: UserCreateDTO = {
    name: 'xxxxxxx',
    amount: '2.0',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: () => ({
            findByName: jest.fn(() => ({
              getOne: jest.fn(() => false)
            })),
            userStore: jest.fn(() => ({
              name: 'xxxxxxxx',
              amount: '2.1',
              id: 1,
            })),
            findById: jest.fn(() => ({
              getOne: jest.fn(() => expectResult),
            })),
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('should create return user by id', async () => {
    const id = 1;
    const result: User = {
      id: 1,
      name: 'agung',
      amount: '2.0',
    };
    expect(await service.getUserById(id)).toEqual(result);
  });
  it('should create user', async () => {
    const result: User = {
      name: 'xxxxxxxx',
      amount: '2.1',
      id: 1,
    };
    expect(await service.storeUsers(storeRequest)).toEqual(result);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('UsersService', () => {
  let service: UsersService;
  const expectResult: User = {
    id: 1,
    name: 'agung',
    amount: '2.0',
  };

  const storeRequest: UserCreateDTO = {
    name: 'xxxxxxx',
    amount: '2.0',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: () => ({
            findByName: jest.fn(() => ({
              getOne: jest.fn(() => ({
                id: 1,
                name: 'agung',
                amount: '2.0',
              }))
            })),
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('should fail when create user', async () => {
    expect(service.storeUsers(storeRequest)).rejects.toThrow(NotAcceptableException);
  });
});
