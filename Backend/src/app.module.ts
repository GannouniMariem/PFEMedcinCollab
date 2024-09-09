import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointment/appointment.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
    UsersModule,
  ],

  providers: [
    //{
    //provide: APP_FILTER,
    //useClass: AllExceptionsFilter,
    //},
  ],
})
export class AppModule {}
