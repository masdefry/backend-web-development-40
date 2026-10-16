import { AppError } from '../../errors/app.error';
import { prisma } from '../../configs/prisma-client.config';
import {
  LoginStaffInput,
  RegisterStaffInput,
} from '../../validators/auths.validator';
import { Bcrypt } from '../../lib/bcrypt.lib';
import { Jwt } from '../../lib/jwt.lib';
import 'dotenv/config';

export class AuthsService {
  static async register({ body }: RegisterStaffInput) {
    const findStaffByEmail = await prisma.staff.findUnique({
      where: {
        email: body?.email,
      },
    });

    if (findStaffByEmail) throw new AppError(409, 'Email already exists');

    const findBranchById = await prisma.branch.findUnique({
      where: {
        id: body?.branchId,
      },
    });

    if (!findBranchById) throw new AppError(404, 'Branch ID not found');

    const findShiftById = await prisma.shift.findUnique({
      where: {
        id: body?.shiftId,
      },
    });

    if (!findShiftById) throw new AppError(404, 'Shift ID not found');

    const passwordHashed = await Bcrypt.hashPassword(body?.password);

    const staff = await prisma.staff.create({
      data: {
        ...body,
        password: passwordHashed,
      },
    });

    const { password, phoneNumber, ...staffWithoutPassword } = staff;

    return staffWithoutPassword;
  }

  static async login({ body }: LoginStaffInput) {
    const findStaffByEmail = await prisma.staff.findUnique({
      where: {
        email: body?.email,
      },
    });

    if (!findStaffByEmail)
      throw new AppError(404, 'Email or password is incorrect');

    const isComparePassword = await Bcrypt.comparePassword(
      body?.password,
      findStaffByEmail?.password,
    );

    if (!isComparePassword)
      throw new AppError(404, 'Email or password is incorrect');

    const token = await Jwt.generate(
      {
        id: findStaffByEmail?.id,
        role: findStaffByEmail?.role,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' },
    );

    const { password, phoneNumber, ...staffWithoutPassword } = findStaffByEmail;

    return {
      token,
      staffWithoutPassword,
    };
  }
}
