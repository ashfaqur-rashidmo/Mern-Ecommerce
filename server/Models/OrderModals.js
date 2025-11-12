import mongoose from "mongoose";

// Schema for a single item within an order
const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // Price per unit at time of order
    image: { type: String } // Main product image URL
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Assuming userId is a string identifier
    items: { type: [orderItemSchema], required: true },
    amount: { type: Number, required: true }, // Total amount paid
    address: { type: Object, required: true }, // Shipping address object
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
