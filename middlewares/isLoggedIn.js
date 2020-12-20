
var jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers.authorization;

    if (!token) {
        console.log('not authenticated')
        res.send(false)
    }
    else {
        jwt.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'not recogonized' });
            }
            else {
                req.userId = decoded.id
                next();
            }
        })
    }


}

module.exports = isLoggedIn;