const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Proposal

// Fonction pour créer un nouveau voyage
async function createOrder(req, res) {
    const { amount, status } = req.body;
    const { deliveryDriverId, shippingProposalId, transportationTypeId } = req.params;
  try {
    const newOrder = await prisma.shippingOrder.create({
        data: {
            amount,
            status,
            user: {
                connect: {
                    id: deliveryDriverId,
                },
            },
            shippingProposal: {
                connect: {
                    id: shippingProposalId,
                },
            },
            transportationType: {
                connect: {
                    id: transportationTypeId,
                },
            },
        },
    });
    res.status(201).json({ message: 'Proposal created successfully', shippingOrder: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create shippingOrder' });
  }
}

// Fonction pour récupérer tous les voyages
async function getAllOrders(req, res) {
  try {
    const orders = await prisma.shippingOrder.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
}

// Fonction pour mettre à jour un voyage
async function updateOrder(req, res) {
    const { amount, status } = req.body;
    const { deliveryDriverId, shippingProposalId, transportationTypeId, orderId } = req.params;

    try {
      const updatedOrder = await prisma.shippingOrder.update({
        where: { id: orderId },
        data: {
            amount,
            status,
            user: {
                connect: {
                    id: deliveryDriverId,
                },
            },
            shippingProposal: {
                connect: {
                    id: shippingProposalId,
                },
            },
            transportationType: {
                connect: {
                    id: transportationTypeId,
                },
            },
        },
        });
  
      res.status(200).json({ message: 'Proposal updated successfully', shippingOrder: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update shippingOrder' });
    }
  };
  
// Fonction pour supprimer un voyage
async function deleteOrder(req, res) {
    const { orderId } = req.params;
    try {
    const deletedorder = await prisma.shippingOrder.delete({
      where: {
        orderId,
      },
    });
    return deletedorder;
  } catch (error) {
    throw new Error(`Could not delete shippingOrder: ${error}`);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
