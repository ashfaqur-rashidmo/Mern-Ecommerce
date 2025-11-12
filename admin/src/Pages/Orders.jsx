// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/orders")
//       .then(res => setOrders(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const updateStatus = async (id, status) => {
//     await axios.put(`http://localhost:8000/api/orders/${id}`, { status });
//     setOrders(prev =>
//       prev.map(order => (order._id === id ? { ...order, status } : order))
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Orders</h1>
//       {orders.map(order => (
//         <div key={order._id} className="border p-4 mb-4 rounded-md">
//           <h2 className="font-semibold">Order ID: {order._id}</h2>
//           <p>User: {order.userId?.name}</p>
//           <p>Total: ${order.totalAmount}</p>
//           <p>Status: {order.status}</p>

//           <div className="mt-2">
//             <select
//               value={order.status}
//               onChange={(e) => updateStatus(order._id, e.target.value)}
//               className="border px-2 py-1 rounded-md"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Orders;

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom' 
import Loader from "../Components/Loader.jsx"
// --- START LOCAL DEFINITIONS TO RESOLVE COMPILATION ERRORS ---

// Placeholder for serverUrl (Must be defined locally now)
// Using a common placeholder for the backend server URL.
const serverUrl = "http://localhost:8000/"; 

// Simplified Title Component (Replaces external import)
const Title = ({ children }) => (
    <h1 className='text-3xl font-bold text-gray-800 mb-4'>{children}</h1>
);
// Simplified PriceFormat Component (Replaces external import)
const PriceFormat = ({ amount }) => {
    return (
        <span>
            ${parseFloat(amount).toFixed(2)}
        </span>
    );
};

// --- END LOCAL DEFINITIONS ---


const OrderStatusUpdater = ({ order, token, fetchOrders }) => {
    const [status, setStatus] = useState(order.status);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        
        try {
            setIsUpdating(true);
            const response = await axios.post(serverUrl + 'api/orders/status', {
                orderId: order._id,
                status: newStatus
            }, { headers: { token } });

            const data = response.data;
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Status Update Error", error);
            toast.error("Failed to update status.");
            // Revert status on error
            setStatus(order.status); 
        } finally {
            setIsUpdating(false);
        }
    };
    


    // Tailwind classes for status colors
    const getStatusClass = (currentStatus) => {
        switch (currentStatus) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <select
                value={status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                className={`py-1.5 px-3 rounded-md text-sm font-semibold border ${getStatusClass(status)} focus:ring-blue-500 focus:border-blue-500 cursor-pointer`}
            >
                {['Pending', 'Processing', 'Delivered', 'Cancelled'].map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            {isUpdating && <Loader size="small" />}
        </div>
    );
};


const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async() => {
        try {
            setLoading(true)
            const response = await axios.get(serverUrl + 'api/orders/list', {headers:{token}})
            const data = response.data
            // console.log("Order List data", data);
        
            if (data.success) {
                setOrders(data.orders || [])
                // console.log("Fetched Orders:", data.orders);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("Order List fetching error", error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchOrders();
        
    }, []);

    return (
        <div>
            {loading ? (
                <div className='flex justify-center items-center'><Loader/></div> 
            ) : (
                <>
                    {/* Added the flex container and the "Add products +" link */}
                    <div className='flex justify-between items-center mb-4'>
                        <Title>Order List</Title>
                        {/* Link redirects to the product addition page (/add) */}
                        <Link to="/order" className='text-sm font-medium hover:text-blue-600 duration-300 cursor-pointer'>
                            Add Orders +
                        </Link>
                    </div>

                    <p className='text-sm text-gray-500 mb-4'>Total Orders: {orders.length}</p>

                    {orders.length > 0 ? (
                        <div className='flex flex-col gap-2 mt-2'>
                            {/* Table Header */}
                            <div className='grid grid-cols-6 items-center py-2 px-3 border bg-gray-100 text-xs sm:text-sm font-semibold rounded-t-lg'>
                                <b className="text-left">Order ID (Partial)</b>
                                <b className="hidden md:block text-left">Customer ID</b>
                                <b className="text-center">Total Amount</b>
                                <b className="hidden sm:block text-center">Items</b>
                                <b className="text-center col-span-2">Status</b>
                            </div>
                            
                            {/* Order Rows */}
                            {orders.map((item) => (
                                <div 
                                    key={item._id} 
                                    className='grid grid-cols-6 items-center py-3 px-3 border bg-white text-xs sm:text-sm shadow-sm rounded-md'
                                >
                                    {/* Order ID */}
                                    <p className='font-mono text-xs line-clamp-1 text-left'>
                                        ...{item._id.slice(-4)}
                                    </p>
                                    
                                    {/* Customer ID */}
                                    <p className='hidden md:block font-medium text-left text-gray-600 line-clamp-1'>
                                        ...{item.userId.slice(-4)}
                                    </p>
                                    
                                    {/* Total Amount */}
                                    <div className='text-center font-bold'>
                                        <PriceFormat amount={item.amount}/>
                                    </div>

                                    {/* Items Count */}
                                    <p className='hidden sm:block text-center text-gray-700 font-medium'>
                                        {item.items.length} 
                                    </p>

                                    {/* Status Updater */}
                                    <div className='text-center col-span-2 flex justify-center'>
                                        <OrderStatusUpdater 
                                            order={item} 
                                            token={token} 
                                            fetchOrders={fetchOrders} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div> 
                    ) : (
                        <div className='mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg'>
                            <p className='text-blue-800 font-medium tracking-wide'>
                                No orders have been placed yet.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Orders;
