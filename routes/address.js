const express = require("express");
const router = express.Router();
const {
  getAllAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controlleurs/recAddress.controlleur");

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Endpoints pour la gestion des adresses
 */

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Récupérer toutes les adresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: Liste des adresses récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération des adresses
 */
router.get("/addresses", getAllAddress);

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Créer une nouvelle adresse
 *     tags: [Addresses]
 *     parameters:
 *       - in: body
 *         name: address
 *         description: Les détails de l'adresse à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             AddressHistory:
 *               type: string
 *     responses:
 *       201:
 *         description: Adresse créée avec succès
 *       500:
 *         description: Erreur serveur lors de la création de l'adresse
 */
router.post("/addresses", createAddress);

/**
 * @swagger
 * /addresses/{addressId}:
 *   put:
 *     summary: Mettre à jour une adresse
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: ID de l'adresse à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adresse mise à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour de l'adresse
 */
router.put("/addresses/:addressId", updateAddress);

/**
 * @swagger
 * /addresses/{addressId}:
 *   delete:
 *     summary: Supprimer une adresse
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: ID de l'adresse à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adresse supprimée avec succès
 *       500:
 *         description: Erreur serveur lors de la suppression de l'adresse
 */
router.delete("/addresses/:addressId", deleteAddress);

module.exports = router;
