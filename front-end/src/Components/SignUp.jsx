import React,{useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Spinner from "./Spinner";


export default function SignUp(data){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user"); 
        if(auth){
            navigate('/')
        }
    })

   
  

    const collectData = async ()=>{
        const rgExp = /^([ a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/
        
        if(rgExp.test(email)){

           
            setLoading(true);
            if(name && password && email){
            console.log(name, password, email);
            let result = await fetch(`${data.Api_Url}/register` , {
                method :'post',
                body: JSON.stringify({name, password, email}),
                headers :{
                    'Content-Type': 'application/json'
                }
       
            });
            setLoading(false)
            result = await result.json()
            console.log(result);  // result is in readable string , it will return promise, use await
            if(result){
                localStorage.setItem("user", JSON.stringify(result)) //second result is key we are getting from backend
                // localStorage.setItem("token", JSON.stringify(result.token))  //check key(token) comming from backend in inspect - network here we are making local storage of token of register
           navigate('/')
            }} else{
                alert("please fill all the details")
                navigate("/signup")
                setLoading(false)
            }
        }else{
            alert("Please Enter Valid E-mail")
        }
      

       
    }
    return(
        <div style={{marginLeft:'25%'}}>
            <h1>Register</h1>
            {loading ? <Spinner/> : <> <input className="login-input" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"/>
            <input  className="login-input" value={email}  type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"></input>
            <input className="login-input" value={password} type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
          <button onClick={collectData} className="login-button" type="button">Sign Up</button> </>}
           
        </div>
    )
}