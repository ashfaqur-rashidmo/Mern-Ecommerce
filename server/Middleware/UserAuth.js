// Middleware/UserAuth.js
import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Expect header: Authorization: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const token = authHeader.split(" ")[1]; // split "Bearer <token>"
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info
    next();
  } catch (error) {
    console.log("User Auth Error:", error);
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

export default userAuth;
