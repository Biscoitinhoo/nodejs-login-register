import { Router } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../../../database/repositories/UserRepository";
import User from "../../../domain/model/User";
import CreateUserService from "../../../presentations/controller/login/signup/CreateUserController";

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

    const user = new User();
    setUserProperties(request.body, user);

    const savedUser = await userService.addUserInDatabase(user);
    /* returning the saved user */
    return response.json(savedUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
/* TODO: refactor request type */
async function setUserProperties(request: any, user: User) {
  /* get the request with user properties and set all the datas */
  user.firstName = request.firstName;
  user.lastName = request.lastName;
  user.email = request.email;
  user.password = request.password;
  user.favoriteThing = request.favoriteThing;
}

export default usersRouter;
