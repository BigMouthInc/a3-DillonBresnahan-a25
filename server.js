const express = require( 'express' ),
      app = express(),
    { engine } = require('express-handlebars'),
    path = require('path'),
    hbs = require('express-handlebars').engine
    require('dotenv').config();   // loads .env into process.env

let username = ""
let password = ""


app.use( express.static( 'public' ) )
app.use( express.static( 'views'  ) )

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.engine('engine', hbs())
app.set('view engine', 'handlebars')
app.set('views', '/views')

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
  const user = await collection.findOne({username : req.body.username})
  if (user){
    console.log("Username exists")
    const userAndPass = await collection.findOne({
        username : req.body.username,
        password : req.body.password  
    })
    if (userAndPass){
      res.redirect("main.html")
      username = req.body.username
      password = req.body.password 
    }
    else 
      res.render("login", {msg: "Wrong password, please try again", layout : false})
  }
  else {
    const document = {username : req.body.username, password : req.body.password}
    await collection.insertOne(document)
    res.render("login", {msg: "Account has been created, please login in again to access your account.", layout : false})
  }
});


app.get("/docs", async (req, res) => {
    if (collection !== null) {
        const docs = await collection.find({}).toArray()
        res.json( docs )
    }
})

app.get("/table", async (req, res)=> {
  const data = await collection.findOne({
    username : username,
    password : password 
  })
  res.end(JSON.stringify(data));
})

app.get('/fields', async (req, res) =>{
 const doc = await collection.findOne({username : username})
  const fields = Object.keys(doc)
  res.end(JSON.stringify(fields));
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
    console.log(req.body)
    const field = req.body.field
    const toAdd = req.body.toAdd
    const result = await collection.updateOne( {username : username},
                                                {$set: {[field] : toAdd}}
     );
    res.json( result )
})

app.post( '/remove', async (req,res) => {
    console.log(req.body)
    const field = req.body.field
    const doc = await collection.findOne({username : username})
    const allFields = Object.keys(doc)
    if (!allFields.includes(field)){
      res.status(400).json({success : false})
      return;
    }
    else{
    const result = await collection.updateOne( {username : username},
                                                {$unset: {[field] : ""}}
     );
    res.status(200).json({success : true})
    }
})

app.post( '/update', async (req,res) => {
    console.log(req.body)
    const field = req.body.field
    const toUpdate = req.body.toUpdate
    const doc = await collection.findOne({username : username})
    const allFields = Object.keys(doc)
    if (!allFields.includes(field)){
      res.status(400).json({success : false})
      return;
    }
    else{
    const result = await collection.updateOne( {username : username},
                                                {$set: {[field] : toUpdate}}
     );
    res.status(200).json({success : true})
    }
})


run().catch(console.dir);

app.listen( process.env.PORT || 3000)	
