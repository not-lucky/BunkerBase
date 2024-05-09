import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { createPost } from "./controllers/posts.js";


import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";


// import bcrypt from "bcrypt";

// for initial data fill
import User from "./models/User.js";
import Post from "./models/Post.js";
import { posts, users } from "./data/index.js";


// CONFiGuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

// security stuff
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// log
app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// store locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */ // from github repo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */

// should be in routes folder, but need upload variable, so yeah
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* AUTH ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`)
      // for (let i = 0; i < 8; i++) {
      //   bcrypt.genSalt().then((salt) => {
      //     bcrypt.hash("abc", salt).then((hash) => {
      //       console.log(hash);
      //     })
      //   });
      // }

      // Post.insertMany(posts);
      // User.insertMany(users);

    });
  })
  .catch((error) => console.log(`${error} did not connect? rip :(`));
