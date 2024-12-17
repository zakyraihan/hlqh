import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), //port default 3306 lihat xampp
  username: process.env.DB_USERNAME, // username default xampp root
  password: process.env.DB_PASSWORD, // password default xampp string kosong
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  timezone: "+07:00"
};
