const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      await jwt.verify(token, "wrong-secret", function (err, decoded) {
        if (decoded) {
          req.body.user = decoded.user;
          next();
        } else {
          res.status(400).send({ message: err });
        }
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } else {
    res.send({ message: "Authorizarion required" });
  }
};

module.exports = authmiddleware;
