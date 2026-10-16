import { SignOptions, sign } from "jsonwebtoken";

export class Jwt {
    static async generate(payload: any, secretKey: string, options: SignOptions){
        return sign(payload, secretKey, options); 
    }
}