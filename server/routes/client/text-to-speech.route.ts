import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/text-to-speech.controller";

router.post("/", controller.getAudio);

export const ttsRoute = router;