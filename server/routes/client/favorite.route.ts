import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/favorite.controller";

router.get("/", controller.index);

router.post("/add/:doc_id", controller.addDoc);

router.delete("/delete/:doc_id", controller.deleteDoc);

export const favoriteRoute = router;