const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour recuperer tous les types de role
exports.getAllRole = async (req, res) => {
    try {
        const Roles = await prisma.role.findMany();
        res.status(200).json(Roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve role type' });
    }
}

// Fonction pour créer un nouveau type de role
exports.createRole = async (req, res) => {
    const { role } = req.body;
  
    try {    
      // Vérifier si le rôle existe déjà dans la base de données
      const existingRole = await prisma.role.findFirst({
        where: {
          role: role,
        },
      });

      // Si le rôle existe déjà, envoyer un message d'erreur
      if (existingRole) {
        return res.status(400).json({ error: 'Role already exists' });
      }

      const newRole = await prisma.role.create({
        data: {
          role,
        },
      });
  
      res.status(201).json({ message: 'Role type created successfully', user: newRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new role type' });
    }
};
  
// Fonction pour mettre à jour un role
exports.updateRole = async (req, res) => {
    const { RoleId } = req.params;
    const { role } = req.body;
  
    try {
      const updatedRole = await prisma.role.update({
        where: { id: RoleId },
        data: {
            role
          },
      });
  
      res.status(200).json({ message: 'Role type updated successfully', user: updatedRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Role type' });
    }
};

// Fonction pour supprimer un role
exports.deleteRole = async (req, res) => {
    const { RoleId } = req.params;
    try {
      await prisma.role.delete({
        where: { id: RoleId },
      });
  
      res.status(200).json({ message: 'Role type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Role type' });
    }
};
  