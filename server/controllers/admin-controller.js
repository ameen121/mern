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
module.exports =  {getAllUsers, getAllContact}; 