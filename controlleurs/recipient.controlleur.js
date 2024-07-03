const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour recuperer tous les types de recipient
exports.getAllRecipient = async (req, res) => {
  try {
      const Recipients = await prisma.recipient.findMany();
      res.status(200).json(Recipients);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve recipient type' });
  }
}

// Fonction pour créer un nouveau type de recipient
exports.createRecipient = async (req, res) => {
    const { name, phone_number, address } = req.body;

    try {  
      const newRecipient = await prisma.recipient.create({
        data: {
          name,
          phone_number,
          address
        },
      });
  
      res.status(201).json({ message: 'Recipient type created successfully', user: newRecipient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new recipient type' });
    }
};
  
// Fonction pour mettre à jour un recipient
exports.updateRecipient = async (req, res) => {
    const { RecipientId } = req.params;
    const { name, phone_number, address } = req.body;
    
    try {
      const updatedRecipient = await prisma.recipient.update({
        where: { id: RecipientId },
        data: {
            name,
            phone_number,
            address
            },
      });
  
      res.status(200).json({ message: 'Recipient type updated successfully', user: updatedRecipient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Recipient type' });
    }
};

// Fonction pour supprimer un recipient
exports.deleteRecipient = async (req, res) => {
  const { RecipientId } = req.params;
  try {
      await prisma.recipient.delete({
        where: { id: RecipientId },
      });
  
      res.status(200).json({ message: 'Recipient type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Recipient type' });
    }
};
  