import React, { useEffect, useState } from 'react'

const Home = () => {
  const [name,setName]= useState('');

  const getUser = async ()=>{
    try {
      const res = await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          'Content-Type':"application/json"
        },
        credentials:"include"
      })
      const data =await res.json();
      console.log(data);
      setName(data.name);
      
    } catch (error) {
      console.log(error);
    }
  }
  



  useEffect(()=>{
    getUser();
  },[])


  return (<>
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="block bg-slate-50 p-6 round-xl shodow-md shadow-slate-300 w-auto">
      <h1 className="text-4xl font-bold text-center">{name?name:"Welcome"}</h1>
       
      </div>
    </div>
    </>
  )
}

export default Home