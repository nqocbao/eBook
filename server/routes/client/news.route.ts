import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/news.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const newsRoute = router;