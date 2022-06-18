require('dotenv').config();

const config = {
  dbUrl:
    process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET
};

module.exports = { config };
