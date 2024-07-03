const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités dispute

// Fonction pour créer un nouveau dispute
async function createDispute(req, res) {
    const { message, status, picture } = req.body;
    const { packageId } = req.params;
  try {
    const newdispute = await prisma.dispute.create({
      data: {
        message,
        status,
        picture,
        package: {
            connect: {
              id: packageId,
            },
        },
      },
    });
    res.status(201).json({ message: 'dispute created successfully', dispute: newdispute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create dispute' });
  }
}

// Fonction pour récupérer tous les dispute
async function getAllDisputes(req, res) {
  try {
    const dispute = await prisma.dispute.findMany();
    res.status(200).json(dispute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve dispute' });
  }
}

// Fonction pour mettre à jour un dispute
async function updateDispute(req, res) {
    const { message, status, picture } = req.body;
    const {  packageId, disputeid } = req.params;
  
    try {
      const updatedispute = await prisma.dispute.update({
        where: { id: disputeid },
        data: {
            message,
            status,
            picture,
            package: {
                connect: {
                  id: packageId,
                },
            },
        },
      });
  
      res.status(200).json({ message: 'dispute updated successfully', dispute: updatedispute });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update dispute' });
    }
  };
  
// Fonction pour supprimer un dispute
async function deleteDispute(req, res) {
    const { disputeId } = req.params;
    try {
    const deletedDispute = await prisma.dispute.delete({
      where: {
        disputeId,
      },
    });
    return deletedDispute;
  } catch (error) {
    throw new Error(`Could not delete dispute: ${error}`);
  }
}

module.exports = {
  createDispute,
  getAllDisputes,
  updateDispute,
  deleteDispute,
};
