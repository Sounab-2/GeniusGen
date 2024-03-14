
const customError = require('../errors');
//const {StatusCodes} = require('http-status-codes');

const {isTokenValid} = require('../utils');


const authenticateUser = async (req,res,next)=> {
    const token = req.signedCookies.token;

    if(!token){
        throw new customError.UnauthenticatedError('Authentication failed');
    }

    try {
        const {name, userId, role} = isTokenValid({token});
        req.user = {name,userId,role}
        next();

    } catch (error) {
        throw new customError.UnauthenticatedError('Authentication failed');
    }
}

const authorizePermissions = (req,res,next)=> {
    if(req.user.role!== 'admin'){
        throw new customError.UnauthorizedError('Unauthorized to access this route');
    }
    next();
}
 
module.exports = {
    authenticateUser,
    authorizePermissions
}