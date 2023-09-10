import axios from "axios"
import React, {   useContext } from "react"
import {    NavLink,  Outlet,  useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import logo from './logo.png'
const Home = ()=>{
  const navigate = useNavigate()
  const {setCurrentUser} = useContext(AuthContext)
  
  const handleSignOut = async()=>{
    axios.get('/logout')
    .then(res=>{
      if(res.status === 200){
        setCurrentUser({user:res.data.user})
        navigate('/login')
      }
    }).catch(err=>{
        console.log(err)
    })
  }
  return (
      <div>
          <div className="head"> 
            <div className='head-container'>
              <img className = 'logo' src = {logo} alt = 'logo'/>
              <div>
                <span>Prof. G. Ram Reddy Centre for Distance Education</span>
                <br/>
                <span> Osmania University</span>
              </div>
            </div>
          </div>
          <div className ='nav'>
            <ul>
              <li>
                {/* <Link to="/">Home</Link> */}
                <NavLink to='/'  className={({ isActive }) => (isActive ? 'isactive' : '')}>Home</NavLink>
              </li>
              {/* <li onClick={()=>navigate('managenotes')}>Manage Notes</li> */}
              <li> <NavLink to='managenotes'  className={({ isActive }) => (isActive ? 'isactive' : '')}>Manage Notes</NavLink> </li>
              <li onClick={handleSignOut}> <span className="link" >Sign Out</span> </li>
            </ul>
          </div>
          <Outlet/>
      </div>
  )
}
export default Home