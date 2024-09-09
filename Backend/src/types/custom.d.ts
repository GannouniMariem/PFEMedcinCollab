import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Utiliser le type User de Prisma directement
    }
  }
}
