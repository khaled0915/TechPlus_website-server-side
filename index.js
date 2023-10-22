const express = require('express')

require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');

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
    await client.connect();



    

    // collection of products 

    const productCollection = client.db('productDB').collection('product');

    // for post the product from user 

    app.post('/product' , async(req, res)=>{

      const productDetails = req.body ;
      console.log(productDetails);

      const result = await productCollection.insertOne(productDetails);
      res.send(result);
    })



    // get/read the specific data 

    app.get('/product' , async(req , res) =>{
      const cursor = productCollection.find();

      const result = await cursor.toArray();

      res.send(result);
    })




    



















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
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