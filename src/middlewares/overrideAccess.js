const overrideKey = "MASTER-123";

module.exports = function overrideAccess(allowedRoles = []){
    return (req ,res, next) =>{
        const userRole = req.user?.role;

        const overrideHeader = req.headers["x-override-key"];
        if(overrideHeader === overrideKey){
            console.log("Override access granted.");
            return next();
        }
        if(!userRole){
            return res.status(403).json({message:"Role missing"});
        }
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({message:"Access denied"});
        }
        next();
    };
};