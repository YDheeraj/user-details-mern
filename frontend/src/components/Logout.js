import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {
    const {dispatch} = useContext(UserContext);
    
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            navigate('/login');
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>console.log(err));
    },[])

  return (
    <div>Logout</div>
  )
}

export default Logout