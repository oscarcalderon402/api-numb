require('dotenv').config();

const config = {
  dbUrl:
    process.env.DB_URL ||
    'mongodb+srv://oscarUalett:guitarra2@cluster0.e1gib.mongodb.net/api_numb',
  jwtSecret: process.env.JWT_SECRET
};

module.exports = { config };
