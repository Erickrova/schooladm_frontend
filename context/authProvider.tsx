import {createContext, useEffect, useState} from "react";
import { Auth } from "../helpers/interfaces";

const AuthContext = createContext<any|null>(null);

const AuthProvider = ({children}:any)=>{
    
    const [auth,setAuth] = useState<Auth>({
        _id:"",
        name:"",
        rank:0
    })
    const [profile,setProfile] = useState<Object>({})
    const [loading,setLoading] = useState<Boolean>(true)

    const closeSession = () =>{
        setAuth({
            _id:"",
            name:"",
            rank:0
        })
        localStorage.removeItem("token")
    }

    useEffect(()=>{
        const authenticating = async ()=>{
            // checking if it's authenticated with a token
            const token = localStorage.getItem("token")
            if(!token) {
                setLoading(false)
                return
            
            }
            const init = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            if(token){
                try {
                    const url = `http://localhost:4000/api/user/profile`
                    await fetch(url,init).then(res => res.json()).then(dat => setAuth(dat))
                } catch (error) {
                    console.log(error)
                    setAuth({
                        _id:"",
                        name:"",
                        rank:0
                    })
                }finally{
                    setLoading(false)
                }
            }
            
        }
        authenticating()
    },[])
    useEffect(()=>{
        try {
            // getting user profile 
            if(auth._id){
                fetch(`http://localhost:4000/api/user/get-user/${auth?._id}`).then(res => res.json()).then(res => setProfile(res))
            }
        } catch (error) {
            console.error(error)
        }
    },[auth])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                profile,
                closeSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export{
    AuthContext
}

export default AuthProvider