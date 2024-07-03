const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour recuperer tous les types de transport
exports.getAllAddress = async (req, res) => {
    try {
        const RecAddress = await prisma.recAddress.findMany();
        res.status(200).json(RecAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve transport type' });
    }
}

// Fonction pour créer un nouveau type de transport
exports.createAddress = async (req, res) => {
    const { AddressHistory } = req.body;
  
    try {  
      const newAddress = await prisma.recAddress.create({
        data: {
            AddressHistory,
        },
      });
  
      res.status(201).json({ message: 'Address type created successfully', user: newAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new transport type' });
    }
};
  
// Fonction pour mettre à jour un utilisateur
exports.updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { AddressHistory } = req.body;
  
    try {
      const updatedRecAddress = await prisma.recAddress.update({
        where: { id: addressId },
        data: {
            AddressHistory,
          },
      });
  
      res.status(200).json({ message: 'Address type updated successfully', user: updatedRecAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Address type' });
    }
};

exports.deleteAddress = async (req, res) => {
    const { addressId } = req.params;
    try {
      await prisma.recAddress.delete({
        where: { id: addressId },
      });
  
      res.status(200).json({ message: 'Address type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Address type' });
    }
};
  