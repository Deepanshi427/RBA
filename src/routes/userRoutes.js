const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const rateLimit = require("express-rate-limit");
const overrideAccess = require("../middlewares/overrideAccess");
const checkRole = require("../middlewares/checkRole");

const rbacLimiter = rateLimit({
    windowMs: 1*60*1000,
    max:10,
    message:"To many requests!"
});

// Admin only
router.get("/admin-data", auth, rbac(["admin"]), (req, res) => {
    res.json({ message: "Admin route accessed" });
});

// Admin & Manager
router.post("/manage-user", auth, rbac(["admin", "manager"]), (req, res) => {
    res.json({ message: "Manager or Admin can create/update users" });
});

// All roles
router.get("/user-profile", auth, rbac(["admin", "manager", "user"]), (req, res) => {
    res.json({ message: "User profile accessed" });
});

router.put("/update/:id", overrideAccess(['admin','manager']),(req, res) =>{
    res.json({message:`User ${req.params.id} updated successfullt`});
});

router.delete("/delete/:id" , overrideAccess(['admin']), (req, res) =>{
    res.json({message: `user ${req.params.id} deleted successfully`});
});
router.get("/admin",auth,checkRole(["admin"]), (req ,res) =>{
    res.json({message:"Welcome Admin"});
});

router.get("/profile", checkRole(["user", "admin"]), (req, res) => {
  res.json({ message: "Profile visible" });
});

router.use(rbacLimiter);
module.exports = router;
