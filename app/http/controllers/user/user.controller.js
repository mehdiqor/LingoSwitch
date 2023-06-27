import { signupValidation } from '../../validators/user.validator.js';
import { UserModel } from '../../../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../controller.js';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import * as bcrypt from 'bcrypt';

class UserController extends Controller {
  async signup(req, res, next) {
    try {
      // validate request
      await signupValidation.validateAsync(req.body);
      const { email, password } = req.body;

      // check exist user
      const findUser = await this.findUser(email);
      if (findUser)
        throw createHttpError.Conflict(
          'User already exist!',
        );

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

      if (!user)
        throw createHttpError.InternalServerError();

      delete user.password;
      return res.status(StatusCodes.CREATED).json({
        user,
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
      if (!findUser)
        throw createHttpError.NotFound('User NotFound!');

      // check password
      this.checkPassword(findUser, password);

      // access token and refresh token
      const token = await this.signToken(
        findUser._id,
        email,
        res,
      );

      delete user.password;
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: {
          id: findUser._id,
          email: findUser.email,
          token,
        },
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
      throw createHttpError.Unauthorized();
    }
  }

  async findUser(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    return user;
  }

  checkPassword(user, password) {
    // compare password
    const pwMatches = bcrypt.compareSync(
      password,
      user.password,
    );

    // if password incorrect throw excepion
    if (!pwMatches)
      throw createHttpError.Forbidden(
        'Credentials incorrect',
      );
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
      throw createHttpError.InternalServerError();

    // send Rtoken with cookies
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 Week
    });

    return access_token;
  }
}

export const UserAuthController = new UserController();
