import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Avatar from "./Pages/setAvatar";
import {ToastContainer} from "react-toastify";
import SetUsername from "./Pages/SetUsername";
import AuthProvider from "./context/authContext";

const Chat = lazy(() => import("./Pages/Chat"));

const App = () => {
    useEffect(()=>{
    }, [])
    return (
        <AuthProvider>
            <div className="App">
                <Suspense fallback={
                    <>
                        <h1>Loading...</h1>
                    </>}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/register' element={<Registration/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path="/avatar" element={<Avatar/>}/>
                            <Route path="/" element={<Chat/>}/>
                            <Route path="/setusername" element={<SetUsername/>}/>
                        </Routes>
                    </BrowserRouter>
                    <ToastContainer/>
                </Suspense>
            </div>
        </AuthProvider>
    )
}

export default App;
