import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/reading-progress.controller";

router.get("/", controller.index);

// router.get("/detail/:docId",controller.detail);

router.delete("/delete/:id",controller.deleteReadingProgress);

export const readingProgressRoute = router;