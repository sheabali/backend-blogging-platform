import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
      token = req.headers.authorization?.split(' ')[1].trim();
    }

    // If the token send from the client
    if (!token) {
      throw new AppError(401, 'You are not authorized');
    }

    // Decode and verify the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    console.log(decoded);
    const { role, email } = decoded;
    console.log('email', email, role);

    // Check if the user exists
    const user = await User.isUserExists(email);
    if (!user) {
      throw new AppError(404, 'User not found!');
    }
    console.log('USER', user);
    // Check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(403, 'This user is blocked!');
    }

    // Check if the user's role is authorized
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You do not have the required permissions');
    }

    // Attach user info to the request object
    req.user = decoded as JwtPayload;

    next();
  });

export default auth;
