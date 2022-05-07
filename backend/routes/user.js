const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/auth-admin");

const userCtrl = require("../controllers/user");
const validMail = require("../middleware/valid-email");
const validPwd = require("../middleware/valid-password");
const max = require('../middleware/rate-limit');

router.post("/auth/signup", validMail, validPwd, userCtrl.signup);    //Création d'un compte utilisateur.
router.post("/auth/login", validMail, validPwd, max.limiter, userCtrl.login);   //Connexion d'un compte utilisateur existant.
router.get("/accounts/:id", auth, userCtrl.getOneUser); //Récupération des informations d'un compte utilisateur.
router.get("/accounts", auth, userCtrl.getAllUsers);    //Récupération des informations de tous les comptes utilisateurs.
router.put("/accounts/:id", validMail, auth, userCtrl.modifyUser);  //Mise à jour d'un compte utilisateur.
router.delete("/accounts/:id", auth, userCtrl.deleteUser); //Suppression complète d'un compte utilisateur.
router.delete("/admin/:id", authAdmin, userCtrl.deleteUserAdmin);   //Suppression complète d'un compte utilisateur par l'administrateur.

module.exports = router;