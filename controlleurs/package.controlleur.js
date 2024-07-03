const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Package

// Fonction pour créer un nouveau voyage
async function createPackage(req, res) {
  const { contents, size, weight, picture, value } = req.body;
  const { userId } = req.params;

  try {
    const newPackage = await prisma.packages.create({
      data: {
        contents,
        size,
        weight,
        picture,
        value,
        User: {
            connect: {
              id: userId,
            },
        },
      },
    });
    res.status(201).json({ message: 'Package created successfully', packages: newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create packages' });
  }
}

// Fonction pour récupérer tous les voyages
async function getAllPackages(req, res) {
  try {
    const packages = await prisma.packages.findMany();
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve packages' });
  }
}

// Fonction pour récupérer un voyage par son ID
async function getPackageById(req, res) {
  const { packageId } = req.params;  // Utiliser packageId au lieu de tripId
  try {
    const package = await prisma.packages.findUnique({
      where: {
        id: packageId,  // Utiliser id au lieu de packageId
      },
    });
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve packages' });
  }
}

// Fonction pour mettre à jour un voyage
async function updatePackage(req, res) {
    const { contents, size, weight, picture, value } = req.body;
    const {  userId, packageId } = req.params;
  
    try {
      const updatedPackages = await prisma.packages.update({
        where: { id: packageId },
        data: {
            contents,
            size,
            weight,
            picture,
            value,
            User: {
                connect: {
                  id: userId,
                },
            },
        },
      });
  
      res.status(200).json({ message: 'Package updated successfully', packages: updatedPackages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update packages' });
    }
  };
  
// Fonction pour supprimer un voyage
async function deletePackage(req, res) {
    const { packageId } = req.params;
    try {
    const DeletedPackage = await prisma.packages.delete({
      where: {
        packageId,
      },
    });
    return DeletedPackage;
  } catch (error) {
    throw new Error(`Could not delete packages: ${error}`);
  }
}

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
