const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id},"key",{
        expiresIn:"1h"
    });
};

module.exports = generateToken;