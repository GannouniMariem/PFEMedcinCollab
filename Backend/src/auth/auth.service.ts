import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const {
      email,
      firstName,
      lastName,
      specialty,
      companyName,
      phoneNumber,
      professionalAddress,
      city,
      postalCode,
    } = dto;

    // Vérification de l'existence de l'utilisateur
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    // Génération et hachage du mot de passe
    const generatedPassword = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await this.hashPassword(generatedPassword);

    // Création de l'utilisateur
    const newUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        specialty,
        companyName,
        phoneNumber,
        email,
        password: hashedPassword,
        professionalAddress,
        city,
        postalCode,
      },
    });

    // Génération du token JWT
    const token = await this.signToken({
      id: newUser.id,
      email: newUser.email,
    });

    // Envoi de l'email avec le mot de passe généré
    await this.sendEmail(
      newUser.email,
      'Welcome to Our Service',
      `Dear ${firstName} ${lastName},\n\nYour account has been created successfully. Your temporary password is: ${generatedPassword}\n\nPlease change it after your first login.\n\nBest regards,\nYour Company`,
    );

    return { message: 'User created successfully', token };
  }

  async signin(dto: SigninDto, req: Request, res: Response) {
    try {
      const { email, password } = dto;

      // Recherche de l'utilisateur
      const foundUser = await this.prisma.user.findUnique({ where: { email } });
      if (!foundUser) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Wrong credentials' });
      }

      // Vérification du mot de passe
      const compareSuccess = await this.comparePasswords({
        password,
        hash: foundUser.password,
      });
      if (!compareSuccess) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Wrong credentials' });
      }

      // Génération du token JWT
      const token = await this.signToken({
        id: foundUser.id,
        email: foundUser.email,
      });

      console.log('token', token);
      // Stockage du token dans un cookie avec une expiration de 30 jours
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies only in production
        sameSite: 'none', // Required for cross-origin requests
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
      });

      console.log('ressss', res.getHeaders());

      // Envoi de la réponse
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Logged in successfully', token });
    } catch (error) {
      // Gestion des erreurs
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'An error occurred' });
    }
  }

  async signout(req: Request, res: Response) {
    // Suppression du cookie de session
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfully' });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async comparePasswords(args: {
    hash: string;
    password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hash);
  }

  private async signToken(args: {
    id: string;
    email: string;
  }): Promise<string> {
    const payload = args;
    return await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '30d', // Le jeton expire en 30 jours
    });
  }

  private async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
  }
}
