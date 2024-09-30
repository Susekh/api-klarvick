import Express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import rootRouter from "./routes/root.route.js";

const app = Express();

app.use(Express.json());

app.use(Express.urlencoded({ extended : false }));

app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URI
}));


app.use(cookieParser());


app.use("/", rootRouter);


export default app;