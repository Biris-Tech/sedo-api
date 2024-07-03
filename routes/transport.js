const express = require("express");
const router = express.Router();
const {
  getAllTransportType,
  createTransportType,
  updateTransportType,
  deleteTransportType,
} = require("../controlleurs/transport.controlleur");

/**
 * @swagger
 * tags:
 *   name: Transport Types
 *   description: Endpoints pour la gestion des types de transport
 */

/**
 * @swagger
 * /transport-types:
 *   get:
 *     summary: Récupérer tous les types de transport
 *     tags: [Transport Types]
 *     responses:
 *       200:
 *         description: Liste des types de transport récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération des types de transport
 */
router.get("/transport-types", getAllTransportType);

/**
 * @swagger
 * /transport-types:
 *   post:
 *     summary: Créer un nouveau type de transport
 *     tags: [Transport Types]
 *     parameters:
 *       - in: body
 *         name: transportType
 *         description: Les détails du nouveau type de transport à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       201:
 *         description: Type de transport créé avec succès
 *       500:
 *         description: Erreur serveur lors de la création du type de transport
 */
router.post("/transport-types", createTransportType);

/**
 * @swagger
 * /transport-types/{TransportTypeId}:
 *   put:
 *     summary: Mettre à jour un type de transport
 *     tags: [Transport Types]
 *     parameters:
 *       - in: path
 *         name: TransportTypeId
 *         required: true
 *         description: ID du type de transport à mettre à jour
 *         schema:
 *           type: string
 *       - in: body
 *         name: transportType
 *         description: Les détails mis à jour du type de transport
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Type de transport mis à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour du type de transport
 */
router.put("/transport-types/:TransportTypeId", updateTransportType);

/**
 * @swagger
 * /transport-types/{TransportTypeId}:
 *   delete:
 *     summary: Supprimer un type de transport
 *     tags: [Transport Types]
 *     parameters:
 *       - in: path
 *         name: TransportTypeId
 *         required: true
 *         description: ID du type de transport à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Type de transport supprimé avec succès
 *       500:
 *         description: Erreur serveur lors de la suppression du type de transport
 */
router.delete("/transport-types/:TransportTypeId", deleteTransportType);

module.exports = router;
