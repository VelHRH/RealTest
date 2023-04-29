import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import { config } from "dotenv";
import multer from "multer";

config();
const app = express();

app.use(cors());

const storage = multer.diskStorage({
 destination: (_, __, cb) => {
  cb(null, "uploads");
 },
 filename: (_, file, cb) => {
  cb(null, file.originalname);
 },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/user", proxy("http://localhost:8001"));
app.use("/test", proxy("http://localhost:8002"));
app.use("/company", proxy("http://localhost:8003"));
app.use("/uploads", express.static("uploads"));

app.post(
 "/upload",
 upload.single("image"),
 (req: express.Request, res: express.Response) => {
  res.json({
   url: `uploads/${req.file?.originalname}`,
  });
 }
);

app.listen(process.env.PORT, () => {
 console.log(`Gateway service working on port ${process.env.PORT}!`);
});
