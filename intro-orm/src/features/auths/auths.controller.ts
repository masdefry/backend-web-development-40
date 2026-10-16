import { registerStaffSchema } from '../../validators/auths.validator';
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
}
