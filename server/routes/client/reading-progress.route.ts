import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/reading-progress.controller";

router.get("/", controller.index);

router.get("/detail/:doc_id", controller.detail);

router.post("/add/:doc_id", controller.addDoc);

router.delete("/delete/:doc_id", controller.deleteDoc);

export const readingProgressRoute = router;