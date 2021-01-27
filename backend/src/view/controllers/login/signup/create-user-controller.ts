import { getCustomRepository } from "typeorm";

import User from "../../../../domain/model/user";
import UserRepository from "../../../../database/repositories/user-repository";

import { EncryptPassword } from "./encrypt-password";
import { UserErrors } from "../../../../constants/error/user-errors";
import { EmailValidation } from "../../../../validation/validator/email-validation";

class CreateUserController {
  public async addUserInDatabase(user: User): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    await verifyUserRegisterErrors(userRepository, user);

    const newUser = userRepository.create(user);

    /* hash user password before to save it */
    const encryptPassword = new EncryptPassword();
    newUser.password = await encryptPassword.encrypt(user.password);

    await userRepository.save(newUser);
    return newUser;
  }
}

async function verifyUserRegisterErrors(
  repository: UserRepository,
  user: User
): Promise<void> {
  /* Already registered email */
  if (await repository.emailExists(user.email))
    throw new Error(UserErrors.EMAIL_ALREADY_REGISTERED);
  /* Empty fields */
  let fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.favoriteThing,
  ];
  if (!isValidRegisterFields(fields))
    throw new Error(UserErrors.INVALID_REGISTER_FIELDS);

  /* Valid e-mail format */
  const emailValidation = new EmailValidation();
  if (!emailValidation.isValid(user.email))
    throw new Error(UserErrors.INCORRECT_EMAIL_FORMAT);
}

function isValidRegisterFields(fields: string[]): boolean {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].length === 0) return false;
  }
  return true;
}

export default CreateUserController;
