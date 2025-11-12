// import express from "express";


// const userRouter = express.Router();

// userRouter.get("/users",(req,res)=>{
//     res.send("User route is working");
// })
// export default userRouter;

// Routes/userRouter.js
import express from "express";
import { adminLogin, getProfile, getUsers, removeUser, updateUser, userLogin, userRegister } from "../Controllers/UserController.js";
import adminAuth from "../Middleware/AdminAuth.js";
import userAuth from "../Middleware/UserAuth.js";
const userRouter = express.Router();

// userRouter.get("/users", (req, res) => {
//     res.send("User route is working");
// });

userRouter.post("/register",userRegister)
userRouter.post("/login",userLogin)
userRouter.post("/admin",adminLogin)
userRouter.post("/remove",removeUser)
userRouter.put("/update/:id",updateUser)
userRouter.get('/users',adminAuth, getUsers)
userRouter.get("/profile", userAuth, getProfile);


export default userRouter;
