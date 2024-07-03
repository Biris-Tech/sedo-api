const express = require("express");
const router = express.Router();

const authCtrl = require("../controlleurs/auth.controlleur");

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Routes liées à l'authentification des utilisateurs
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       description: Informations d'inscription de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               surname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       '200':
 *         description: Succès - Utilisateur inscrit avec succès.
 *       '400':
 *         description: Requête invalide - Données déjà utilisées.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de l'inscription de l'utilisateur.
 */
router.post("/signup", authCtrl.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       description: Informations de connexion de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       '200':
 *         description: Succès - Utilisateur connecté avec succès.
 *       '400':
 *         description: Requête invalide - Le corps de la requête est mal formé ou manque des informations requises.
 *       '401':
 *         description: Non autorisé - Les informations de connexion sont incorrectes.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de la connexion de l'utilisateur.
 */
router.post("/login", authCtrl.login);
/**
 * @swagger
 * /verifyOtp/{userId}:
 *   post:
 *     summary: Vérifie le code OTP pour l'utilisateur spécifié.
 *     tags: [Authentification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à vérifier.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeOfVerification:
 *                 type: string
 *                 enum: [email, phone]
 *                 example: email
 *               code:
 *                 type: string
 *                 example: 1234
 *             required: [typeOfVerification, code]   # étoiles ici pour indiquer les éléments obligatoires
 *     responses:
 *       '200':
 *         description: Code OTP vérifié avec succès.
 *       '400':
 *         description: Code incorrect ou type de vérification non valide.
 *       '404':
 *         description: Utilisateur non trouvé.
 *       '500':
 *         description: Une erreur s'est produite lors de la vérification du code OTP.
 */
router.post("/verifyOtp/:userId", authCtrl.verifyOtp);

/**
 * @swagger
 * /VerifyMail/{userId}:
 *   post:
 *     summary: Envoie un code OTP par e-mail pour vérification.
 *     tags: [Authentification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à vérifier.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Adresse e-mail de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toEmail:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       '200':
 *         description: Succès - Code OTP envoyé par e-mail.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de l'envoi du code OTP par e-mail.
 */
router.post("/VerifyMail/:userId", authCtrl.sendOtpByEmail);


/**
 * @swagger
 * /VerifyPhone/{userId}:
 *   post:
 *     summary: Envoie un code OTP par SMS pour vérification.
 *     tags: [Authentification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à vérifier.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Numéro de téléphone de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toNumber:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       '200':
 *         description: Succès - Code OTP envoyé par SMS.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de l'envoi du code OTP par SMS.
 */
router.post("/VerifyPhone/:userId", authCtrl.sendOtpByPhone);

module.exports = router;
