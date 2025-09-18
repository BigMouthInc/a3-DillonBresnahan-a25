const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      app = express(),
    { engine } = require('express-handlebars'),
    path = require('path'),
    dreams = []
    require('dotenv').config();   // loads .env into process.env


app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.post( '/submit', (req, res) => {
      dreams.push( req.body.newdream )
      res.writeHead( 200, { 'Content-Type': 'application/json' })
      res.end( JSON.stringify( dreams ) )
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=WebwareA3`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null

async function run() {
  try {
    await client.connect();  
    collection = client.db("a3Data").collection("users");
    // Send a ping to confirm a successful connection
    await client.db("a3Data").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
 } catch (err){
  console.log("error : ", err)
 }
}

app.post('/login', async(req, res) => {
  console.log(req.body.username)
  const user = await collection.findOne({username : req.body.username})
  console.log(user)
  if (user){
    console.log("Username exists")
  }
  else {
    console.log("Doesn't exists")
  }

});


app.get("/docs", async (req, res) => {
    if (collection !== null) {
        const docs = await collection.find({}).toArray()
        res.json( docs )
    }
})

// Handlebars setup
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// GET / → login page
app.get('/', (req, res) => {
  res.render('login', { msg: null, layout: false })
})

app.use( (req,res,next) => {
    if( collection !== null ) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

app.post( '/add', async (req,res) => {
    const result = await collection.insertOne( req.body )
    res.json( result )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', async (req,res) => {
    const result = await collection.deleteOne({ 
        _id:new ObjectId( req.body._id ) 
    })
  
    res.json( result )
})

app.post( '/update', async (req,res) => {
    const result = await collection.updateOne(
        { _id: new ObjectId( req.body._id ) },
        { $set:{ name:req.body.name } }
    )

    res.json( result )
})

run().catch(console.dir);

app.listen( process.env.PORT || 3000)	
