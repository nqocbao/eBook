import { Express} from "express";
import { bookRoute } from "./book.route";


export const routesClient = (app: Express) => {
  const prefix = "/api/client"
  
  app.use(`${prefix}/books`, bookRoute);
}