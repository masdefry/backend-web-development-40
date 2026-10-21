import {
  loginStaffSchema,
  registerStaffSchema,
  setPasswordStaffSchema,
} from '../../validators/auths.validator';
import { validate } from '../../validators/validate';
import { Request, Response } from 'express';
import { AuthsService } from './auths.service';

export class AuthsController {
  static async register(req: Request, res: Response) {
    const { body } = validate(registerStaffSchema, { body: req.body });

    const staff = await AuthsService?.register({ body });

    res.status(201).json({
      success: true,
      message: 'Staff registered successfully',
      data: staff,
    });
  }
  static async login(req: Request, res: Response) {
    const { body } = validate(loginStaffSchema, { body: req.body });

    const { token, staffWithoutPassword } = await AuthsService.login({ body });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Staff logged in successfully',
      data: staffWithoutPassword,
    });
  }

  static async me(req: Request, res: Response) {
    const { payload } = res?.locals;

    const staff = await AuthsService.me(payload?.id);

    res.status(200).json({
      success: true,
      message: 'Session login valid',
      data: staff,
    });
  }

  static async setPassword(req: Request, res: Response) {
    const { body, params } = validate(setPasswordStaffSchema, {
      body: req.body,
      params: req.params,
    });

    const { safeUser } = await AuthsService.setPassword({ body, params });

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      data: safeUser,
    });
  }
}
