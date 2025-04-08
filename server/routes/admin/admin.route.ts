import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/admin.controller";
import { requireAuth } from "../../middlewares/admin/admin.middleware";

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/profile", requireAuth, controller.profile);

export const adminRoute = router;