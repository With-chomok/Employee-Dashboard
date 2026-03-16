import {  useState } from "react"

import { useNavigate } from "react-router"

import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Login(){

 const {login, user} = useContext(AuthContext)
 console.log(user);
 const navigate = useNavigate()

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = (e) => {
    e.preventDefault()
  if(username==="testuser" && password==="Test123"){
   login({username})
   navigate("/list")
  }else{
   alert("Invalid Credential")
  } 

 }

 return(
  <div className="flex items-center justify-center h-screen">

   <div className="border border-gray-300 rounded-2xl shadow p-6 w-80">

    <h2 className="text-2xl font-bold text-center mb-4">Login Now</h2>

    <input
     placeholder="Username"
     className="border shadow border-gray-100 rounded-4xl w-full outline-none mb-3 py-2 px-5"
     onChange={(e)=>setUsername(e.target.value)}
    />

    <input
     type="password"
     placeholder="Password"
     className="border shadow border-gray-100 rounded-4xl w-full outline-none mb-3 py-2 px-5"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button
     className="bg-blue-500 text-white rounded-4xl w-full outline-none mb-3 py-2 px-5"
     onClick={handleLogin}
    >
     Login
    </button>

   </div>

  </div>
 )
}