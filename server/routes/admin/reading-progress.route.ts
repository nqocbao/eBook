import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/reading-progress.controller";

router.get("/", controller.index);

export const readingProgressRoute = router;