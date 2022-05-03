const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { user } = require("../configuration/config");
const db = require("../models");
require('dotenv').config();

//Création de nouveaux utilisateurs.
exports.signup = (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //Contrôle que tous les champs du formulaire d'inscription soient saisis.
    if (firstname === null || firstname === "" || lastname === null || lastname === "" || username === null || username === "" || email === null || email === "" || password === null || password === "") {
        return res.status(400).json({ "error": "Veuillez remplir l'ensemble des champs du formulaire" });
    }

    //Contrôle que l'utilisateur qui souhaite se créer n'est pas déjà présent en BDD.
    db.User.findOne({
        attributes: ["email"],
        where: { email: email }
    })
        .then(valid => {
            if (!valid) {
                bcrypt.hash(password, 10)
                    .then((hash) => {
                        db.User.create({
                            firstname: firstname,
                            lastname: lastname,
                            username: username,
                            email: email,
                            password: hash,
                            isAdmin: 0
                        })
                            .then(() => res.status(201).json({ "message": "Le compte utilisateur a été créé !!!" }))
                            .catch(() => res.status(400).json({ "error": "Le compte utilisateur n'a pas été créé !!!" }));
                    })
                    .catch(() => res.status(500).json({ "error": "Impossible de créer le compte utilisateur !!!" }));
            } else {
                return res.status(404).json({ "error": "Le compte utilisateur est déjà existant en BDD !!!" });
            }
        })
        .catch(() => res.status(500).json({ "error": "Une erreur est survenue !!!" }));
};

//Connexion d'un compte utilisateur
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ "error": "Le mot de passe saisi est incorrect !!!" });
                        }
                        res.status(200).json({
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            username: user.username,
                            token: jwt.sign(
                                { userId: user.id },
                                process.env.SECRET_TOKEN,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(() => res.status(500).json({ "error": "Impossible de se connecter !!!" }));
            } else {
                return res.status(404).json({ "error": "Le compteur utilisateur n'existe pas. Veuillez-créer un compte afin de pouvoir vous connecter !!! " });
            }
        })
        .catch(error => res.status(500).json({ "error": "Une erreur est survenue !!!" }));
};

//Afficher la liste de tous les comptes présents en BDD
exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        attributes: ["firstname", "lastname", "username", "email", "isAdmin"]
    })
        .then(users => {
            console.log(users);
            res.status(200).json({ users });
        })
        .catch(() => res.status(404).json({ "error": "Impossible de récupérer la liste des comptes utilisateurs !!!" }));
};

//Afficher les informations d'un compte utilisateur via son id
exports.getOneUser = (req, res, next) => {
    db.User.findOne({
        attributes: ["firstname", "lastname", "username", "email", "isAdmin"],
        where: { id: req.params.id }
    })
        .then(user => {
            console.log(user);
            res.status(200).json({ user });
        })
        .catch(() => res.status(404).json({ "error": "Impossible d'afficher les informations du compte utilisateur !!!" }));
}

//Modifier les informations d'un compte utilisateur
exports.modifyUser = (req, res, next) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let email = req.body.email;

    //Contrôle que tous les champs du formulaire d'inscription soient saisis.
    if (firstname === null || firstname === "" || lastname === null || lastname === "" || username === null || username === "" || email === null || email === "") {
        return res.status(400).json({ "error": "Veuillez remplir l'ensemble des champs du formulaire" });
    }

    db.User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
        .then(() => res.status(200).json({ "message": "Le compte utilisateur a été modifié !!!" }))
        .catch(() => res.status(400).json({ "error": "Impossible de modifier les informations du compte utilisateur" }));
};

//Suppression du compte utilisateur et tout ce qui lié avec
exports.deleteUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(() => {
            db.User.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ "message": "Le compte utilisateur a été supprimé !!!" }))
                .catch(() => res.status(400).json({ "error": "Le compte utilisateur n'a pas été supprimé !!!" }));
        })
        .catch(() => res.status(500).json({ "error": "Une erreur est survenue !!!" }))
};