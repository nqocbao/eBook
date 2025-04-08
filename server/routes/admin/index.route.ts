import { Express } from "express";
import { bookRoute } from "../admin/book.route";
import { newsRoute } from "../admin/news.route";
import { adminRoute } from "../admin/admin.route";
import { favoriteRoute } from "../admin/favorite.route";
import { readingProgressRoute } from "../admin/reading-progress.route";
import { categoriesRoute } from "../admin/category.route";


export const routesAdmin = (app: Express) => {
  const prefix = "/api/admin"

  app.use(`${prefix}/books`, bookRoute);

  app.use(`${prefix}/news`, newsRoute);

  app.use(`${prefix}/categories`,categoriesRoute);

  app.use(`${prefix}/admin`, adminRoute);

  app.use(`${prefix}/favorites`,favoriteRoute);

  app.use(`${prefix}/reading-progress`, readingProgressRoute);
}