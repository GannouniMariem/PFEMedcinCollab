import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMyUser(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.getMyUser(id, req);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
