
import './App.css';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import Nav from './Components/Nav';

import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductsList from './Components/ProductsList';
import UpdateProduct from './Components/UpdateProduct';
import Profile from './Components/Profile';
import img from '../src/images/thanks.jpg'

function App() {

  const Api_Url = "https://productmanagementapi-75x5.onrender.com"

  return (
    <div className="App">
      <BrowserRouter>
<Nav/>

<Routes>

  <Route element={<PrivateComponent/>}> 
  <Route path='/' element={<ProductsList Api_Url={Api_Url} />}/>
  <Route path='/add' element={<AddProduct Api_Url={Api_Url} />}/>
  <Route path='/update/:id' element={<UpdateProduct Api_Url={Api_Url} />}/>
  <Route path='/update' element={<Link to='/'>
    <h5>Please Select A Product To Update <br />
    <span>Click Here</span> To Go To Product List

  </h5>
  </Link>}/>
  <Route path='/logout' element={
    <img src={img} style={{width:'100%'}}/>
  }/>
  <Route path='/profile' element={<Profile/>}/>
  </Route>

  <Route path='/signup' element={<SignUp  Api_Url={Api_Url}/>}></Route>
  <Route path='/login' element={<Login Api_Url={Api_Url} />}></Route>
  
</Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
