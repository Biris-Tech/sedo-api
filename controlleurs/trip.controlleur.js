const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Contrôleur pour gérer les opérations CRUD sur les entités Trip

// Fonction pour créer un nouveau voyage
async function createTrip(req, res) {
    const { departureLocations, arrivalLocation, departureDate, arrivalDate } = req.body;
    const { transportationTypeId, userId } = req.params;
  try {
    const newTrip = await prisma.trip.create({
      data: {
        departureLocations,
        arrivalLocation,
        departureDate,
        arrivalDate,
        TransportationType: {
            connect: {
              id: transportationTypeId,
            },
        },
        User: {
            connect: {
              id: userId,
            },
        },
      },
    });
    res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
}

// Fonction pour récupérer tous les voyages
async function getAllTrips(req, res) {
  try {
      const trips = await prisma.trip.findMany();
      res.status(200).json(trips);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve trips' });
  }
}

// Fonction pour mettre à jour un voyage
async function updateTrip(req, res) {
    const { departureLocations, arrivalLocation, departureDate, arrivalDate } = req.body;
    const { transportationTypeId, userId, tripId } = req.params;
  
    try {
      const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: {
            departureLocations,
            arrivalLocation,
            departureDate,
            arrivalDate,
            transportationType: {
                connect: {
                  id: transportationTypeId,
                },
            },
            User: {
                connect: {
                  id: userId,
                },
            },
        },
      });
  
      res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update trip' });
    }
  };
  
// Fonction pour supprimer un voyage
async function deleteTrip(req, res) {
    const { tripId } = req.params;
    try {
    const deletedTrip = await prisma.trip.delete({
      where: {
        id: tripId,
      },
    });
    res.status(200).json({ message: 'Trip deleted successfully', trip: deletedTrip });
  } catch (error) {
    throw new Error(`Could not delete trip: ${error}`);
  }
}

module.exports = {
  createTrip,
  getAllTrips,
  updateTrip,
  deleteTrip,
};
