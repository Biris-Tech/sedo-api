const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités mailFormat

// Fonction pour créer un nouveau mailFormat
async function createMailFormat(req, res) {
    const { messageType, messageContent } = req.body;

    try {
    const newMailFormat = await prisma.mailFormat.create({
      data: {
        messageType,
        messageContent,
      },
    });
    res.status(201).json({ messageType: 'mailFormat created successfully', mailFormat: newMailFormat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create mailFormat' });
  }
}

// Fonction pour récupérer tous les mailFormat
async function getAllMailFormat(req, res) {
  try {
    const mailFormat = await prisma.mailFormat.findMany();
    res.status(200).json(mailFormat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve mailFormat' });
  }
}

// Fonction pour mettre à jour un mailFormat
async function updateMailFormat(req, res) {
    const { messageType, messageContent } = req.body;
    const { mailFormatId } = req.params;
  
    try {
      const updateMailFormat = await prisma.mailFormat.update({
        where: { id: mailFormatId },
        data: {
            messageType,
            messageContent,
        },
      });
  
      res.status(200).json({ messageType: 'mailFormat updated successfully', mailFormat: updateMailFormat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update mailFormat' });
    }
  };
  
// Fonction pour supprimer un mailFormat
async function deleteMailFormat(req, res) {
    const { mailFormatId } = req.params;
    try {
    const deletedMailFormat = await prisma.mailFormat.delete({
      where: {
        mailFormatId,
      },
    });
    return deletedMailFormat;
  } catch (error) {
    throw new Error(`Could not delete mailFormat: ${error}`);
  }
}

module.exports = {
  createMailFormat,
  getAllMailFormat,
  updateMailFormat,
  deleteMailFormat,
};
