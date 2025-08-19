const AuthUSer = (req,res,next) => {
    try {
        if (!(req.session?.user)) {
            return res.status(401).json({ msg: "Please login to access this resource" });
        }
        req.user = req.session.user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }   
}


module.exports ={ AuthUSer };