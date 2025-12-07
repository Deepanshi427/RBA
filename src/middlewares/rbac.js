module.exports = function rbac(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Role missing" });
        }

        if (allowedRoles.includes(req.user.role)) return next();

        return res.status(403).json({ message: "Access denied" });
    };
};
