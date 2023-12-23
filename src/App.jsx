import { useEffect, useState } from "react";
import { Header, Footer } from "./components/index";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { BrowserRouter, Outlet } from "react-router-dom";


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
    <BrowserRouter>
    <div>
      <Header />
      <Footer />
    </div>
    </BrowserRouter>
    
  ) : (
    <>
      <h1>Loading....</h1>
    </>
  );
}

export default App;
