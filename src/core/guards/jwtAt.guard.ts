import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Access Token Guard.
 */
export class JwtAtGuard extends AuthGuard('jwtAt') {
  constructor() {
    super();
  }
}
