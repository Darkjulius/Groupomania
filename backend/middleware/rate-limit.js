const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // Durée de blocage du compte
    max: 5, //5 tentatives de connexion autorisées à partir de la même IP avant d'être bloqué pendant 10 minutes.
    message:
        "Nous avons constaté de nombreuses tentatives de connexion, cette IP est bloquée durant 10 minutes",
});
module.exports = { limiter }; // Le module doit s'exporter sous forme d'objet
