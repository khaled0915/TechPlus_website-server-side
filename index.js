require('dotenv').config();
const express = require('express')





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000 ;



const app = express();

const cors = require('cors');





// middleware 

app.use(cors());

app.use(express.json());


// username and pass
// khaledsaifullah50956
// gM3Koz0dMH6wQn4s


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4v47x55.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



  async function run(){
    try {

        // await client.connect();


        const productCollection = client.db('productDB').collection('product')

        app.post('/product' , async(req, res)=>{

            const productDetails = req.body ;
            console.log(productDetails);
      
            const result = await productCollection.insertOne(productDetails);
            res.send(result);
          })


          app.get('/product' , async(req , res) =>{
            const cursor = productCollection.find();
      
            const result = await cursor.toArray();
      
            res.send(result);
          })

          app.get('/product/:brand_name' , async (req , res)=>{
            const brand_name = req.params.brand_name ; 
            const query = { brandName : brand_name } ;
            const result = await productCollection.find(query).toArray();
            res.send(result);
          })

          app.get('/products/:id' , async (req , res)=>{
            const id = req.params.id ; 

            const query = { _id : new ObjectId(id)};

            const result = await productCollection.findOne(query);
            res.send(result);
          })

          console.log("Pinged your deployment. You successfully connected to MongoDB!");




    }
    finally{
        // await client.close();

    }
    
  }
  run().catch(console.dir);

  app.get('/', (req, res) =>{
    res.send('brand based server is is running in the port 5000')
  })

  app.listen(port , ()=>{
    console.log(`brand based website is running on port  : ${port}` );
  })