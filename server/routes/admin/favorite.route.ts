import express from "express";
const router = express.Router();

import * as controller from "../../controllers/admin/favorite.controller";

router.get("/", controller.index);

export const favoriteRoute = router;