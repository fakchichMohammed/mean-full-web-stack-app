const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this-should_be_longer_more_longer_more_secure_will_be_our_token_just_like_this");
    next();  
  } catch (error) {
    res.status(401).json({
        message: "Auth failed!"
    });
  }
}