import React from "react";
import {useNavigate} from 'react-router-dom'
import Spinner from "./Spinner";



const Login =(data)=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

   const HandleLogin = async ()=>{
    // console.log(email,password);
    {setLoading(true)}
    let result = await fetch(`${data.Api_Url}/login` , {
        method :'post',
        body: JSON.stringify({ password, email}),
        headers :{
            'Content-Type': 'application/json'
        }
    
    });
    {setLoading(false)}
    //result = await result.json(); //data comming from api is in string format so convert in json format and returns promise
    result = await result.json(); 
    console.log(result);
   
    // if(result.name)
    if(result.name )  //see from inspect network for (auth or token)  ---jwt token
    {
  localStorage.setItem('user', JSON.stringify(result)); //JSON.stringify because localStorage me strinify kar ke set karte hai
  //result.user == here .user because you are getting email and passward inside user(go and see inspect -  network)
//   localStorage.setItem('token', JSON.stringify(result.auth))   //to store token into local storage
  navigate('/')
    }else{
        alert('Please Enter Correct Details')
    }
   }
    return (
        <>
        <div className="login">
        <div style={{marginLeft:'25%'}}>
            <h1>Login</h1>
       {/* {loading &&  <Spinner/>} */}
       { loading  ? <Spinner/> : <>   <input  className="login-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Your Email"/>
            <input className="login-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
          <button onClick={HandleLogin} className="login-button" type="button">Login</button></>}

         
        </div>
        </div>
      
        </>
    )

}

export default Login;