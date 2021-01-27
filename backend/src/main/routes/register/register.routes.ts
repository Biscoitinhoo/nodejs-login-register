import { Router } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../../../database/repositories/user-repository";
import User from "../../../domain/model/user";
import CreateUserController from "../../../view/controllers/login/signup/create-user-controller";

const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  /* get all registered users */
  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const userController = new CreateUserController();

    const user = new User();
    setUserProperties(request.body, user);

    const savedUser = await userController.addUserInDatabase(user);

    return response.json(savedUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/* TODO: refactor request type */
async function setUserProperties(request: any, user: User) {
  user.firstName = request.firstName;
  user.lastName = request.lastName;
  user.email = request.email;
  user.password = request.password;
  user.favoriteThing = request.favoriteThing;
}

export default usersRouter;
