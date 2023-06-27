import { signupValidation } from '../../validators/user.validator.js';
import { UserModel } from '../../../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  MyConflictExpetion,
  myForbidden,
  myInternalServerError,
  myNotFound,
  myUnathorized,
} from '../../../error/exceptions.js';

class UserController extends Controller {
  async signup(req, res, next) {
    try {
      // validate request
      await signupValidation.validateAsync(req.body);
      const { email, password } = req.body;

      // check exist user
      const findUser = await this.findUser(email);
      if (findUser) throw MyConflictExpetion();

      // generate hash
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(
        password,
        salt,
      );

      // create user
      const user = await UserModel.create({
        email,
        password: hashedPassword,
      });

      if (!user) throw myInternalServerError();

      const lng = req.headers['accept-language'];
      const message = req.t('signup', { lng });

      return res.status(StatusCodes.CREATED).json({
        message,
        id: user._id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      // validate request
      await signupValidation.validateAsync(req.body);
      const { email, password } = req.body;

      // check exist user
      const findUser = await this.findUser(email);
      if (!findUser) throw myNotFound();

      // check password
      this.checkPassword(findUser, password);

      // access token and refresh token
      const token = await this.signToken(
        findUser._id,
        email,
        res,
      );

      const lng = req.headers['accept-language'];
      const message = req.t('welcome', { lng });

      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          message,
          id: findUser._id,
          email: findUser.email,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async signout(req, res, next) {
    try {
      res.clearCookie('refresh_token');

      const lng = req.headers['accept-language'];
      const message = req.t('signout', { lng });

      return res.status(StatusCodes.OK).json({
        message,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const secretKey = process.env.JWT_SECRET;
      const refreshToken = req.cookies.refresh_token;
      const { id, email } = jwt.verify(
        refreshToken,
        secretKey,
      );
      const token = await this.signToken(id, email, res);

      return res.status(StatusCodes.OK).json({
        token,
      });
    } catch (error) {
      throw myUnathorized();
    }
  }

  async findUser(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    return user;
  }

  checkPassword(user, password) {
    const pwMatches = bcrypt.compareSync(
      password,
      user.password,
    );

    if (!pwMatches) throw myForbidden();
  }

  async signToken(id, email, res) {
    const payload = {
      id,
      email,
    };
    const secretKey = process.env.JWT_SECRET;

    const access_token = jwt.sign(payload, secretKey, {
      expiresIn: '1h',
    });

    const refresh_token = jwt.sign(payload, secretKey, {
      expiresIn: '7d',
    });

    // save token in DB
    const updateUser = await UserModel.updateOne(
      { _id: id },
      { token: refresh_token },
    );
    if (updateUser.modifiedCount == 0)
      throw myInternalServerError();

    // send Rtoken with cookies
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
    });

    return access_token;
  }
}

export const UserAuthController = new UserController();
