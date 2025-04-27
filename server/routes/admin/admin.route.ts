import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/admin.controller";
import { requireAuth } from "../../middlewares/admin/admin.middleware";


router.post("/login", controller.login);

router.post("create", controller.create);

router.get("/profile", requireAuth, controller.profile);

router.post("/logout",controller.logout);

router.post("/password/forgot", controller.forgotPassword);

export const adminRoute = router;