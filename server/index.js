import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/Mongodb.js"; 
import userRouter from "./Routes/UserRouter.js";
import cors from "cors"
import ProductRoute from "./Routes/ProductRouter.js";
import connectCloudinary from "./config/Cloudinary.js";
import orderRouter from "./Routes/OrderRouter.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
dbConnect();
connectCloudinary()

app.get("/", (req, res) => {
  res.send("Hello from server, I am Ashfaq");
});

app.get("/api", (req, res) => {
  
  res.send("This is Orebi API server");
});

app.use("/api/user", userRouter);
app.use("/api/product", ProductRoute);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// console.log("PORT:", process.env.PORT);
// console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME);
// console.log("Cloudinary Key:", process.env.CLOUDINARY_API_KEY);
// console.log("Cloudinary Secret:", process.env.CLOUDINARY_SECRET_KEY);
