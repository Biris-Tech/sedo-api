const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Récupère tous les chats
const getAllChats = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        participants: true,
        messages: true,
      },
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crée un nouveau chat
const createChat = async (req, res) => {
  const { participants, messages } = req.body;
  try {
    const newChat = await prisma.chat.create({
      data: {
        participants,
        messages,
      },
      include: {
        participants: true,
        messages: true,
      },
    });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupère un chat par son ID
const getChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        participants: true,
        messages: true,
      },
    });
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ message: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Met à jour un chat
const updateChat = async (req, res) => {
  const { id } = req.params;
  const { participants, messages } = req.body;
  try {
    const updatedChat = await prisma.chat.update({
      where: { id },
      data: {
        participants,
        messages,
      },
      include: {
        participants: true,
        messages: true,
      },
    });
    res.json(updatedChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprime un chat
const deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.chat.delete({
      where: { id },
    });
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporte les fonctions du contrôleur
module.exports = {
  getAllChats,
  createChat,
  getChatById,
  updateChat,
  deleteChat,
};
