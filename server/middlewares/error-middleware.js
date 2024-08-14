const errorMiddleware = (err, req, res, next) => {
    const status      = err.status || 500;
    const message     = err.message || "Backend Error";
    const extraDetail = err.extraDetail || "Error From Backend";

    return res.status(status).json({ message, extraDetail });
};
module.exports = errorMiddleware;