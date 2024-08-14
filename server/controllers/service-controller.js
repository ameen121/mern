const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find()
        if(!response){
            res.status(404).json({ message: "services not found" });
        }
        return res.status(200).json({ message: response });  
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" });
    }
}
module.exports = services;