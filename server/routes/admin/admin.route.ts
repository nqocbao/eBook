import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/admin.controller";

router.get("/", controller.index);

export const adminRoute = router;