import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/news.controller";

router.get("/", controller.index);

router.get("/detail/:id",controller.detail);

router.post("create", controller.create);

router.patch("edit/:id", controller.edit);

router.patch("delete", controller.deleteNew);

export const newsRoute = router;