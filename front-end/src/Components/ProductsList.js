import React, { useEffect } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { Link } from "react-router-dom";
import Spinner from "./Spinner";



export default function ProductsList(data) {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getProducts();

    }, [])
    const getProducts = async () => {
        setLoading(true);
        let result = await fetch(`${data.Api_Url}/products`);
        result = await result.json();
        // result = await result;
        setProducts(result)
        setLoading(false)
    }
    // console.log(products);

    const deleteProduct = async (id) => {
        //   console.log(id);
        let result = await fetch(`${data.Api_Url}/delete/${id}`, {
            method: 'Delete'
           
        })


        result = await result.json();
        // console.log(result);
        if (result) {

            alert(`Product with id: ${id}  is deleted`);
            getProducts();
        }
    };

    ////////////////search handle

    const HandleSearch = async (e) => {
        // console.log(e.target.value);
        let key = e.target.value;
        if (key) {

            let result = await fetch(`${data.Api_Url}/search/` + key);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }
    }
    return (

        <>
            <div className="product-list">
                <h3>Product List</h3>
                <input type="text" className="input-search" onChange={HandleSearch} placeholder="Search Product" />
                <ul className="plist-head">
                    <li>S.No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Delete/Update</li>

                </ul>
                {loading && <Spinner/>}
                {
                    products.length > 0 ?
                        products.map((data, i) => {
                            return (
                                <>
                                    <ul key={data._id}>
                                        <li>{i + 1}</li>
                                        <li>{data.name}</li>
                                        <li>{data.price}</li>
                                        <li>{data.category}</li>
                                        <li>{data.company}</li>
                                        <li >
                                            <button onClick={() => deleteProduct(data._id)} style={{ color: "red", marginRight: '15px' }}><AiOutlineDelete /></button>
                                            <button>
                                                <Link to={'/update/' + data._id} style={{ color: "green" }}><RxUpdate /></Link></button>

                                        </li>
                                    </ul>
                                </>
                            )

                        })
                        : <>
                        {loading ? <Spinner/> : <h1>No Result Found</h1>}
                        </>
                }

            </div>
        </>
    )
}