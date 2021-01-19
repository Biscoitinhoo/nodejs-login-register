import { getCustomRepository } from "typeorm";

import UserRepository from "../database/repositories/UserRepository";
import User from "../model/User";

/* TODO: refactor UserProps and creation of the repository */
interface UserProps {
  firstName: string;
  lastName: string;

  password: string;

  favoriteThing: string;
}

class CreateUserService {
  public async addUserInDatabase({
    firstName,
    lastName,
    password,
    favoriteThing,
  }: UserProps): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    /* create a new user using 'getCustomRepository' methods, then save it. */
    const newUser = userRepository.create({
      firstName,
      lastName,
      password,
      favoriteThing,
    });
    await userRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
