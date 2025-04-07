import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";
import { requireAuth } from "../../middlewares/client/user.middleware";

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/profile", requireAuth, controller.profile);

export const userRoute = router;