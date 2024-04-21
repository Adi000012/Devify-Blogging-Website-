const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456";

const jwtMiddleWere =(req, res, next)=>
{
    const token = req.headers.authorization;
    if(!token)
    {
      res.render("./../views/Auth");
    }

    try
    {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user(decoded);
        next();
    }
    catch(err)
    {
        res.send("Error");
    }

}

const genrateToken = (userData)=>
{
    return jwt.sign(userData, SECRET_KEY);
}

module.exports = {jwtMiddleWere, genrateToken};