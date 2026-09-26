import { getReceiverSocketId, io } from '../socket/socket.js';
import { Conversation } from '../models/conversation.js';
import {Message} from '../models/message.js';

export const sendmessage=async (req,res)=>{
    try {
       const senderId=req.id;
       const receiverId=req.params.id;
       const {textmessage:message}=req.body;
       const newmessage=await Message.create({
       senderId,
       receiverId,
        message
       })
       let conversation =await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
       });
       if(!conversation){
         conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
       }
       if(newmessage){
        conversation.message.push(newmessage._id);

       }
       
       await Promise.all([conversation.save(),newmessage.save()]);
       const getreceiverid=getReceiverSocketId(receiverId);
       if(getreceiverid){
        io.to(getreceiverid).emit('newmessage',newmessage);
       }
       return res.status(200).json({
        success:true,
        newmessage
       })
    } catch (error) {
        console.log(error);
    }
}

export const getmessages=async (req,res)=>{
    try {
        const senderId=req.id;
        const receiverId=req.params.id;
        const convo=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate({
            path:'message'
        })
        if(!convo){
            return res.status(200).json({
                success:true,
                message:[]
            })
        }
        return res.status(201).json({
            message:convo?.message,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}