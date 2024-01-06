const { User } = require("../db");
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }
    try{
        const decoded=jwt.verify(token.split(' ')[1],jwtPassword);
        console.log('decoded',decoded);
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error:'Unauthorized!'});
        }
        else{
      //    res.status(200).json({message:`${decoded.username} course action completed!`})
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
    };
          next();
        }
    
    }
    catch(error){
        console.log(error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
}

module.exports = userMiddleware;