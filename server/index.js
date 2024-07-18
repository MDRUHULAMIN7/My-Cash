const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// mongdb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aymctjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
   // datbase collections
   const datbase = client.db("MyCash");
   const usersCollection = datbase.collection('users')
   const cashinCollection = datbase.collection('cashin')
   const transitionsCollection = datbase.collection('transitions')


      // create jwt token 
      app.post('/jwt',async(req,res)=>{
        const user = req.body;
        console.log(user);
        const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '1d'
        })
      
    
        res.send({token})
     
    })


    // verify and create token

const verifyToken =(req,res,next)=>{
    const token =req.headers.authorization;
    console.log("back",token);
      if(!req.headers.authorization){
          return res.status(401).send({Message:"forbidean access"})
      }

      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).send({Message:"forbiden access"})
        }
          console.log( "decoded", decoded);
          console.log( "err", err);
        req.decoded = decoded
        next()
    })
}
 

//  create user

app.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const saltRounds = 4;
        const plainPassword = user.pin;

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        user.pin = hashedPassword; // Store the hashed password in the user object

        // Check if the user already exists
        const query = { email: user.email };
        const isExist = await usersCollection.findOne(query);
        if (isExist) {
            return res.status(400).send({ message: 'User already exists!' });
        }
        const query2 = { mobile: user.mobile};
        const isExist2 = await usersCollection.findOne(query2);
        if (isExist2) {
            return res.status(400).send({ message: 'User already exists!' });
        }

        // Insert the new user into the database
        const result = await usersCollection.insertOne(user);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while processing your request.' });
    }
});


   // get a user data

   app.get('/user/:email',async(req,res)=>{
    const email = req.params.email;
    const query={email : email}
    const result = await usersCollection.findOne(query)
    res.send(result)
  })
   // get login user data

   app.post('/loginuser',async(req,res)=>{
    const userInfo = req.body;
    const query={email : userInfo.email}
    const result = await usersCollection.findOne(query)
    if(!result){
       return res.send({message:"no account yet"})   
    }  
    const isMatch = await bcrypt.compare(userInfo.pin,result.pin);
        if (!isMatch) {
            console.log('Password is not correct!');
            res.send({message:"wrong pin"})
            return true; // Password is correct
           
        } else {
            console.log('Password is correct!');
            console.log(result);
            res.send(result)
            
            return false; // Password is correct
        }

    
 
    
        
    
    

  })
  

  // get all users

  app.get("/allusers",async(req,res)=>{
    const result = await usersCollection.find().toArray()
    res.send(result)
  })
  // update user status

  app.patch('/userverify/:id',async (req,res)=>{
    const updateroll =req.body.updatestatus;
    const amount =req.body.updateamount
    if(updateroll ==="verified"){
      const id = req.params.id;
      const query ={_id: new ObjectId(id)}
      const  updateDoc ={
        $set:{
          status:updateroll, 
         balance:amount,
        }
       }
       const result = await usersCollection.updateOne(query,updateDoc);
       res.send(result)
    }
   else{
    const id = req.params.id;
    const query ={_id: new ObjectId(id)}
    const  updateDoc ={
      $set:{
        status:updateroll, 
      
      }
     }
     const result = await usersCollection.updateOne(query,updateDoc);
     res.send(result)
   }
 
    // console.log(updateroll,id);
  })

  // update user roll
  app.patch('/userupdateroll/:id',async (req,res)=>{
    const updateroll =req.body.updateroll;
    console.log(updateroll);
  
   
    const id = req.params.id;
    const query ={_id: new ObjectId(id)}
    const  updateDoc ={
      $set:{
        roll:updateroll, 
      
      }
     }
     const result = await usersCollection.updateOne(query,updateDoc);
     res.send(result)

  })
  
  // cashin post

  app.post("/cashin",verifyToken,async(req,res)=>{
    const cashinInfo=req.body;
    console.log(cashinInfo,"server from");
    const query = {email:cashinInfo.email}
    const user=await usersCollection.findOne(query)
    const isMatch = await bcrypt.compare(cashinInfo.cashinpin,user.pin);
        if (!isMatch) {
            res.send({message:"wrong pin"})
            return ; 
           
        } 
    const result= await cashinCollection.insertOne(cashinInfo)
    res.send(result)
    
  })

  // get cashin  

  app.get("/cashin",verifyToken,async(req,res)=>{

    const result = await cashinCollection.find().toArray()
    res.send(result)
  })

    // approved cashin
    app.patch('/approvecashin/:mobile',verifyToken,async (req,res)=>{
      const mobile=req.params.mobile
      const  cashinamount=req.body.cashinamount
      const agentnumber=req.body.agentnumber
      const id = req.body.statusId
      const query={mobile: mobile}
      console.log(query);
      const user = await usersCollection.findOne(query)
      const query3 = {_id:new ObjectId(id)}
      console.log(query3);
      const updateDoc3={
        $set:{
          cashinstatus:"approved"
        }
      }
      const result3 = await cashinCollection.updateOne(query3,updateDoc3)
      console.log(result3);
      const  updateDoc ={
         $set:{
          balance:user.balance + cashinamount
         }
      }
      const query2={mobile: agentnumber}
      const user2 = await usersCollection.findOne(query2)
      const  updateDoc2 ={
         $set:{
          balance:user2.balance - cashinamount
         }
      }

      const result= await usersCollection.updateOne(query,updateDoc);
      const result2 = await usersCollection.updateOne(query2,updateDoc2);

      const history ={
        username:user?.name,
        mobile:user?.mobile,
        agentnumber:agentnumber,
        type:"cashin",
        amount:cashinamount,
        time:new Date()
      }
      const result4=await transitionsCollection.insertOne(history)

      res.send([result,result2,result3,result4])
      // res.send(result2)
     
    
  
    })
    // approved cashout
    app.patch('/approvecashout/:mobile',verifyToken,async (req,res)=>{
      const mobile=req.params.mobile
      const info = req.body
      const  cashoutamount=req.body.cashoutamount
      const agentnumber=req.body.agentnumber
      const totalamount=req.body.totalamount
      const charge=parseInt(req.body.charge)
      const id = req.body.statusId

      const query={mobile: mobile}
      const user = await usersCollection.findOne(query)
      const  updateDoc ={
        $set:{
         balance:user.balance - totalamount
        }
     }
     const query2={mobile: agentnumber}
     const user2 = await usersCollection.findOne(query2)
     const  updateDoc2 ={
        $set:{
         balance:parseInt(user2.balance) + cashoutamount
        }
     }


      const query3 = {_id:new ObjectId(id)}
      const updateDoc3={
        $set:{
          cashoutstatus:"approved"
        }
      }
     
     
      const query5 = {roll : "company"}
      let companys = await usersCollection.findOne(query5);
      

      const updateDoc5={
        $set:{
          balance:companys.balance + charge
        }
      }
      
      const history ={
        username:user?.name,
        mobile:user?.mobile,
        agentnumber:agentnumber,
        type:"cashout",
        amount:totalamount,
        time:new Date()
      }
     
      const result= await usersCollection.updateOne(query,updateDoc);
      const result2 = await usersCollection.updateOne(query2,updateDoc2);
      const result3 = await cashinCollection.updateOne(query3,updateDoc3)
      const result4=await transitionsCollection.insertOne(history)
      const result5= await usersCollection.updateOne(query5,updateDoc5)

      res.send([result,result2,result3,result4,result5 ])
 
     
    
  
    })

    // get agent transition history
    app.get("/agent-transition/:email",verifyToken,async(req,res)=>{
      const email = req.params.email;
      const query ={email:email}
      const user = await usersCollection.findOne(query)
      const number = user.mobile;
      const query2={agentnumber:number}
      const result = await transitionsCollection.find(query2).toArray()
      res.send(result)
    })
    // get user transition history
    app.get("/user-transition/:email",verifyToken,async(req,res)=>{
      const email = req.params.email;
      const query ={email:email}
      const user = await usersCollection.findOne(query)
      const number = user.mobile;
      const query2={mobile:number}
      const result = await transitionsCollection.find(query2).toArray()
      res.send(result)
    })

    // send money 
    app.post("/sendmoney",async(req,res)=>{
      const SendInfo = req.body;
      const query={mobile:SendInfo.mobile}
      const user= await usersCollection.findOne(query)
      const isMatch = await bcrypt.compare(SendInfo.pin,user.pin);
      if (!isMatch) {
          res.send({message:"wrong pin"})
          return ; 
      } 
      const updateDoc={
        $set:{
          balance:user.balance-SendInfo.totalamount
        }
      }
      const result1 = await usersCollection.updateOne(query,updateDoc)

      if(result1){
        const query2={mobile:SendInfo.sentnumber}
        const sentuser= await usersCollection.findOne(query2)
        const updateDoc2={
          $set:{
            balance:sentuser.balance+SendInfo.amount
          }
        }
        var result2 = await usersCollection.updateOne(query2,updateDoc2)

        if(updateDoc2){

          const query3={roll: "company"}
        const admin= await usersCollection.findOne(query3)
        const updateDoc3={
          $set:{
            balance:admin.balance+SendInfo.charge
          }
        }
       
        
        var result3 = await usersCollection.updateOne(query3,updateDoc3)

        }
        
      }
     

      const history={
        username:user.name,
        mobile:SendInfo.mobile,
        sentnumber:SendInfo.sentnumber,
        amount: SendInfo.totalamount,
        type:"sendmoney",
        time:new Date(),
      }
      const result4 = await transitionsCollection.insertOne(history)

      res.send([result1,result2,result3,result4]);

    })
    


    // await client.db("admin").command({ ping: 1 });
    console.log("MyCash connected MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
 
  }
}
run().catch(console.dir);


app.get( '/' ,(req,res)=>{
    res.send('Mycash server is begin ');
})
app.listen(port,()=>{
    console.log(`mycash is running on:${port}`);
})