const express = require('express')

const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000 ;

// middleware 

app.use(cors());

app.use(express.json());









app.get('/' , (req,res)=>{
    res.send('brand based server is running in the port 5000')
})

app.listen(port , () =>{
    console.log(`brand based website is running on port : ${port}`);
})