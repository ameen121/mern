const User    = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (!users && users.length === 0) {
            return res.status(404).json({ message: "users not found" });
        }
       return res.status(200).json({ message: users });
    } catch (error) {
        next(error);
    }
}
const getAllContact = async (req, res) => {
    try {
        const contact = await Contact.find();
        if (!contact && contact.length === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }
       return res.status(200).json({ message: contact });
    } catch (error) {
        next(error);
    }
}

// delete single user
const deleteUserByID = async (req, res) => {
    const id = req.params.id;
    try {
      await User.deleteOne({_id:id});
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}
// delete single user
const deleteContactByID = async (req, res) => {
    const id = req.params.id;
    try {
     const data =  await Contact.deleteOne({_id:id});
     if(!data){
        return res.status(404).json({ message: "Contact not found" });
     } else {
        return res.status(200).json({ message: "Contact deleted successfully" });   
     }
    } catch (error) {
        next(error);
    }
}
// get user data by ID
const getUserByID = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await User.findOne({_id:id},{password:0});
      console.log('data=>',data);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
// update user by ID
const updateUserByID = async (req, res) => {
    try {
        const id              = req.params.id;
        const updatedUserData = req.body;
        const updatedData     = await User.updateOne({_id:id},{$set:updatedUserData});
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}
module.exports =  {getAllUsers, getAllContact, deleteUserByID,getUserByID,updateUserByID,deleteContactByID}; 