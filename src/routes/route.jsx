import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthProvider";
import Product from "../pages/user/Product";
import Cart from "../pages/user/Cart";
import ProtectedRoute from "../components/user/ProtectedRoute";
import Profile, { profileLoader } from "../pages/user/Profile";
import ProfileForm from "../components/user/profile/ProfileForm";
import ForgetPassword from "../pages/ForgetPassword";
import { CartContextProvider } from "../context/CartProvider";
import { OrderProvider } from "../context/OrderProvider";
import { CategoryProvider } from "../context/CategoryProvider";
import ProductCategory from "../pages/user/ProductCategory";
import Order from "../pages/user/Order";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
    <CategoryProvider>
        <CartContextProvider>
        <OrderProvider>
          <RootLayout />
        </OrderProvider>
       </CartContextProvider>
       </CategoryProvider> 
        </AuthProvider>
    
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:name/:id", element: <ProductCategory />},
      { path: "orders", element: <Order />},
      { path: "product/:id", element: <Product /> },
      {
        path: "cart",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          </AuthProvider>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthProvider>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </AuthProvider>
        ),
        loader:profileLoader,
        children:[
          {index:true,element:<ProfileForm />},
          {path:'order',element:<Order />},
        ]
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signup", element: <Register /> },
      {
        path: "login",
        element: (
          <AuthProvider>
            <Login />
          </AuthProvider>
        ),
      },
    
    ],
  },
  {
    path:'/forgetPassword',
    element:<ForgetPassword />
  },
]);
export default route;
