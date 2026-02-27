import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") { // Enable CORS in development mode
  app.use(cors({
      origin: "http://localhost:5173",
      credentials: true
})); //CORS means: The browser checks if one website is allowed to request data from another website.
}
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter); // Limit repeated requests to prevent abuse
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  // To access frontend from the backend port
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
  // for all the other route request like "/"
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  });
}

// listener
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

