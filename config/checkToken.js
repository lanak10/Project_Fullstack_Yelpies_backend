const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.get('Authorization') 
    if(token) {
        token = token.replace('Bearer ', '')

        // Checking if token is valid and not expired
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            // console.log(decoded)
            req.user = err ? null : decoded.user

            // Expiration
            req.exp = err ? null : new Date(decoded.exp * 1000)
        })
        next()
    } else {
        // No token was sent in headers
        req.user = null
        next()
    }
}