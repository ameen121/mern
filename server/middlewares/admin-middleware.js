const AdminMiddleware = async (req, res, next) => {
        try {
            const AdminRole = req.user.isAdmin;
            //console.log()
            if (!AdminRole) {
                return res.status(403).json({ message: "Access Denied. User is not an Admin" });
            }
            next();
        } catch (error) {
            next(error);
        }
}
module.exports = AdminMiddleware