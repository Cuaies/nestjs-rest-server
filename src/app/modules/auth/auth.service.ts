import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import { hashPassword } from '../../../core/utils/hashPassword';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Registers a new user into the database.
   */
  async register(DTO: RegisterDTO) {
    const passwordHash = hashPassword(DTO.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...DTO,
          password: passwordHash,
        },
      });

      delete user.password;
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        }
      }

      throw e;
    }
  }

  /**
   * Handles login credentials and generates a JWT token.
   */
  async login(DTO: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: DTO.email,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const isPasswordValid = await compare(DTO.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException();
    }

    return this.signToken(user);
  }

  /**
   * Signs a JWT token for the given id.
   */
  private async signToken({ id }: User): Promise<{ access_token: string }> {
    const token = await this.jwtService.signAsync(
      { sub: id },
      { expiresIn: '1d', secret: this.configService.get('JWT_AT_SECRET') },
    );

    return { access_token: token };
  }
}
