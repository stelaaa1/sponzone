//the reason to create model is to create Schema of db
//and help us to manage data flow

const mongoose=require('mongoose')
//creating newUser schema
//The UserSchema object defines the structure and validation rules for the user data.
const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    //has to be unique-true
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    password:{type:String,required:true}
},//specify  collection name as users,default:dynamic
{collection:'users'}
)

//register userSchema as an model in mongoose
//registering allows us to perform CRUD on the collections
//"nameofcollection" -should be in sigular form
const Model=mongoose.model('User',UserSchema)

module.exports=Model;

//If there is a issue with duplicate value enter in the db on UserName
//use mongoose  dropIndex() and check online
//and if duplicate values are acepted then drop the db in Compass
//and restart the client 