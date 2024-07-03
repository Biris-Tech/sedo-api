const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour recuperer tous les types de transport
exports.getAllTransportType = async (req, res) => {
    try {
        const transportTypes = await prisma.transportationType.findMany();
        res.status(200).json(transportTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve transport type' });
    }
}

// Fonction pour créer un nouveau type de transport
exports.createTransportType = async (req, res) => {
    const { name } = req.body;
  
    try {  
      const newTransportType = await prisma.transportationType.create({
        data: {
          name,
        },
      });
  
      res.status(201).json({ message: 'Transport type created successfully', user: newTransportType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new transport type' });
    }
};
  
// Fonction pour mettre à jour un utilisateur
exports.updateTransportType = async (req, res) => {
    const { TransportTypeId } = req.params;
    const { name, Brand, immatriculation, color } = req.body;
  
    try {
      const updatedTransoporType = await prisma.transportationType.update({
        where: { id: TransportTypeId },
        data: {
            name,
          },
      });
  
      res.status(200).json({ message: 'Transport type updated successfully', user: updatedTransoporType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Transport type' });
    }
};

// Fonction pour supprimer un utilisateur
exports.deleteTransportType = async (req, res) => {
    const { TransportTypeId } = req.params;
    try {
      await prisma.transportationType.delete({
        where: { id: TransportTypeId },
      });
  
      res.status(200).json({ message: 'Transport type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Transport type' });
    }
};
  