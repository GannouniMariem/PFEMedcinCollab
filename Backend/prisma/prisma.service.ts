// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { INestApplication } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor() {
//     super();
//   }

//   async onModuleInit() {
//     try {
//       await this.$connect();
//     } catch (error) {
//       console.error('Failed to connect to the database:', error);
//       throw error;
//     }
//   }

//   async onModuleDestroy() {
//     try {
//       await this.$disconnect();
//     } catch (error) {
//       console.error('Failed to disconnect from the database:', error);
//       throw error;
//     }
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     process.on('beforeExit', async () => {
//       await app.close();
//     });

//     process.on('SIGINT', async () => {
//       await app.close();
//       process.exit(0);
//     });

//     process.on('SIGTERM', async () => {
//       await app.close();
//       process.exit(0);
//     });
//   }
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Successfully connected to the database.');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Successfully disconnected from the database.');
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await this.$disconnect();
      await app.close();
    });

    process.on('SIGINT', async () => {
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });
  }
}
