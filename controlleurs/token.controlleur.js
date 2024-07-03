const jwt = require("jsonwebtoken");

exports.decodedToken = async (req, res) => {
    const token = req.headers.authorization;
  
    // Vérifier si le token existe
    if (!token)
      return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      // Accéder aux informations du token décodé
      // { userId: check.id, name: check.name, surname: check.surname, email: check.email, phone_number: check.phone_number, address: check.address, sexe: check.sexe},
      const userId = decodedToken.userId;
      const userName = decodedToken.name;
      const userSurname = decodedToken.surname;
      const userEmail = decodedToken.email;
      const userAddress = decodedToken.address;
      const userSexe = decodedToken.sexe;
      const userPhoneNumber = decodedToken.phone_number;

      // Envoyer les données décodées en réponse
      res.status(200).json({
        userId,
        userName,
        userSurname,
        userEmail,
        userAddress,
        userSexe,
        userPhoneNumber
      });
    } catch (error) {
      console.error('Erreur lors du decodage du token', error.message);
      res.status(500).send(error.message);
    }
};
