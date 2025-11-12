import UserModel from "../Models/UserModel.js";
import validator  from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken = (user) => {
    return jwt.sign({
        id:user._id,
        email:user.email,
        name:user.name,
        isAdmin: user.isAdmin,
    },process.env.JWT_SECRET,

{expiresIn:"20y"})
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ success: false, message: "email is required" });
        }

        if (!password) {
            return res.json({ success: false, message: "password is required" });
        }

        if (password.length < 8) { 
            return res.json({ success: false, message: "password length should be equal or greater than 8" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
           
          const token = createToken(user);
        return res.json({ success: true, message: "user login successful", token });
        }
        else{
             return res.json({ success: false, message: "Invalid Credentials, try again" });
        }
        

    } catch (error) {
        console.log("user login error", error);
        return res.json({ success: false, message: error?.message });
    }
};

const userRegister = async (req,res) => {
  try {
    const {name,email,password,isAdmin} = req.body;

    if(!name) return res.json({success:false,message:"user name is required!"});
    if(!validator.isEmail(email)) return res.json({success:false,message:"please enter a valid Email"});
    if(!password || password.length < 8) return res.json({success:false,message:"password length should be 8 or more"});

    // ✅ Check if user exists BEFORE saving
    const existingUser = await UserModel.findOne({email});
    if(existingUser){
      return res.json({success:false,message:"user already exists"});
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password,salt);

    // Save new user
    const newUser = new UserModel({
      name,
      email,
      password: encryptedPassword,
      isAdmin
    });

    await newUser.save();

    res.json({success:true,message:"User Registered Successfully"});
  } catch (error) {
    console.log("user register error",error);
    res.json({success:false,message:error?.message}) 
  }
};


const adminLogin = async (req,res) => {
  try {
    const { email, password } = req.body;

        if (!email) {
            return res.json({ success: false, message: "email is required" });
        }

        if (!password) {
            return res.json({ success: false, message: "password is required" });
        }

        if (password.length < 8) { 
            return res.json({ success: false, message: "password length should be equal or greater than 8" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

         if(!user.isAdmin){
           return res.json({success:false,message:"You are not Authorized to login"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

       

        if (isMatch && user.isAdmin) {
           
          const token = createToken(user);
        return res.json({ success: true, message: "Admin Logged successful", token });
        }
        else{
             return res.json({ success: false, message: "Password Not Matched, try again" });
        }
  } catch (error) {
    console.log("Admin Login Error",error);
    res.json({success:false,message:error.message})
  }
};

const removeUser = async (req,res) => {
    try {
        await UserModel.findByIdAndDelete(req.body._id)
        res.json({success:true,message:"User Deleted Successfully"})
    } catch (error) {
        console.log("Removed User Error",error)
        res.json({success:false,message:error.message})
    }
};

const updateUser = async (req,res) => {
    try {
        const {_id, name, email, password } = req.body;

        const user = await UserModel.findById(_id)
        if(!user){
         return res.json({success:true,message:"User not Found"})
        }
        // name
        if(name) user.name = name
        // email
        if(email) {
            if(!validator.isEmail(email)){
              return res.json({success:true,message:"Please Enter a Valid Email Address"})
            }
            
            user.email = email;
        }

        // password
        if(password){
          if(password.length < 8){
            return res.json({success:false,message:"Password length should be equal or greater than 8"})
          }
          const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        }
        // updating the user
        await user.save()
        res.json({success:true,message:"User Updated Successfully!"})
       
    } catch (error) {
        console.log("Update User Error",error)
        res.json({success:false,message:error.message})
    }
};


const getUsers = async (req,res) => {
   try {
    const total = await UserModel.countDocuments({})
    const users = await UserModel.find({})

    res.json({success:true,message:total,users})
   } catch (error) {
    console.log("All User Get error",error)
    res.json({success:false,message:error.message})
   }
};

// UserController.js

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};







export {userLogin,userRegister,getUsers,removeUser,adminLogin,updateUser}


