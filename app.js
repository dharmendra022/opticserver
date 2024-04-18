import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js"
import newSaleRoutes from "./routes/newSaleRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import glassRoutes from "./routes/glassRoutes.js"
import typesGlassRoutes from "./routes/typesGlassRoutes.js"
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
connectDB();

//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("filename", __dirname);

export const app = express();

app.use(express.static('uploads'));
//middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

//routing
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/banner", bannerRoutes);
app.use("/api/v1/sale", newSaleRoutes);
app.use("/api/v1/review", reviewRoutes)
app.use("/api/v1/glass", glassRoutes)
app.use("/api/v1/types",typesGlassRoutes)


app.use("/", (req, res) => {
  res.send("Welcome");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`.bgCyan.white);
});
