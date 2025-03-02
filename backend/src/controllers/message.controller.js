import User from "../models/user.model.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: req.user._id}}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
