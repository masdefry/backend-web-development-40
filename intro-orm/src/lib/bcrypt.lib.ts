import bcrypt from 'bcrypt';

export class Bcrypt {
  static async hashPassword(plainPassword: string, saltRounds: number = 10) {
    return bcrypt.hash(plainPassword, saltRounds);
  }
}
