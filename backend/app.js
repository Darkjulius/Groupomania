const express = require('express');
const models = require("./models");
const path = require("path");
const helmet = require("helmet");
const userRoutes = require("./routes/user");
const postArticles = require("./routes/article");
const commentArticles = require("./routes/comment");

const app = express();


//Configuration des en-têtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Contrôle de la connexion à la base de données.
const db = async function () {
    try {
        await models.sequelize.authenticate();
        console.log("Connexion à la base de données avec succès");
    }
    catch (err) {
        console.error("Connexion à la base de données impossible", err);
    }
};
db();

//Mise à jour de la base de données.
models.sequelize
    .sync({ force: false })//Modifier à true si je dois modifier les models ou les associations.
    .then(() => console.log("Mise à jour de la base effectuée !!!"))
    .catch((err) => console.log("Mise à jour non effectuée !!!", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/groupomania/users", userRoutes);
app.use("/groupomania/articles", postArticles);
app.use("/groupomania/comments", commentArticles);

module.exports = app;