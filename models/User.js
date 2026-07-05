import mongoose from "mongoose";
const {Schema , model} = mongoose 
const UserSchema = new Schema({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String},
    profilepicture:{type:String},
    Coverpicture:{type:String},
    createdAt:{type:Date,default:Date.now},
    stripeid:{type:String},
    stripesecret:{type:String},
    updatedAt:{type:Date,default:Date.now},
})

export default mongoose.models.User || model("User", UserSchema);;