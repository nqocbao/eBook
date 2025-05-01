import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/history.controller";

router.get("/", controller.index);

router.put("/add/:book_id", controller.addBook);

router.delete("/delete/:book_id", controller.deleteBook);

export const historyRoute = router;