// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { jwtSecret } from 'src/utils/constants';
// import { Request } from 'express';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
//       secretOrKey: jwtSecret,
//     });
//   }

//   // Méthode statique pour extraire le JWT du cookie
//   private static extractJWT(req: Request): string | null {
//     if (req.cookies && req.cookies.token) {
//       return req.cookies.token;
//     }
//     return null;
//   }

//   // Valide le payload du JWT
//   async validate(payload: { id: string; email: string }) {
//     return payload;
//   }
// }

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtSecret } from 'src/utils/constants';
import { Request } from 'express';

interface JwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: jwtSecret,
    });
  }

  private static extractJWT(req: Request): string | null {
    console.log('reqcokiess', req.cookies);
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
