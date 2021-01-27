import { Encrypt } from "../../../../data/protocols/cryptography/encrypt";
import bcryptjs from "bcryptjs";

export class EncryptPassword implements Encrypt {
  /* use 'await' when call this method */

  encrypt(value: string): Promise<string> {
    return bcryptjs.hash(value, 8);
  }
}
