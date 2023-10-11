import React ,{useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from '../images/logo.jpg'


export default function Nav(){
    const auth = localStorage.getItem("user"); 
    const navigate = useNavigate(); //useNavigate is a hook which will re-render components when there is any change in navigation 

  useEffect(()=>{
    //it means when there is any data in localStorage than it will re-render navigate so that your lofin logout signup etc link(path) will work according to wriiten condition
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
   
  },[])

    const logout = ()=>{
       localStorage.clear();
       navigate('/logout')  // help of useNavigate now you will get logout and signup option according to condition written in link and signup link
    }
 
    return(
        <>
        <div className="nav-container">
        <img className="logo" src={logo} alt="logo"/>
            {
                auth ? <ul className="nav-ul" >
         
                <li> <Link to='/' >Products</Link>    </li>
                <li>    <Link to='/add' >Add Product</Link> </li>
                <li>   <Link to='/update' >Update Product</Link> </li>
                <li>  <Link to='/profile' >Profile</Link> </li>
                <li> <Link  to='/logout'  onClick={logout} 
                //JSON.parse(auth) because we get data from storage in string formate
                >
                    Logout 
                     ({(JSON.parse(auth).name).toUpperCase()})
                    </Link></li>
            

                </ul> :
                 <ul  className="nav-ul nav-right">
                <li><Link to='/signup' >Sign Up</Link></li>
                    <li>   <Link to='/login' >Login</Link> </li>
                </ul>
            }
       
        </div>
        </>
    )

}


