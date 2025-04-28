import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

import { connectDatabase } from "./config/database";
import { routesClient } from "./routes/client/index.route";
import { routesAdmin } from "./routes/admin/index.route";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 5000;

// CORS
// Cách 1: Tất cả tên miền được phép truy cập
app.use(cors());
// Cách 2: Áp dụng cho 1 tên miền cụ thể
// const corsOptions = {
//   origin: 'https://abc.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
// End CORS

// parse application/json
app.use(bodyParser.json());

routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});