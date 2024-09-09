// import {
//   Controller,
//   Req,
//   Res,
//   Post,
//   Body,
//   Get,
//   UseGuards,
// } from '@nestjs/common';

// import { Request, Response } from 'express';

// import { AuthService } from './auth.service';
// import { SignupDto } from './dto/signup.dto';
// import { SigninDto } from './dto/signin.dto';
// import { JwtAuthGuard } from './jwt.guard';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('signup')
//   async signup(@Body() dto: SignupDto, @Res() res: Response) {
//     try {
//       const result = await this.authService.signup(dto);
//       return res.status(201).json(result);
//     } catch (error) {
//       return res.status(error.getStatus()).json({ message: error.message });
//     }
//   }

//   @Post('signin')
//   async signin(
//     @Body() dto: SigninDto,
//     @Req() req: Request,
//     @Res() res: Response,
//   ) {
//     try {
//       await this.authService.signin(dto, req, res);
//       return res.status(200).json({ message: 'Logged in successfully' });
//     } catch (error) {
//       return res.status(error.getStatus()).json({ message: error.message });
//     }
//   }

//   @Post('signout')
//   async signout(@Req() req: Request, @Res() res: Response) {
//     try {
//       await this.authService.signout(req, res);
//       return res.status(200).json({ message: 'Logged out successfully' });
//     } catch (error) {
//       return res.status(error.getStatus()).json({ message: error.message });
//     }
//   }

//   @Get('profile')
//   @UseGuards(JwtAuthGuard)
//   async profile(@Req() req: Request, @Res() res: Response) {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Utilisateur non authentifié' });
//     }

//     return res.json({ user: req.user });
//   }
// }

import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    try {
      const result = await this.authService.signup(dto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  @Post('signin')
  async signin(
    @Body() dto: SigninDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.authService.signin(dto, req, res);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged in successfully' });
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  @Post('signout')
  async signout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.signout(req, res);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged out successfully' });
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Utilisateur non authentifié' });
    }
    return res.json({ user: req.user });
  }
}
