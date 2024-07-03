const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Transaction

// Fonction pour créer un nouveau voyage
async function createTransaction(req, res) {
    const { amount, status, payementMethode } = req.body;

    try {
    const newTransaction = await prisma.transactions.create({
      data: {
        amount,
        status,
        payementMethode,
      },
    });
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
}

// Fonction pour récupérer tous les voyages
async function getAllTransactions(req, res) {
  try {
    const transaction = await prisma.transactions.findMany();
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve transaction' });
  }
}

// Fonction pour récupérer un voyage par son ID
async function getTransactionById(req, res) {
  const { TransactionId } = req.params;
  
  try {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  } catch (error) {
    throw new Error(`Could not fetch transaction: ${error}`);
  }
}

// Fonction pour mettre à jour un voyage
async function updateTransaction(req, res) {
    const { amount, status, payementMethode } = req.body;
    const { TransactionId } = req.params;
  
    try {
      const updatedTrip = await prisma.transactions.update({
        where: { id: TransactionId },
        data: {
            amount,
            status,
            payementMethode,
        },
      });
  
      res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTrip });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  };
  
// Fonction pour supprimer un voyage
async function deleteTransaction(req, res) {
    const { TransactionId } = req.params;
    try {
    const deletedTransaction = await prisma.transactions.delete({
      where: {
        TransactionId,
      },
    });
    return deletedTransaction;
  } catch (error) {
    throw new Error(`Could not delete transaction: ${error}`);
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
