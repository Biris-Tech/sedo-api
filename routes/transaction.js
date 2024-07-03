const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controlleurs/transaction.controlleur");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Endpoints pour la gestion des transactions
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Récupérer toutes les transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Liste des transactions récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération des transactions
 */
router.get("/transactions", getAllTransactions);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Créer une nouvelle transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: body
 *         name: transaction
 *         description: Les détails de la transaction à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             status:
 *               type: string
 *             payementMethode:
 *               type: string
 *     responses:
 *       201:
 *         description: Transaction créée avec succès
 *       500:
 *         description: Erreur serveur lors de la création de la transaction
 */
router.post("/transactions", createTransaction);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   get:
 *     summary: Récupérer une transaction par son ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID de la transaction à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction récupérée avec succès
 *       500:
 *         description: Erreur serveur lors de la récupération de la transaction
 */
router.get("/transactions/:transactionId", getTransactionById);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   put:
 *     summary: Mettre à jour une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID de la transaction à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction mise à jour avec succès
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la transaction
 */
router.put("/transactions/:transactionId", updateTransaction);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   delete:
 *     summary: Supprimer une transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: ID de la transaction à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction supprimée avec succès
 *       500:
 *         description: Erreur serveur lors de la suppression de la transaction
 */
router.delete("/transactions/:transactionId", deleteTransaction);

module.exports = router;
