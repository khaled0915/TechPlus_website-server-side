const express = require('express')

require('dotenv').config();


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000 ;

// middleware 

app.use(cors());

app.use(express.json());


// username and pass
// khaledsaifullah50956
// gM3Koz0dMH6wQn4s





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4v47x55.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();



    

    // collection of products 

    const productCollection = client.db('productDB').collection('product');
   
    // const CartCollection = client.db('productDB').collection('cart');
    // const CartCollection = client.db('cartDB').collection('cart');

    // for post the product from user 

    app.post('/product' , async(req, res)=>{

      const productDetails = req.body ;
      console.log(productDetails);

      const result = await productCollection.insertOne(productDetails);
      res.send(result);
    })

    // post specific id 

    // app.post('/product') , async(req ,res) =>{

     

    //   const addedProduct = {
       
    //     name: req.body.name ,
    //     price : req.body.price ,
    //   }
    //   console.log(addedProduct);

    //   if (!addedProduct.name || !addedProduct.price) {
    //     return res.status(400).json({ error: 'Incomplete product data' });
    //   }
    //   const result = await CartCollection.insertOne(addedProduct);
    
    //     return res.status(201).json({ message: 'Product added to the cart', insertedId: result.insertedId });
    //   // const result = await productCollection.insertOne(ProductDetails);

    //   // res.send(result);

    // } 



    // get/read the specific data 

    app.get('/products' , async(req , res) =>{
      const cursor = productCollection.find();

      const result = await cursor.toArray();

      res.send(result);
    })

    



   




    app.get('/products/:brand_name', async (req, res) => {
      try {
        const brand_name = req.params.brand_name;
        const query = { brandName: brand_name };
        const result = await productCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    });


    // Route for getting a product by ID

app.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.findOne(query);

  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.status(404).send('Product not found');
  }
});







// Route for getting products by brand name





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/' , (req,res)=>{
    res.send('brand based server is  running in the port 5000')
})

app.listen(port , () =>{
    console.log(`brand based website is running on port : ${port}`);
})