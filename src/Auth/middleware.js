const jwt = require("jsonwebtoken");
const AuthUSer = (req,res,next) => {
    try {
        // if (!(req.session?.user)) {
        //     return res.status(401).json({ msg: "Please login " });
        // }
        // req.user = req.session.user;


/////////// token verify ///////////


        // console.log(req.header("Authorization"))
        console.log(req.headers.authroization) // object 
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        console.log(token)
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
        const decodeddata = jwt.verify(token , process.env.JWT_SECRET, (err , decoded) =>{
            if(err) return res.status(401).json({msg :"Token is not valid"})
            req.user = decoded;
            console.log(decodeddata)
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }   
}

module.exports = AuthUSer ;
