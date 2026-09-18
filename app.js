const {MongoClient, ObjectId}=require("mongodb")
const url = ("mongodb://localhost:27017")
const client= new MongoClient(url)
const dbName= "task-1"
async function main() {
    try {
        await client.connect()
        console.log("Connected to DB  successfully!!!!!!");
        const db=client.db(dbName)
        const users=db.collection("users")
        const result= await users.insertOne({
            name : "amina",
            age: 22,
            city: "cairo"}
    )

        console.log("inserted dodument id : " ,result.insertedId);
        //////////////////////////////
        const adduser= await users.insertOne({
            name : "mostafa",
            age: 12,
            city: "america"}
    )

        console.log("inserted dodument id : " ,adduser.insertedId);
        
//  await  addUsers(users)

 await findUser(users,"6aad710e90c0d2ca3ddaa3b9")


 await  countUser(users) 

  await limitUsers(users) 
await updateUser(users,"6aad710e90c0d2ca3ddaa3b5") 

 await  updeteManyUser(users)



 await deletedUser(users,"6aad710e90c0d2ca3ddaa3b8")
 await  deletedManyUser(users)
  
    }


    catch(err){
    console.log(err)
}
    
}
main()

async function addUsers(users) {
     const result= await users.insertMany([
          {
            name : "hamza",
            age: 27,
            city: "gaza"
          }  ,
          {
            name : "omar",
            age: 22,
            city: "alex"
          },
          {name : "Alii",
            age: 22,
            city: "Menoufia"
        },
          {name : "Asem",
            age: 25,
            city: "Menoufia"
        },
        {
             name : "amina",
            age: 22,
            city: "gaza"
          
        },
        {
            name : "hamza",
            age: 27,
            city: "gaza"
          }  ,
          {
            name : "ammar",
            age: 27,
            city: "gaza"
          }  ,
            {
            name : "mohamed",
            age: 27,
            city: "gaza"
          }  ,
            {
            name : "moaz",
            age: 27,
            city: "gaza"
          }  ,
            {
            name : "hamza",
            age: 32,
            city: "gaza"
          }  
        ])
    console.log("many data inserted",result.insertedCount);
    
}
async function findUser(users,id) {
    const user= await users.findOne({_id:new ObjectId (id)})
    if (user){
        console.log("find user",user);
        
    }
    else {
        console.log("not founded");
        
    }
}

//////////////////////count/////////
async function countUser(users) {
    const count= await users.countDocuments({age:27})
    console.log("users with same age ::",count);
    
    
}
////////////////////////

async function limitUsers(users) {
    const result= await users.find({age:27}).limit(3).toArray()
    console.log("limited users is ::" ,result)
}
//////////////////////////////
async function updateUser(users,id) {
    const  updetedd = await users.updateOne(
        {_id: new ObjectId(id)},
        {
            $set:{name:"marwan"},
            $inc:{age:40}
}
    
    )
    console.log(":modified data is ::"  , updetedd.modifiedCount)
    
    
}
/////////////////////
async function updeteManyUser(users) {
    const result=await users.updateMany(
        {},
        {
            $inc:{age:5}
        }
    )
    console.log("updeted many date ::" ,result.modifiedCount);
    
    
}
////////////////////////////////
async function deletedUser(users,id) {
    const result =await users.deleteOne(
        {_id  : new ObjectId(id)}
    )
    console.log("deleted docs:"  , result.deletedCount ,"user deleted id is", id)
    
}
async function deletedManyUser(users) {
    const result = await users.deleteMany(
        {
            name:"amina"
        }
    )
    console.log("deleted many item::" ,result.deletedCount , "users with name amina is deleted");
    
    
}