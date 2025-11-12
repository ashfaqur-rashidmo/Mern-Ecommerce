import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "../styles/index.css";
import SignIn from "./Components/Pages/SignIn.jsx";
import SignUp from "./Components/Pages/SignUp.jsx";
import About from ".//Components/Pages/About.jsx";
import Cart from "./Components/Pages/Cart.jsx";
import Contact from "./Components/Pages/Contact.jsx";
import Offers from "./Components/Pages/Offers.jsx";
import Order from "./Components/Pages/Order.jsx";
import Product from "./Components/Pages/Product.jsx";
import Shop from "./Components/Pages/Shop.jsx";
import SingleProduct from "./Components/Pages/SingleProduct.jsx";
import RootLayout from "./Components/Layout/RootLayout.jsx";
import Profile from "./Components/Pages/Profile.jsx";
import NotFound from "./Components/Pages/NotFound.jsx";
import Wishlist from "./Components/Pages/WishList.jsx";
import Checkout from "./Components/Pages/CheckOut.jsx";
import PaymentSuccess from "./Components/Pages/PaymentSuccess.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/cart",
          element: (
           <PrivateRoute>
            <Cart />,
           </PrivateRoute>
          ) 
        },
        {
          path: "/contact",
          element: <Contact />,
        },
       
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/Product",
          element: <Product />,
        },
        {
          path: "/shop",
          element: (
            <PrivateRoute>
          <Shop />,
          </PrivateRoute>
          )
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/profile",
          element: (
          <PrivateRoute>
          <Profile />
          </PrivateRoute>
          ) ,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/checkout/:orderId",
          element: (
            <PrivateRoute>
              <Checkout />,
            </PrivateRoute>
          )
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccess />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
);