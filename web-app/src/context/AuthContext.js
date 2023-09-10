import axios from "axios";
import { createContext, useEffect,  useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState({user:null});

    useEffect(()=>{
        const unsub = ()=>{
            axios.get('/login',{withCredentials:true}).then(res=>{
                if(res.data.isauth){
                    console.log(res.data)
                    // if(res.data.user.role==='admin')
                    setCurrentUser({user:res.data.user})
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        return ()=>{
            unsub()
        }
    },[])
    return(
        <AuthContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
