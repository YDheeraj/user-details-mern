import React, { useEffect, useState } from 'react'
import usericon from '../images/usericon.jpg'
import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate();

 const [user,setUser] = useState({});

  const callAboutPage = async ()=>{
    try {
      const res = await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          'Content-Type':"application/json"
        },
        credentials:"include"
      })
      const data = await res.json();
      setUser(data);
      if(!res.status===200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate('/login')
    }
  }

  useEffect(()=>{
    callAboutPage();
  },[])

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
       <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-center items-center pt-4">
          <img src={usericon} alt="User Profile" className="h-32 w-32 rounded-full" />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{user.name}</div>
          <div className="text-gray-700 text-base">
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Profession: {user.work}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About