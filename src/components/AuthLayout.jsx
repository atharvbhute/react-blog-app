import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({authentication = true, children}) {

    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state)=> state.status)
    const navigate = useNavigate();

    useEffect(()=>{

        // another code virsion

        // if (authStatus) {
        //     navigate("/");                        
        // }else{
        //     navigate("/login");
        // }

        if(authentication && authStatus !== authentication){
            navigate("/login");
        }else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])


  return loader ? (<h2>Loading ....</h2>) : (<div>{children}</div>)
}

export default Protected