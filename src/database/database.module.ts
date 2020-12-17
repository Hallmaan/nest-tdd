import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": "root",
        "password": "1234lupa",
        "database": "dummy_ds",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": false
      }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule { }
