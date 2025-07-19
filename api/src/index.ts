import express from "express";
import dotenv from "dotenv";
import { auth } from "./middleware/auth";
import { router as words } from "./routes/words";
import {AppDataSource} from "./data-source";

dotenv.config();
const app = express();
app.use(express.json());
app.use(auth);

app.use("/api/words", words);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


app.listen(process.env.PORT || 3000, () => {
    console.log("API started");
});
