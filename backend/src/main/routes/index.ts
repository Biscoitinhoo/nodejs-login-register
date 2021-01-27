import { Router } from "express";

import registerRoutes from "../routes/register/register.routes";
import loginRoutes from "../routes/login/login.routes";

const routes = Router();
/* Route: register new user */
routes.use("/register", registerRoutes);
routes.use("/login", loginRoutes);

export default routes;
