const express = require("express");
const router = express.Router();
const {
  createProposal,
  getAllProposals,
  updateProposal,
  deleteProposal,
} = require("../controlleurs/proposal.controlleur");

/**
 * @swagger
 * tags:
 *   name: Proposals
 *   description: Endpoints pour la gestion des propositions d'expédition
 */

/**
 * @swagger
 * /proposals:
 *   get:
 *     summary: Récupérer toutes les propositions d'expédition
 *     tags: [Proposals]
 *     responses:
 *       200:
 *         description: Liste des propositions d'expédition récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération des propositions d'expédition
 */
router.get("/proposals", getAllProposals);

/**
 * @swagger
 * /proposals/{userId}:
 *   post:
 *     summary: Créer une nouvelle proposition d'expédition
 *     tags: [Proposals]
 *     parameters:
 *       - in: body
 *         name: proposal
 *         description: Les détails de la proposition d'expédition à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             departure_location:
 *               type: string
 *             arrival_location:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             ReceiverData:
 *               type: object
 *             SenderData:
 *               type: object
 *     responses:
 *       201:
 *         description: Proposition d'expédition créée avec succès
 *       500:
 *         description: Erreur serveur lors de la création de la proposition d'expédition
 */
router.post("/proposals/:userId", createProposal);

/**
 * @swagger
 * /proposals/{userId}/{proposalId}:
 *   put:
 *     summary: Mettre à jour une proposition d'expédition
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: proposalId
 *         required: true
 *         description: ID de la proposition d'expédition à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proposition d'expédition mise à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la proposition d'expédition
 */
router.put("/proposals/:userId/:proposalId", updateProposal);

/**
 * @swagger
 * /proposals/{proposalId}:
 *   delete:
 *     summary: Supprimer une proposition d'expédition
 *     tags: [Proposals]
 *     parameters:
 *       - in: path
 *         name: proposalId
 *         required: true
 *         description: ID de la proposition d'expédition à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proposition d'expédition supprimée avec succès
 *       500:
 *         description: Erreur serveur lors de la suppression de la proposition d'expédition
 */
router.delete("/proposals/:proposalId", deleteProposal);

module.exports = router;
