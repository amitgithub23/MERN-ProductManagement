const express = require('express');
const cors = require('cors');
require('./db/config');
require('dotenv').config();
const PORT = process.eventNames.PORT || 5000; 

const User = require("./db/users")
const Product = require('./db/product')
var jwt = require('jsonwebtoken');
const jwtkey = "e-comm"   //keep this key secret dont tell anyone

const app = express();

app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
    let user = new User(req.body);  //get (req.body) from front end or postman
    let result = await user.save();
    result = result.toObject();  //convert result to object than delete so that password will not shown in responce
    delete result.password;
    res.send(result )


});

app.post("/login", async (req, res) => {
  
    // console.log(req.body);
    if (req.body.password && req.body.email) {

        let user = await User.findOne(req.body).select("-password"); // .select("-password") in respose passward will not shown

        if (user) {  
            // res.send({ user}) //THIS WILL SEND user data inside {} so dont use it
            res.send(user)
            
        }
        else {
            res.send({ Result: 'No User Found' })
        }

    } else {
        res.send({ Result: 'No User Found' })
    }

})

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get('/products' , async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No result found" })
    }

})

app.delete('/delete/:id',async (req, res) => {
    //   res.send(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
    console.log(result);

})

app.get('/product/:id',  async (req, res) => {

    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No record found" })
    }

});

app.put("/update/:id" ,  async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },  //by using which we are going to update in this case id  is used to update
        { $set: req.body }
    )
    res.send(result)
});

//////search api
app.get('/search/:key',  async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },    //fields you need as key for search
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);


})

//////////////middleware having three parameters
function verifyToken(req, res, next) {
    //we are sending token from Thunder Client(or postman) from Headers - Authorization and we are trying to get it below
    let token = req.headers['authorization']  //authorization //not USE(Authorization)

    if (token) {   
      /*  token = token.split(' ');  //sometimes people use extra Authorization key eg(bearer) so to saperate it frpm token
        console.log('token array ', token);
        token = token[1]; //to get token in index 1 from array*/
console.log('inside if', token);
    
        jwt.verify(token, jwtkey, (err, valid) => {     //to veryfy token with jwtkey 

            if (err) {
                res.status(401).send({ result: "Please provide valid token" })
            } else {
                next();  //verifytoken ko api(get,put etc) ke upar le jayega  jin jin api me verifytoken lata hoga
            }
        });
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }

    console.log('middleware called', token);



}

// app.get("/", (req, res)=>{
//    res.send('app is working learn this backend part bro'
//    )
//  });

app.listen(PORT, ()=>{
    console.log(`node js server`);
    console.log(PORT);
})
