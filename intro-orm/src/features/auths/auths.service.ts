import { AppError } from '../../errors/app.error';
import { prisma } from '../../configs/prisma-client.config';
import {
  LoginStaffInput,
  RegisterStaffInput,
  SetPasswordStaffInput,
} from '../../validators/auths.validator';
import { Bcrypt } from '../../lib/bcrypt.lib';
import { Jwt } from '../../lib/jwt.lib';
import 'dotenv/config';
import transporter from '../../lib/transporter.lib';
import path from 'node:path';
import fs from 'fs';
import Handlebars from 'handlebars';

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

    const staff = await prisma.staff.create({
      data: {
        ...body,
      },
    });

    const mainDir = path.join(process.cwd());
    const templateHTML = fs.readFileSync(
      `${mainDir}/src/templates/account-activation.html`,
      'utf-8',
    );
    const templateHTMLCompiled = Handlebars.compile(templateHTML);
    const html = templateHTMLCompiled({
      bebasss: body?.email,
      verificationUrl: `http://localhost:3000/set-password/${staff?.id}`,
    });

    await transporter.sendMail({
      to: body?.email,
      subject: 'Welcome New User',
      html: html,
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

    if (findStaffByEmail?.status === 'UNVERIFIED')
      throw new AppError(
        401,
        'Status unverified. Please activate your account!',
      );

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

  static async me(id: string) {
    return await prisma.staff.findUnique({
      where: {
        id,
      },
      select: {
        fullName: true,
        role: true,
      },
    });
  }

  static async setPassword({ body, params }: SetPasswordStaffInput) {
    const findStaff = await prisma.staff.findUnique({
      where: {
        id: params?.userId,
      },
    });

    if (!findStaff) throw new AppError(404, 'User not found');

    const passwordHashed = await Bcrypt.hashPassword(body?.password);

    const staff = await prisma.staff.update({
      data: {
        password: passwordHashed,
        status: 'VERIFIED'
      },
      where: {
        id: params?.userId,
      },
    });

    const { password, phoneNumber, ...safeUser } = staff;

    return { safeUser };
  }
}

/*
  Business Rules Register New Staff: 
  1. Register staff hanya boleh dilakukan oleh user dengan role MANAGER
  2. Setiap akun staff yang didaftarkan memiliki default password Abc#12345 dan memiliki status UNVERIFIED.
     Untuk akun yang memiliki status UNVERIFIED dilarang melakukan login ke akun nya
  3. Staff akan mendapatkan URL untuk melakukan set password 
  4. Staff harus melakukan set password terbaru untuk akun nya 
  5. Ketika password berhasil di set, ubah status menjadi VERIFIED
*/
