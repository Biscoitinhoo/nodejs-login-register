import { Router } from "express";

import AuthenticateUserController from "../../../view/controllers/login/signin/authenticate-user-controller";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  try {
    const authenticateUserController = new AuthenticateUserController();

    const { email, password } = request.body;
    const authenticatedUser = await authenticateUserController.authenticateUser(
      {
        email,
        password,
      }
    );

    return response.json(
      "Welcome to the system, " +
        authenticatedUser.firstName +
        ". " +
        "Your favorite thing is " +
        authenticatedUser.favoriteThing
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
