import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/book.controller";

router.get("/", controller.index);

router.get("/detail/:id",controller.detail);

router.post("create", controller.create);

router.patch("edit/:id", controller.edit);

router.patch("delete", controller.deleteBook);

export const bookRoute = router;