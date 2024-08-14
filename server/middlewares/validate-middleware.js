const validate = (Schema) => async (req, res, next) => {
    try {
        const parsebody = await Schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {
        // console.log(message);
        // res.status(400).json({ msg: message })
        const status  = 422;
        const message = "Filed message properly";
        const extraDetail = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetail,
        }
        next(error);
    }
}
module.exports = validate;