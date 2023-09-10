import axios from "axios"
import {  useContext, useState } from "react"
import {   useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const {setCurrentUser}  = useContext(AuthContext)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = {
            username:email,
            password
        }
        axios.post('/login',data).then(res=>{
            console.log(res.data)
            if(res.status === 200){
               if(res.data.isauth){
                setCurrentUser({user:res.data.user})
                navigate('/')
               }
            }
        }).catch(err=>{
            console.log(err)
        })
    } 
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="email">Email</label> */}
                    <input id='email' type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    {/* <label htmlFor="password">Password</label> */}
                    <input id='password' type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default LoginPage