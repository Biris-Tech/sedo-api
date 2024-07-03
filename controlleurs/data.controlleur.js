// const validator = require('validator');

const Validator = require('validatorjs');
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;

// // Validation des champs obligatoires
// const validateRequiredFields = (fields) => {
//   for (const field of fields) {
//     if (!field.value || field.value.trim() === '') {
//       return `${field.name} est requis`;
//     }
//   }
//   return null; 
// };

// // Validation de l'adresse e-mail
// const validateEmail = (email) => {
//   if (!validator.isEmail(email)) {
//     return 'Adresse e-mail invalide';
//   }
//   return null; 
// };

// // Validation d'une chaîne de caractères non vide
// const validateString = (value, fieldName) => {
//   if (!value || value.trim() === '') {
//     return `${fieldName} est requis`;
//   }
//   return null;
// };

// // Validation d'un numéro de téléphone
// const validatePhoneNumber = (phoneNumber) => {
//   if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
//     return 'Numéro de téléphone invalide';
//   }
//   return null;
// };

// // Validation d'un objet JSON
// const validateJSON = (jsonString) => {
//   try {
//     JSON.parse(jsonString);
//     return null; // Le JSON est valide
//   } catch (error) {
//     return 'Format JSON invalide';
//   }
// };

// ///test
// const { validateString } = require('./validationController');

// exports.signup = async (req, res) => {
//   const { name, surname, email, password, phoneNumber } = req.body;

//   try {
//     // Validation des champs obligatoires
//     const requiredFieldsError = validateRequiredFields([
//       { name: 'Nom', value: name },
//       { name: 'Prénom', value: surname },
//       { name: 'Adresse e-mail', value: email },
//       { name: 'Mot de passe', value: password },
//       { name: 'Numéro de téléphone', value: phoneNumber }
//     ]);
//     if (requiredFieldsError) {
//       return res.status(400).send(requiredFieldsError);
//     }

//     // Validation de chaque champ individuellement
//     const nameError = validateString(name, 'Nom');
//     if (nameError) {
//       return res.status(400).send(nameError);
//     }
//     const surnameError = validateString(surname, 'Prénom');
//     if (surnameError) {
//       return res.status(400).send(surnameError);
//     }
//     const emailError = validateEmail(email);
//     if (emailError) {
//       return res.status(400).send(emailError);
//     }
//     const passwordError = validateString(password, 'Mot de passe');
//     if (passwordError) {
//       return res.status(400).send(passwordError);
//     }
//     const phoneNumberError = validatePhoneNumber(phoneNumber);
//     if (phoneNumberError) {
//       return res.status(400).send(phoneNumberError);
//     }

//     // Si toutes les validations passent, continuez avec la création de l'utilisateur
//     // ...
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erreur lors de la validation des données');
//   }
// };
// ///
// module.exports = {
//   validateRequiredFields,
//   validateEmail,
//   validateString,
//   validatePhoneNumber,
//   validateJSON
//   // Ajoutez d'autres fonctions de validation ici au besoin...
// };

