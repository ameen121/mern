const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {

    const token = req.headers["authorization"];
    //console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized HTTP, Token Not Found" });
        }
      const jwtToken = token.replace("Bearer", "").trim();
        try {
            const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
            //console.log('isVerified=>',isVerified);
            const userData   = await User.findOne({ email: isVerified.email }).select({'password': 0});
            req.user         = userData;
            req.token        = token;
            req.userID       = userData._id;
            next();    
        } catch (error) {
            console.log('catch error', error);
            return res.status(401).json({ message: error });
        }

}
module.exports = authMiddleware;