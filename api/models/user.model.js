import mongoose from 'mongoose';
//to hash the password

 //creating the schema
 const userSchema=new mongoose.Schema({
     username:{
      type:String,
      required:true,
      unique:true,
     },
      email:{
      type:String,
      required:true,
      unique:true,
     },
      password:{
      type:String,
      required:true,
       
     },
     avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfV4lINMSjHbHnFAx5GgmR9z3phuscD1Bzy3UAvvsPTXRa_fEMm3sO6rU&s"
     },
    },{timestamps:true});
    const User=mongoose.model('User',userSchema)
    export default User;

 