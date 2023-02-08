const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    // a header pl: Bearer kjshdouifhgsdkfh
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}