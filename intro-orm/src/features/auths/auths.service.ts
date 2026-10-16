import { AppError } from '../../errors/app.error';
import { prisma } from '../../configs/prisma-client.config';
import { RegisterStaffInput } from '../../validators/auths.validator';
import { Bcrypt } from '../../lib/bcrypt.lib';

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

    const { password, ...staffWithoutPassword } = staff;

    return staffWithoutPassword;
  }
}
