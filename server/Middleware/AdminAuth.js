// import jwt from "jsonwebtoken"
// const adminAuth = async(req,res,next) => {
//     try {
//         const {token} = req.headers
//         if(!token){
//             return res.json({success:false,message:"Not Authorized,try again"})
//         }
//         const decode_token = jwt.verify(token,process.env.JWT_SECRET)
//         const {isAdmin} = decode_token
//         console.log(isAdmin);
        
//         if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"Not Authorized,try again"})
//         }
//         next()
//     } catch (error) {
//         console.log("Admin Auth Error",error)
//         res.json({success:false,message:error?.message})
//     }
// }

// export default adminAuth;

// import jwt from "jsonwebtoken"

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     if (!token) {
//       return res.json({ success: false, message: "Not Authorized, try again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded.isAdmin) {
//       return res.json({ success: false, message: "Not Authorized, only admins can access this route" });
//     }

//     // attach user info to request (optional)
//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log("Admin Auth Error", error);
//     res.json({ success: false, message: error?.message });
//   }
// };

// export default adminAuth;

import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized, try again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is admin
    if (!decoded.isAdmin) {
      return res.json({ success: false, message: "Not Authorized, try again" });
    }

    // optionally attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Admin Auth Error", error);
    res.json({ success: false, message: "Not Authorized, try again" });
  }
};

export default adminAuth;
