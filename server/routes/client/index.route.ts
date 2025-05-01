import { Express } from "express";
import { bookRoute } from "./book.route";
import { newsRoute } from "./news.route";
import { userRoute } from "./user.route";
import { favoriteRoute } from "./favorite.route";
import { readingProgressRoute } from "./reading-progress.route";
import { historyRoute } from "./history.route";
import { ttsRoute } from "./text-to-speech.route";

import { requireAuth } from "../../middlewares/client/user.middleware";


export const routesClient = (app: Express) => {
  const prefix = "/api/client"

  app.use(`${prefix}/books`, bookRoute);

  app.use(`${prefix}/news`, newsRoute);

  app.use(`${prefix}/users`, userRoute);

  app.use(`${prefix}/favorites`, requireAuth, favoriteRoute);

  app.use(`${prefix}/reading-progress`, requireAuth, readingProgressRoute);

  app.use(`${prefix}/history`, requireAuth, historyRoute);

  app.use(`${prefix}/tts`, requireAuth, ttsRoute);
}