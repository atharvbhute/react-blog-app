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
      if(authService.getCurrentUser() == null){
        console.log("user not found");
        dispatch(logout());
      }else{
        authService.getCurrentUser().then((userData) => dispatch(login(userData)))
        .catch((err) => console.log("err: ", err))        
      }
      setLoader(false);
  },[]);

  return !loader ? (
    <div>
      <Header />
      <Footer />
    </div>
  ) : (
    <>
      <h1>Loading....</h1>
    </>
  );
}

export default App;
