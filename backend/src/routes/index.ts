import { Router } from "express";

import registerRoutes from "../routes/register/register.routes";

const routes = Router();
/* Route: register new user */
routes.use("/register", registerRoutes);

export default routes;
