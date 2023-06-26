import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserModel } from '../models/user';
import passport from 'passport';

const secretKey = process.env.JWT_SECRET;

passport.use(
  new Strategy(
    {
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(
          jwtPayload.id,
        );
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
