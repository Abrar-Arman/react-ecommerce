import { createContext, useContext, useState } from "react";

const userAuthContext=createContext();
export function AuthProvider({children}){
    const[userAuth,setUserAuth]=useState(()=>{
        return JSON.parse(localStorage.getItem('userAuth')) || {token:null,userData:null};
    });
    function handleLogin(t,d){
        const newUserAuth = { token: t, userData: d };
       setUserAuth(newUserAuth); // Update the state
      localStorage.setItem('userAuth', JSON.stringify(newUserAuth));
    }
    function handleLogOut(){
        setUserAuth({token:null,userData:null});
        localStorage.removeItem('userAuth');
    }
    return (
        <userAuthContext.Provider value={{userAuth,handleLogin,handleLogOut}}>
            {children}
        </userAuthContext.Provider>
    )
}
export function useUserAuth(){
    const userAuth=useContext(userAuthContext);
        if (userAuth === undefined) {
            throw new Error("useUserAuth must be used within a UserAuthProvider");
        
    }
    return userAuth;
}