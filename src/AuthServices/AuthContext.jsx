import { onAuthStateChanged } from "firebase/auth";
import { createContext,useContext, useEffect, useState } from "react";
import {auth} from "./AuthService"

const AuthContext = createContext();

export const AuthProvider = (({children})=>{
    const [currentUser, setCurrentUSer] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUSer(user),
            setLoading(false)
        })
;
return unsubscribe;
    },[]);

    return <AuthContext.Provider value={{currentUser}}>
        {!loading && children}
    </AuthContext.Provider>

})

export const useAuth = () => {
    return useContext(AuthContext);
}