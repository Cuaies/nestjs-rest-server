import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Decorator to get the authenticated user from within the request object.
 */
export const AuthenticatedUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
