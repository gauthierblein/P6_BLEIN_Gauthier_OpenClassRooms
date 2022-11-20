const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

// Conditions
passwordSchema
  .is()
  .min(8)
  .is()
  .max(40)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklister ces valeurs

module.exports = passwordSchema;