import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthProvider"

export default function ProtectedRoute({children}) {
   const {userAuth} =useUserAuth();
   if(userAuth.token) return children
   return <Navigate to='/auth/login' />
  
}
