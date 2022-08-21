const jwt = require('jsonwebtoken')


const generarJsonWebToken = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.FIRMAJWT, {
            expiresIn: '1hr'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el json web token')
            } else {
                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJsonWebToken
}