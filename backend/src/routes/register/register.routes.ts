import { Router } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../../database/repositories/UserRepository";
import User from "../../model/User";
import CreateUserService from "../../services/CreateUserService";

const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  /* get all registered users */
  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const userService = new CreateUserService();

    const { firstName, lastName, password } = request.body;

    const newUser = new User();
    newUser.favoriteThing = request.body.favoriteThing;

    const user = await userService.addUserInDatabase({
      firstName: firstName,
      lastName: lastName,
      password: password,
      favoriteThing: newUser.favoriteThing,
    });
    /* returning the saved user */
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
