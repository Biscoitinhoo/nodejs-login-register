import { getCustomRepository } from "typeorm";

import UserRepository from "../../../../database/repositories/UserRepository";
import User from "../../../../domain/model/User";
import { EncryptPassword } from "./EncryptPassword";

class CreateUserController {
  public async addUserInDatabase(user: User): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const newUser = userRepository.create(user);

    /* hash user password before to save it */
    const encryptPassword = new EncryptPassword();
    newUser.password = await encryptPassword.encrypt(user.password);

    await userRepository.save(newUser);
    return newUser;
  }
}
export default CreateUserController;
