import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { initialState,reducer} from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = ()=>{
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/logout" element={<Logout/>}></Route>
    <Route path="*" element={<h1>404 error page not found</h1>}/>
  </Routes>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar></Navbar>
      <Routing></Routing>
      </UserContext.Provider>
    </>
  );
};

export default App;
