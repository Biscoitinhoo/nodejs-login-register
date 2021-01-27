import { getRepository } from "typeorm";

import User from "../../../../domain/model/user";
import { UserErrors } from "../../../../constants/error/user-errors";
import { CompareHashPassword } from "./compare-hash-passwords";

interface UserAuthenticateProps {
  email: string;
  password: string;
}

class AuthenticateUserController {
  public async authenticateUser({
    email,
    password,
  }: UserAuthenticateProps): Promise<User> {
    const userRepository = getRepository(User);

    /* validate user email */
    const savedUser = await userRepository.findOne({ where: { email } });
    if (!savedUser) throw new Error(UserErrors.INVALID_SIGNIN_AUTHENTICATION);

    /* validate user password */
    const compareHashPassword = new CompareHashPassword();
    const userPasswordCorrect = await compareHashPassword.compare(
      password,
      savedUser.password
    );
    if (!userPasswordCorrect)
      throw new Error(UserErrors.INVALID_SIGNIN_AUTHENTICATION);

    return savedUser;
  }
}

export default AuthenticateUserController;
