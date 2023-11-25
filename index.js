const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vs2xadg.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    const database = client.db("CarGladge-DB");
    const Brand_Category = database.collection("Brand_Category");
    const Product_Category = database.collection("Product_info");
    
    // get 6 brand category item from database
    app.get('/categoryitem', async(req, res)=> {
       const cursor = Brand_Category.find();
       const result = await cursor.toArray();
       res.send(result);
    })


    // load product from each brand
    app.get('/brandproducts', async(req, res)=> {
      const cursor = Product_Category.find();
      const result = await cursor.toArray();
      res.send(result);
   })

  // load a specific data based on Brand name
  app.get('/brandproducts/:brand_name', async(req, res)=> {
    const cursor = Product_Category.find();
    const result = await cursor.toArray();
    res.send(result);
 })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('CarGladge server is running')
})

app.listen(port, () => {
  console.log(`CarGladge app listening on port ${port}`)
})