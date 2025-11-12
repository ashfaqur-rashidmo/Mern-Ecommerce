import express, { Router } from "express"; // Ensure Router is imported correctly
import { 
    placeOrder, 
    listOrders, 
    updateOrderStatus, 
    getUserOrders
} from "../Controllers/OrderController.js";
import adminAuth from "../Middleware/AdminAuth.js"; 
import userAuth from "../Middleware/UserAuth.js"; 

// Initialize the Express Router instance
const OrderRouter = express.Router();

// Client route: Requires user authentication to place an order
OrderRouter.post("/place", userAuth, placeOrder);

// Admin routes: Require admin authentication
// This defines the /api/order/list route
OrderRouter.get("/list", adminAuth, listOrders); 
// This defines the /api/order/status route
OrderRouter.post("/status", adminAuth, updateOrderStatus);

OrderRouter.get("/userorders", userAuth, getUserOrders); 


export default OrderRouter;



