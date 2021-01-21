import { CompareEncrypt } from "../../../../data/protocols/cryptography/CompareEncrypt";
import bcryptjs from "bcryptjs";

class CompareHashPassword implements CompareEncrypt {
  compare(value: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(value, hash);
  }
}
