import { Express} from "express";
import { bookRoute } from "./book.route";
import { newsRoute } from "./news.route";


export const routesClient = (app: Express) => {
  const prefix = "/api/client"

  app.use(`${prefix}/books`, bookRoute);

  app.use(`${prefix}/news`, newsRoute);
}