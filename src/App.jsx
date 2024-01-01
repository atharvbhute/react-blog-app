import { useEffect, useState } from "react";
import { Header, Footer } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";


function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
        dispatch(login(userData));
        console.log(userData);        
        }else{
          dispatch(logout());
        }
      }).finally(()=>{
        setLoader(false);
      })
  },[]);

  return !loader ? (
   
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  
    
  ) : (
    <>
      <h1>Loading....</h1>
    </>
  );
}

export default App;
