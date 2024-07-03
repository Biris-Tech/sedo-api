const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controlleurs/order.controlleur");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints pour la gestion des commandes de livraison
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupérer toutes les commandes de livraison
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Liste des commandes de livraison récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération des commandes de livraison
 */
router.get("/orders", getAllOrders);

/**
 * @swagger
 * /orders/{deliveryDriverId}/{shippingProposalId}/{transportationTypeId}:
 *   post:
 *     summary: Créer une nouvelle commande de livraison
 *     tags: [Orders]
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Les détails de la commande de livraison à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             status:
 *               type: string
 *     responses:
 *       201:
 *         description: Commande de livraison créée avec succès
 *       500:
 *         description: Erreur serveur lors de la création de la commande de livraison
 */
router.post("/orders/:deliveryDriverId/:shippingProposalId/:transportationTypeId", createOrder);

/**
 * @swagger
 * /orders/{orderId}/{deliveryDriverId}/{shippingProposalId}/{transportationTypeId}:
 *   put:
 *     summary: Mettre à jour une commande de livraison
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID de la commande de livraison à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande de livraison mise à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la commande de livraison
 */
router.put("/orders/:orderId/:deliveryDriverId/:shippingProposalId/:transportationTypeId", updateOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Supprimer une commande de livraison
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID de la commande de livraison à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande de livraison supprimée avec succès
 *       500:
 *         description: Erreur serveur lors de la suppression de la commande de livraison
 */
router.delete("/orders/:orderId", deleteOrder);

module.exports = router;
