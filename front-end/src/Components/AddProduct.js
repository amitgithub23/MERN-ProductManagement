import React from "react";
import Spinner from "./Spinner";



export default function AddProduct(data) {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const addProduct = async() => {
  if(!name || !price || !category ||!company)
  {
    setError(true);
 return false;
  }
  else {
    setLoading(true);
// return false; // if we write (return false; ) than statements writeen below are not executed
      console.log(name, price, category, company);
      const userId = JSON.parse(localStorage.getItem('user'))._id;  //this _id is from user collection in mongoDB
      // console.log(userId);
      let result = fetch(`${data.Api_Url}/add-product`, {
          method: 'post',
          body: JSON.stringify({ name, price, category, company, userId }),
          headers: {
              "Content-Type": "application/json"
            
          }
      });
      setLoading(false)
      // result = await result.json();
      if (result) {

        alert(`Product with Name: ${name}  is Added`);
     
    }
    //   result = await result;
      console.log(result); 
  }
    };


    return (
        <> {loading ? <Spinner/> :   <div className="product">
        <h1>Add Product</h1> 
        {error && (!name || !price || !category ||!company) && <span className="addProduct-error">All fields are mandatory. Please fill all the details</span>}
        <input type="text" placeholder="Enter Product Name" className="addProduct-input"
            onChange={(e) => setName(e.target.value)}
    
        />
        <input type="text" placeholder="Enter Product Price" className="addProduct-input"
            onChange={(e) => setPrice(e.target.value)}
        />
        <input type="text" placeholder="Enter Product Category" className="addProduct-input"
            onChange={(e) => setCategory(e.target.value)}
        />
        <input type="text" placeholder="Enter Product Company" className="addProduct-input"
            onChange={(e) => setCompany(e.target.value)}
        />

        <button onClick={addProduct} className="addProduct-Btn">Add Product</button>
    </div> }
         
        </>
    )
}