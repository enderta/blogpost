const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;
    if (!token) {
      reject(new Error('Unauthorized'));
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        reject(new Error('Unauthorized'));
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = verifyToken;
