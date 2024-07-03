const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Delivery

// Fonction pour créer un nouveau delivery
async function createDelivery(req, res) {
    const { realPosition, status } = req.body;
    const { packageId } = req.params;
  try {
    const newDelivery = await prisma.delivery.create({
      data: {
        realPosition,
        status,
        package: {
            connect: {
              id: packageId,
            },
        },
      },
    });
    res.status(201).json({ message: 'Delivery created successfully', delivery: newDelivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create delivery' });
  }
}

// Fonction pour récupérer tous les delivery
async function getAllDeliverys(req, res) {
  try {
    const delivery = await prisma.delivery.findMany();
    res.status(200).json(delivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve delivery' });
  }
}

// Fonction pour récupérer un delivery par son ID
async function getDeliveryById(id) {
  try {
    const delivery = await prisma.delivery.findUnique({
      where: {
        id,
      },
    });
    return delivery;
  } catch (error) {
    throw new Error(`Could not fetch delivery: ${error}`);
  }
}

// Fonction pour mettre à jour un delivery
async function updateDelivery(req, res) {
    const { realPosition, status } = req.body;
    const {  packageId, deliveryid } = req.params;
  
    try {
      const updatedDelivery = await prisma.delivery.update({
        where: { id: deliveryid },
        data: {
            realPosition,
            status,
            package: {
                connect: {
                  id: packageId,
                },
            },
        },
      });
  
      res.status(200).json({ message: 'Delivery updated successfully', delivery: updatedDelivery });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update delivery' });
    }
  };
  
// Fonction pour supprimer un delivery
async function deleteDelivery(req, res) {
    const { deliveryid } = req.params;
    try {
    const deletedTrip = await prisma.delivery.delete({
      where: {
        deliveryid,
      },
    });
    return deletedTrip;
  } catch (error) {
    throw new Error(`Could not delete delivery: ${error}`);
  }
}

module.exports = {
  createDelivery,
  getAllDeliverys,
  getDeliveryById,
  updateDelivery,
  deleteDelivery,
};
