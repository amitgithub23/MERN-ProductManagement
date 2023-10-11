import React, { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import Spinner from "./Spinner";


export default function UpdateProduct(data) {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [loading, setLoading] = React.useState(false);

  const params = useParams();
const navigate  = useNavigate();

useEffect(()=>{
    console.log(params.id);
    getProductDetails();
   
},[])

const getProductDetails  = async ()=>{
    setLoading(true);
    let  result = await fetch(`${data.Api_Url}/product/`+params.id
  );
  setLoading(false);
    result = await result.json();
    // console.log(result);
    setName(result.name)
setPrice(result.price)
setCategory(result.category)
setCompany(result.company)
}
    const updateProduct = async() => {
// console.log(name,price,category,company);
setLoading(true);
let result = await fetch(`${data.Api_Url}/update/${params.id}`, {
    method:'Put',
    body: JSON.stringify({name,price,category,company}),
    headers:{
        "Content-Type":"application/json"
       
    }
});
setLoading(false);
//   result = await result.json();
if(result){
    alert(`Product with id: ${params.id} is updated`)
}
  console.log(result);
  navigate('/')
    };


    return (
        <>
            <div className="product">
                <h1>Update Product</h1> 
            {loading ? <Spinner/> : <><input type="text" placeholder="Enter Product Name" className="addProduct-input" value={name}
                    onChange={(e) => setName(e.target.value)}
            
                />
                <input type="text" placeholder="Enter Product Price" className="addProduct-input" value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input type="text" placeholder="Enter Product Category" className="addProduct-input" value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input type="text" placeholder="Enter Product Company" className="addProduct-input" value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <button onClick={updateProduct} className="addProduct-Btn">Update Product</button> </>}
                
            </div>
        </>
    )
}