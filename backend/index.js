import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./util/db.js";

import userroute from "./routes/user.routes.js";
import postroute from "./routes/post.routes.js";
import { app,server } from "./socket/socket.js";
import messageroute from "./routes/message.routes.js"
import path from "path";

dotenv.config({});
const port=process.env.PORT || 8000;

app.get("/",(req,res)=>{
return res.status(200).json({
    message:"heloo everyone",
    success:true
})
})
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/frontend/dist")));
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.use("/api/v1/user",userroute);
app.use("/api/v1/post",postroute);
app.use("/api/v1/message",messageroute);
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});

server.listen(port,()=>{
connectdb();
    console.log(`Server is running at ${port}`);
    
})
