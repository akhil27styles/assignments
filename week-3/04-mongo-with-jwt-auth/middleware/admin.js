const { Admin } = require("../db");
const jwt = require('jsonwebtoken');
// Middleware for handling auth
const jwtPassword = 'secret';
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }
    try{
        const decoded=jwt.verify(token.split(' ')[1],jwtPassword);
        console.log('decoded',decoded);
        const admin=await Admin.findById(decoded.adminId);
        if(!admin){
            return res.status(401).json({error:'Unauthorized!'});
        }
        else{
          res.status(200).json({message:`${decoded.username} course action completed!`})
          next();
        }
    
    }
    catch(error){
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
}

module.exports = adminMiddleware;