import { Router } from "express";

import AuthenticateUserController from "../../../view/controllers/login/signin/authenticate-user-controller";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserController = new AuthenticateUserController();
    const authenticatedUser = await authenticateUserController.authenticateUser(
      {
        email,
        password,
      }
    );

    return response.json({ authenticatedUser });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
