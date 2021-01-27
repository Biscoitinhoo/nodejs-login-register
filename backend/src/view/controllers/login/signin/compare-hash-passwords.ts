import { CompareEncrypt } from "../../../../data/protocols/cryptography/compare-encrypt";
import bcryptjs from "bcryptjs";

export class CompareHashPassword implements CompareEncrypt {
  compare(value: string, hash: string) {
    return bcryptjs.compare(value, hash);
  }
}
