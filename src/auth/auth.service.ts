import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    name: string | undefined,
    email: string,
    password: string,
    image?: string,
  ) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const created = await this.usersService.create({
      name,
      email,
      password: hashed,
      image,
    });

    const payload = {
      sub: created.id,
      email: created.email,
      role: created.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: created,
    };
  }
}
