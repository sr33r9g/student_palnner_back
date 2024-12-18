import  express from "express";
import dotenv from "dotenv";
import authRoutes  from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js"
import connectToMongoDB from"./db/connectToMongoDB.js"
dotenv.config();
const app=express();
const PORT=5000;
app.use(express.json()) 
app.use("/api/auth",authRoutes)
app.use("/api/todo",todoRoutes)
 //to pass incomeing request with JSON playloads
//app.get("/",(req,res)=>{
  // res.send("hellow world");
//})


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
});