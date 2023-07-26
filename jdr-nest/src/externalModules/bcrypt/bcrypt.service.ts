import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
  async encryptPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }
}
