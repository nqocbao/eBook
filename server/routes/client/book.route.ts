import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/book.controller";

router.get("/", controller.index);

// router.get("/detail/:id", controller.detail);

export const bookRoute = router;