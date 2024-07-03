const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Proposal

// Fonction pour créer un nouveau voyage
async function createProposal(req, res) {
    const { departure_location, duration, deliveryExpress, arrival_location, title, description, receiverData, senderData } = req.body;
    const { userId } = req.params;
  try {
    const newProposal = await prisma.shippingProposal.create({
      data: {
        departure_location,
        arrival_location,
        title,
        description,
        receiverData,
        deliveryExpress,
        senderData,
        duration,
        user: {
            connect: {
              id: userId,
            },
        },
      },
    });
    res.status(201).json({ message: 'Proposal created successfully', shippingProposal: newProposal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create shippingProposal' });
  }
}

// Fonction pour récupérer tous les voyages
async function getAllProposals(req, res) {
  try {
    const proposals = await prisma.shippingProposal.findMany();
    res.status(200).json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve proposals' });
  }
}

// Fonction pour mettre à jour un voyage
async function updateProposal(req, res) {
    const { departure_location, deliveryExpress, Dure, arrival_location, title, description, ReceiverData, SenderData } = req.body;
    const { userId, proposalId } = req.params;

    try {
      const updatedProposal = await prisma.shippingProposal.update({
        where: { id: proposalId },
        data: {
          departure_location,
          arrival_location,
          title,
          description,
          ReceiverData,
          SenderData,
          deliveryExpress,
          Dure,
            user: {
              connect: {
                id: userId,
              },
          },
        },
        });
  
      res.status(200).json({ message: 'Proposal updated successfully', shippingProposal: updatedProposal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update shippingProposal' });
    }
  };
  
// Fonction pour supprimer un voyage
async function deleteProposal(req, res) {
    const { proposalId } = req.params;
    try {
    const deletedProposal = await prisma.shippingProposal.delete({
      where: {
        proposalId,
      },
    });
    return deletedProposal;
  } catch (error) {
    throw new Error(`Could not delete shippingProposal: ${error}`);
  }
}

module.exports = {
  createProposal,
  getAllProposals,
  updateProposal,
  deleteProposal,
};
