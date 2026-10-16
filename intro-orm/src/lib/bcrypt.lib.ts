import bcrypt from 'bcrypt';

export class Bcrypt {
  static async hashPassword(plainPassword: string, saltRounds: number = 10) {
    return bcrypt.hash(plainPassword, saltRounds);
  }

  static async comparePassword(plainPassword: string, hashedPassword: string){
    return bcrypt.compare(plainPassword, hashedPassword); 
  }
}
