import orderModel from "../Models/OrderModals.js";

// Helper function to validate authorization token (for admin access)
// NOTE: Assuming adminAuth middleware handles token validation/user role checks for list/update.

// API for placing a new order (Client side)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        if (!userId || !items || !amount || !address || !paymentMethod) {
            return res.json({ success: false, message: "Missing required order fields" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            paymentMethod,
        });

        await newOrder.save();

        res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });

    } catch (error) {
        console.log("Error placing order:", error);
        res.json({ success: false, message: error.message });
    }
};

// API for listing all orders (Admin side)
const listOrders = async (req, res) => {
    try {
        // Fetch orders and sort by newest first
        const orders = await orderModel.find({}).sort({ date: -1 });

        if (orders.length > 0) {
            res.json({ success: true, orders });
        } else {
            res.json({ success: false, message: "No Orders Found" });
        }
    } catch (error) {
        console.log("Error listing orders:", error);
        res.json({ success: false, message: error.message });
    }
};

// API for updating order status (Admin side)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.json({ success: false, message: "Missing orderId or status" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: `Order ID: ${orderId} status updated to ${status}` });

    } catch (error) {
        console.log("Error updating order status:", error);
        res.json({ success: false, message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        // The userId is injected into the request object by the userAuth middleware
        const userId = req.userId; 
        
        if (!userId) {
            return res.json({ success: false, message: "Authentication failed. User ID missing." });
        }

        // Find orders belonging to the logged-in user and sort by newest first (date: -1)
        const orders = await orderModel.find({ userId: userId }).sort({ date: -1 });

        if (orders.length > 0) {
            // Return an array of orders
            res.json({ success: true, orders });
        } else {
            // Return success with an empty array if no orders are found
            res.json({ success: true, orders: [], message: "No orders found for this user." });
        }
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.json({ success: false, message: "Failed to fetch user orders." });
    }
};


export { placeOrder, listOrders, updateOrderStatus,getUserOrders };


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWQwMWYxNGFlNjUxMGVjMDM4M2U3YiIsImVtYWlsIjoiUml5YUBnbWFpbC5jb20iLCJuYW1lIjoiUml5YSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NjAzNjMwODQsImV4cCI6MTc2MjA5MTA4NH0.K3v4GWxpFaO8nLVdnexP5mrZbawltLAiegw3lDfogrM