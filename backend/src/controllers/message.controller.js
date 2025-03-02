import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: req.user._id}}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {id: recieverId} = req.params;
        const {text, image} = req.body;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId: recieverId,
            text,
            image: imageUrl,
        })
        await newMessage.save();

        //todo emit event to socket

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
