const jwt = require("jsonwebtoken");
require('dotenv').config();
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const isAdmin = decodedToken.isAdmin;
        if (isAdmin !== true) {
            throw "INTERDIT, vous n'êtes pas administrateur !!!";
        } else {
            req.isAdmin = isAdmin;
            next();
        }
    } catch {
        res.status(401).json({
            error: "Authentification nécessaire !",
        });
    }
};